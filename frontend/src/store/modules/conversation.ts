import { ActionContext } from 'vuex'
import { Conversation, CreateConversationDto, User } from '../../gql/graphql'
import { gql } from 'graphql-tag'
import { useMutation, useQuery } from 'villus'
import { $toast } from '../../utils/toast'
import store from '..'

const CREATE_CONVERSATION_MUTATION = gql`
    mutation CreateConversation($convInput: CreateConversationDto!) {
        createConversation(convInput: $convInput) {
            createdAt
            id
            name
            updatedAt
            creatorId
            messages {
                content
                createdAt
                id
                updatedAt
            }
            users {
                createdAt
                email
                id
                password
                updatedAt
                username
            }
        }
    }
`

const GET_CONVERSATIONS_QUERY = gql`
    query GetUserConversations($userId: ID!) {
        getUserConversations(userId: $userId) {
            id
            name
            creatorId
            users {
                id
                username
            }
            messages {
                id
                content
                createdAt
                updatedAt
            }
            createdAt
            updatedAt
        }
    }
`

const GET_USERS_QUERY = gql`
    query FindUserByName($query: String!) {
        findUserByName(query: $query) {
            createdAt
            email
            id
            password
            updatedAt
            username
        }
    }
`

const DELETE_CONVERSATION_MUTATION = gql`
    mutation DeleteConversation($convId: ID!, $userId: ID!) {
        deleteConversation(convId: $convId, userId: $userId) {
            createdAt
            id
            name
            creatorId
            updatedAt
        }
    }
`

export type ConversationState = {
    loading: boolean
    users: User[] | []
    conversations: Conversation[] | []
}

type ConvActionContext = ActionContext<ConversationState, ConversationState>

export default {
    namespaced: true,
    state: {
        loading: false,
        users: [],
        conversations: [],
    } as ConversationState,
    mutations: {
        setConversations(state: ConversationState, conversations: Conversation[]) {
            state.conversations = conversations
        },
        setUsers(state: ConversationState, users: User[]) {
            state.users = users
        },
        setLoading(state: ConversationState, loading: boolean) {
            state.loading = loading
        },
    },
    actions: {
        async createConversation(
            { commit, state }: ConvActionContext,
            { name, creatorId, users }: CreateConversationDto,
        ) {
            commit('setLoading', true)
            try {
                const { execute, data, isDone, error } = useMutation(CREATE_CONVERSATION_MUTATION)
                await execute({ convInput: { name, creatorId, users } })

                if (isDone.value && data?.value?.createConversation) {
                    commit('setLoading', false)
                    commit('setConversations', [...state.conversations, data.value.createConversation])
                    $toast.success('Conversation créée!')
                }

                if (error && error.value?.graphqlErrors !== undefined && error.value.graphqlErrors[0]) {
                    commit('setLoading', false)

                    const graphqlError = error.value.graphqlErrors[0] as any

                    $toast.error(graphqlError?.extensions?.message)
                }
            } catch (error) {
                console.error('Error during conversation creation:', error)
                commit('setLoading', false)
                $toast.error('Une erreur est survenue')
            }
        },

        async getConversations({ commit }: ConvActionContext, userId: String) {
            commit('setLoading', true)
            try {
                const { execute, error } = useQuery({
                    query: GET_CONVERSATIONS_QUERY,
                    variables: { userId },
                })

                const { data } = await execute()

                if (data && data?.getUserConversations) {
                    commit('setLoading', false)
                    commit('setConversations', data?.getUserConversations)
                }

                if (error && error.value?.graphqlErrors !== undefined && error.value.graphqlErrors[0]) {
                    commit('setLoading', false)

                    const graphqlError = error.value.graphqlErrors[0] as any

                    $toast.error(graphqlError.message)
                }
            } catch (error) {
                console.error('Error during conversation creation:', error)
                commit('setLoading', false)
                $toast.error('Une erreur est survenue')
            }
        },

        async getUsers({ commit }: ConvActionContext, query: String) {
            commit('setLoading', true)
            try {
                const { execute, error } = await useQuery({
                    query: GET_USERS_QUERY,
                    variables: { query: query },
                })

                const { data } = await execute()

                if (data && data?.findUserByName) {
                    commit('setLoading', false)
                    commit(
                        'setUsers',
                        data?.findUserByName.filter((user: User) => user.id !== store.getters['auth/user']?.id),
                    )
                }

                if (error && error.value?.graphqlErrors !== undefined && error.value.graphqlErrors[0]) {
                    commit('setLoading', false)

                    const graphqlError = error.value.graphqlErrors[0] as any

                    $toast.error(graphqlError.message)
                }
            } catch (error) {
                console.error('Error during conversation creation:', error)
                commit('setLoading', false)
                $toast.error('Une erreur est survenue')
            }
        },

        async deleteConversation({ commit, state }: ConvActionContext, dataToDelete: { convId: string; userId: string }) {
            commit('setLoading', true)
            try {
                const { execute, data, isDone, error } = useMutation(DELETE_CONVERSATION_MUTATION)
                await execute(dataToDelete)

                if (isDone.value && data?.value?.deleteConversation) {
                    commit('setLoading', false)
                    commit(
                        'setConversations',
                        state.conversations.filter((conv: Conversation) => conv.id !== dataToDelete.convId),
                    )
                    $toast.success('Conversation supprimée!')
                }

                if (error && error.value?.graphqlErrors !== undefined && error.value.graphqlErrors[0]) {
                    commit('setLoading', false)

                    const graphqlError = error.value.graphqlErrors[0] as any

                    $toast.error(graphqlError.message)
                }
            } catch (error) {
                console.error('Error during conversation deletion:', error)
                commit('setLoading', false)
                $toast.error('Une erreur est survenue')
            }
        },
    },
    getters: {
        users: (state: ConversationState) => state.users,
        loading: (state: ConversationState) => state.loading,
        conversations: (state: ConversationState) => state.conversations,
    },
}
