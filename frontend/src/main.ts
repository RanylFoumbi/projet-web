import { useClient, handleSubscriptions, defaultPlugins, useMutation, ClientPlugin } from 'villus'
import { createClient as createWsClient } from 'graphql-ws'
import './style.css'
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import store from './store/index.js'
import ToastPlugin from 'vue-toast-notification'
import gql from 'graphql-tag'

const wsClient = createWsClient({
    url: import.meta.env.VITE_API_SUBSCRIPTION_URL,
    connectionParams: () => ({
        reconnect: true,
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    }),
})

const subscriptionsHandler = handleSubscriptions((operation) => {
    return {
        subscribe: (obs) => {
            wsClient.subscribe(
                {
                    query: operation.query,
                    variables: operation.variables,
                },
                obs,
            )
            return {
                unsubscribe: () => {},
            }
        },
    }
})

const REFRESH_TOKEN_MUTATION = gql`
    mutation RefreshToken {
        refreshToken
    }
`

async function refreshToken() {
    const { execute, data, error } = useMutation(REFRESH_TOKEN_MUTATION)
    await execute()
    console.error('Error refreshing token:', error)
    if (error.value) {
        throw new Error('Error refreshing token')
    }
    const { refreshToken } = data.value
    return `Bearer ${refreshToken}`
}

const authPluginWithRefresh = ({ opContext, afterQuery }) => {
    afterQuery(async (result, { response }) => {
        if (!response) {
            return
        }
        if (response.body.errors) {
            for (const err of response.body.errors) {
                if (err.extensions?.code === 'UNAUTHENTICATED') {
                    try {
                        const accessToken = await refreshToken()
                        opContext.headers.Authorization = accessToken
                        const { client, observe } = opContext
                        const retryResult = await client.execute(opContext.operation, observe)

                        result.data = retryResult.data
                        result.errors = retryResult.errors
                    } catch (error) {
                        store.dispatch('auth/logout')
                    }
                    break
                }
            }
        }
    })
}

const withCredentials: ClientPlugin = ({ opContext }) => {
    opContext.credentials = 'include'
}

const villusClient = useClient({
    url: import.meta.env.VITE_API_URL,
    cachePolicy: 'network-only',
    use: [withCredentials, authPluginWithRefresh, subscriptionsHandler, ...defaultPlugins()],
})

const app = createApp(App)
app.use(villusClient).use(store).use(router).use(ToastPlugin).mount('#app')
