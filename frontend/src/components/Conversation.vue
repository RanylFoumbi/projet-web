<template>
    <div class="conversation">
        <div class="flex items-center justify-between bg-white border-b border-gray-300 p-2">
            <div class="flex items-center">
                <div>
                    <img class="w-10 h-10 rounded-full" src="https://randomuser.me/api/portraits" />
                </div>
                <div class="ml-4">
                    <p class="text-grey-darkest">Conversation {{ conversation.id }}</p>
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
import { ref, defineProps, onMounted } from 'vue'
import { Conversation } from '../gql/graphql'
import Message from './Message.vue'

const props = defineProps<{
    conversation: Conversation | null
}>()

const messagesContainer = ref<HTMLElement | null>(null)

const scrollToBottom = () => {
    if (messagesContainer.value) {
        messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
    }
}

const currentMessage = ref('')

const sendMessage = () => {
    console.log('Sending message...')
    scrollToBottom()
}

onMounted(() => {
    scrollToBottom()
})
</script>

<style scoped></style>
