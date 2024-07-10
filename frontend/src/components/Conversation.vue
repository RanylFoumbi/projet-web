<template>
    <div class="conversation">
        <div class="flex items-center justify-between bg-white border-b border-gray-300 p-2">
            <div class="flex items-center">
                <div
                    class="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-200 rounded-full"
                >
                    <span class="text-gray-500 capitalize">{{ conversation?.name?.substring(0, 1) }}</span>
                </div>
                <div class="ml-4">
                    <p class="text-grey-darkest font-bold capitalize">{{ conversation?.name }}</p>
                    <p class="text-grey-darker text-xs mt-1 italic capitalize">
                        {{ conversation?.users?.map((user) => user?.username).join(', ') }}
                    </p>
                </div>
            </div>

            <DropdownMenu :conversation="conversation" />
        </div>
        <div class="h-screen overflow-y-auto p-4 pb-36" ref="messagesContainer">
            <Message v-for="(message, index) in messages" :key="index" :message="message" />
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
import { useMutation, useQuery, useSubscription } from 'villus'
import { Conversation, Message as MessageType } from '../gql/graphql'
import { useStore } from 'vuex'
import { GET_CONVERSATION_MESSAGES_QUERY, NEW_MESSAGE_SUBSCRIPTION } from '../store/index'

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
            sender {
                createdAt
                id
                username
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
    try {
        const { execute, error } = useQuery({
            query: GET_CONVERSATION_MESSAGES_QUERY,
            variables: { convId },
        })

        const { data } = await execute()
        if (data && data?.getConversationMessages) {
            messages.value = data.getConversationMessages
            useSubscription({
                query: NEW_MESSAGE_SUBSCRIPTION,
                variables: { convId: props?.conversation?.id },
            }, async ({ data, error }) => {
                if(data && !error) {
                    getConversationMessages(props?.conversation?.id)
                }
            })
            scrollToBottom()
        }

        if (error && error.value?.graphqlErrors !== undefined && error.value.graphqlErrors[0]) {
            const graphqlError = error.value.graphqlErrors[0] as any
            $toast.error(graphqlError.message)
        }
    } catch (error) {
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
                conversation: props?.conversation?.id,
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
