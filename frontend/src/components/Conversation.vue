<template>
    <div class="conversation">
        <div class="flex items-center justify-between bg-white border-b border-gray-300 p-2">
            <div class="flex items-center">
                <div>
                    <img class="w-10 h-10 rounded-full" src="https://randomuser.me/api/portraits" />
                </div>
                <div class="ml-4">
                    <p class="text-grey-darkest font-bold">Conversation {{ conversation?.name }}</p>
                    <p class="text-grey-darker text-xs mt-1">
                        {{ conversation?.users?.map((user) => user?.username).join(', ') }}
                    </p>
                </div>
            </div>

            <div class="flex">
                <div class="ml-6">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                        <path
                            fill="#263238"
                            fill-opacity=".6"
                            d="M12 7a2 2 0 1 0-.001-4.001A2 2 0 0 0 12 7zm0 2a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 9zm0 6a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 15z"
                        ></path>
                    </svg>
                </div>
            </div>
        </div>
        <div class="h-screen overflow-y-auto p-4 pb-36" ref="messagesContainer">
            <Message v-for="(message, index) in props?.conversation?.messages" :key="index" :message="message" />
        </div>

        <!-- Chat Input -->
        <footer class="bg-white border-t border-gray-300 p-4 absolute bottom-0 w-3/4">
            <div class="flex items-center">
                <input
                    type="text"
                    placeholder="Entrer a message..."
                    v-model="currentMessage"
                    @keyup.enter="sendMessage"
                    class="w-full p-2 rounded-md border border-gray-400 focus:outline-none focus:border-blue-500"
                />
                <button @click="sendMessage" class="bg-indigo-500 text-white px-4 py-2 rounded-md ml-2">Envoyer</button>
            </div>
        </footer>
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch } from 'vue'
import Message from './Message.vue'
import { $toast } from '../utils/toast'
import { gql } from 'graphql-tag'
import { useMutation, useQuery } from 'villus'
import { Conversation, Message as MessageType, MessageInput } from '../gql/graphql'
import { useStore } from 'vuex'

const GET_CONVERSATION_MESSAGES_QUERY = gql`
    query GetConversationMessages($convId: ID!) {
        getConversationMessages(convId: $convId) {
            content
            createdAt
            id
            updatedAt
            conversation {
                createdAt
                id
                name
                updatedAt
            }
            sender {
                createdAt
                id
                username
                updatedAt
            }
        }
    }
`

const SEND_MESSAGE_MUTATION = gql`
    mutation SendMessage($messageInput: MessageInput!) {
        sendMessage(messageInput: $messageInput) {
            content
            createdAt
            id
            updatedAt
            conversation {
                createdAt
                id
                name
                updatedAt
            }
        }
    }
`

const store = useStore()

const props = defineProps<{
    conversation: Conversation
}>()

const currentMessage = ref('')
const messages = ref<MessageType[]>([])
const messagesContainer = ref<HTMLElement | null>(null)

const scrollToBottom = () => {
    if (messagesContainer.value) {
        messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
    }
}

const getConversationMessages = async (convId: String) => {
    console.log('convId', convId)
    try {
        const { execute, error } = useQuery({
            query: GET_CONVERSATION_MESSAGES_QUERY,
            variables: { convId },
        })

        const { data } = await execute()

        if (data && data?.value?.getConversationMessages) {
            messages.value = data.value.getConversationMessages
        }

        if (error && error.value?.graphqlErrors !== undefined && error.value.graphqlErrors[0]) {
            const graphqlError = error.value.graphqlErrors[0] as any
            $toast.error(graphqlError.message)
        }
    } catch (error) {
        console.error('Error during conversation creation:', error)
        $toast.error('Une erreur est survenue')
    }
}

const sendMessage = async () => {
    try {
        const { data, execute, error } = useMutation(SEND_MESSAGE_MUTATION)

        await execute({
            messageInput: {
                content: currentMessage.value,
                sender: store.state.auth.user?.id,
                conversationId: props?.conversation?.id,
            },
        })

        if (data && data?.value?.sendMessage) {
            messages.value = [...messages.value, data.value.sendMessage]
            currentMessage.value = ''
            scrollToBottom()
        }

        if (error && error.value?.graphqlErrors !== undefined && error.value.graphqlErrors[0]) {
            const graphqlError = error.value.graphqlErrors[0] as any
            $toast.error(graphqlError.message)
        }
    } catch (error) {
        console.error('Error during message sending:', error)
        $toast.error('Une erreur est survenue')
    }
}

onMounted(() => {
    getConversationMessages(props?.conversation?.id)
    scrollToBottom()
})

watch(
    () => props?.conversation?.id,
    () => {
        if (props?.conversation?.id) {
            getConversationMessages(props?.conversation?.id)
            scrollToBottom()
        }
    },
)
</script>

<style scoped></style>
