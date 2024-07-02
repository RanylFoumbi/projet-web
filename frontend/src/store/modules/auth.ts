import { useMutation } from 'villus'
import router from '../../router'
import { ActionContext } from 'vuex/types/index.js'
import { $toast } from '../../utils/toast'
import { User, LoginDto, RegisterDto } from '../../gql/graphql'
import gql from 'graphql-tag'


const LOGIN_MUTATION = gql`
mutation Login($loginInput: LoginDto!) {
    login(loginInput: $loginInput) {
        user {
            createdAt
            email
            id
            password
            updatedAt
            username
            conversations {
                createdAt
                id
                updatedAt
                messages {
                    content
                    createdAt
                    id
                    updatedAt
                }
                participants {
                    createdAt
                    email
                    id
                    password
                    updatedAt
                    username
                }
            }
        }
    }
}
`;

const REGISTER_MUTATION = gql`
mutation Register($registerInput: RegisterDto!) {
    register(registerInput: $registerInput) {
        user {
            createdAt
            email
            id
            password
            updatedAt
            username
        }
    }
}
`;


export type AuthState = {
    user: User | null
    loadingLogin: boolean
    loadingRegister: boolean
}

type AuthActionContext = ActionContext<AuthState, AuthState>


export const auth = {
    namespaced: true,
    state: {
        loadingLogin: false,
        loadingRegister: false,
        user: null,
    } as AuthState,
    mutations: {
        setUser(state: AuthState, user: User) {
            state.user = user
        },
        setLoadingLogin(state: AuthState, value: boolean) {
            state.loadingLogin = value
        },
        setLoadingRegister(state: AuthState, value: boolean) {
            state.loadingRegister = value
        },
    },
    actions: {
        
        async login({ commit }: AuthActionContext, { email, password }: LoginDto) {
            commit('setLoadingLogin', true)

            try {
                const { data, execute, isDone, isFetching, error } = useMutation(LOGIN_MUTATION)
                await execute({ loginInput: { email, password } });

                console.log('>>>>>>>>>>>> data:', data, 'isDone:', isDone, 'isFetching:', isFetching, 'error:', error)

                if (isFetching.value) {
                    commit('setLoadingLogin', true)
                }

                if (isDone.value && data?.value?.login?.user) {
                    commit('setLoadingLogin', false)
                    commit('setUser', data?.value?.login?.user)
                    router.push('/home')
                    $toast.success('Vous êtes désormais connecté!')
                }

                if (error && error?.value?.graphqlErrors[0]) {
                    commit('setLoadingLogin', false)

                    const graphqlError = error?.value?.graphqlErrors[0] as any;

                    if (graphqlError?.originalError?.extensions.originalError.statusCode === 400) {
                        console.log('Invalid credentials')
                        $toast.warning('Identifiants invalides')
                    } else {
                        console.log('An error occurred')
                        $toast.error('Une erreur est survenue')
                    }
                }
            } catch (error) {
                console.error('Error during login:', error)
                commit('setLoadingLogin', false)
                $toast.error('Une erreur est survenue')
            }
        },
        async register({ commit }: AuthActionContext, { username, email, password, confirmPassword = password }: RegisterDto) {
            commit('setLoadingRegister', true)
            try {
                const { data, execute, error, isDone, isFetching } = useMutation(REGISTER_MUTATION)
                await execute({ registerInput: { username, email, password, confirmPassword } });

                if (isFetching.value) {
                    commit('setLoadingRegister', true)
                }

                if (isDone.value && data?.value?.register?.user) {
                    commit('setLoadingRegister', false)
                    router.push('/login')
                    $toast.success('Vous êtes désormais inscrit!')
                }

                if (error && error?.value?.graphqlErrors[0]) {
                    commit('setLoadingRegister', false)

                    const graphqlError = error?.value?.graphqlErrors[0] as any;

                    if (graphqlError?.originalError?.extensions.originalError.statusCode === 409) {
                        console.log('User already exists')
                        $toast.warning('Utilisateur déjà existant')
                    } else {
                        console.log('An error occurred')
                        $toast.error('Une erreur est survenue')
                    }
                }
            } catch (error) {
                console.error('Error during registration:', error)
                commit('setLoadingRegister', false)
                $toast.error('Une erreur est survenue')
            }
        },
        logout({ commit }: AuthActionContext) {
            commit('setUser', null)
            localStorage.clear()
            router.replace('/login')
        },
    },
    getters: {
        user: (state: AuthState) => state.user,
        loadingLogin: (state: AuthState) => state.loadingLogin,
        loadingRegister: (state: AuthState) => state.loadingRegister,
    },
}
