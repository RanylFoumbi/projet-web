import { createApp } from 'vue'
import './style.css'
import router from './router'
import App from './App.vue'
import store from './store/index.js'
import ToastPlugin from 'vue-toast-notification'
import { useClient, defaultPlugins, handleSubscriptions } from 'villus'
import { createClient } from 'graphql-ws'

// function authPlugin({ opContext }) {
//     opContext.headers.Authorization = `Bearer ${store.state.auth.token}`
// }

const wsClient = createClient({
    url: import.meta.env.VITE_API_SUBSCRIPTION_URL,
    // connectionParams: () => ({
    //     Authorization: `Bearer ${store.state.auth.token}`,
    // }),
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

const villusClient = useClient({
    url: import.meta.env.VITE_API_URL,
    cachePolicy: 'network-only',
    use: [subscriptionsHandler, ...defaultPlugins()],
})


const app = createApp(App)

app.use(villusClient).use(store).use(router).use(ToastPlugin).mount('#app')
