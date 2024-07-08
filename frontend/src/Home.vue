<template>
    <div class="flex h-screen overflow-hidden">
        <!-- Sidebar -->
        <div class="w-full sm:w-1/4 flex flex-col bg-white border-r border-gray-300">
            <!-- Sidebar Header -->
            <header class="p-4 border-b border-gray-300 flex justify-between items-center bg-indigo-600 text-white">
                <h1 class="text-md font-semibold">Mes conversations</h1>
                <button @click="openModal" class="bg-indigo-500 text-white px-4 py-2 rounded-md">
                    <i class="mdi mdi-plus"></i>
                </button>
            </header>

            <!-- Contact Conversations -->
            <div class="flex-1 overflow-y-auto p-3">
                <div
                    v-for="(conversation, index) in conversationList"
                    :key="index"
                    class="flex items-center mb-4 cursor-pointer bg-gray-100 p-2 rounded-md"
                    @click="selectConversation(index)"
                >
                    <div
                        class="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-200 rounded-full"
                    >
                        <span class="font-medium text-green-600">{{ index }}</span>
                    </div>
                    <div class="flex-1 pl-5">
                        <h2 class="text-lg font-semibold">{{ conversation?.id }}</h2>
                    </div>
                    <div class="flex flex-col items-end">
                        <span class="text-sm text-gray-500">
                            {{ formatDateToFR(new Date(conversation?.updatedAt)) }}
                        </span>
                        <span class="bg-indigo-500 text-white px-2 py-1 rounded-md text-xs">{{
                            conversation.messages.length
                        }}</span>
                    </div>
                </div>
            </div>

            <footer class="bg-white border-t border-gray-300 flex justify-center p-4">
                <button @click="logout" class="bg-indigo-500 text-white px-4 py-2 rounded-md w-full">
                    Se déconnecter
                </button>
            </footer>
        </div>

        <!-- Modal -->
        <NewConvDialog
            :closeModal="closeModal"
            :isModalOpen="isModalOpen"
            :createConversation="createConversation"
        />
        

        <!-- Main Chat Area -->
        <div class="flex-1 flex flex-col">
            <div class="flex-1">
                <Conversation v-if="selectedConversation != null" :conversation="selectedConversation" />
                <Welcome v-else />
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import Welcome from './components/Welcome.vue'
import Conversation from './components/Conversation.vue'
import NewConvDialog from './components/NewConvDialog.vue'
import { Conversation as ConversationType } from './gql/graphql'
import { formatDateToFR } from './utils/formatDate'
import { useStore } from 'vuex'

const store = useStore()

const conversationList = ref<ConversationType[]>([])
const selectedConversation = ref<ConversationType | null>(null)

const isModalOpen = ref(false)

const openModal = () => {
    isModalOpen.value = true
}

const closeModal = () => {
    isModalOpen.value = false
}

const createConversation = () => {
    closeModal()
}

const logout = () => {
    store.dispatch('auth/logout')
}

onMounted(async () => {
    conversationList.value = [
        {
            id: '1',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            users: [
                {
                    id: '1',
                    username: 'user1',
                    email: '',
                    conversations: [],
                },
                {
                    id: '2',
                    username: 'user2',
                    email: '',
                    conversations: [],
                },
            ],
            messages: [
                {
                    id: '1',
                    content: 'Hello',
                    createdAt: '2021-10-10T10:10:10Z',
                    updatedAt: '2021-10-10T10:10:10Z',
                    conversation: {
                        id: '1',
                        users: [],
                        createdAt: '2021-10-10T10:10:10Z',
                        updatedAt: '2021-10-10T10:10:10Z',
                        messages: [],
                    },
                    sender: {
                        id: '1',
                        username: 'user1',
                        email: 'test@tes.com',
                        conversations: [],
                    },
                },
                {
                    id: '2',
                    content: 'Hi',
                    createdAt: '2021-10-10T10:10:10Z',
                    updatedAt: '2021-10-10T10:10:10Z',
                    conversation: {
                        id: '1',
                        users: [],
                        createdAt: '2021-10-10T10:10:10Z',
                        updatedAt: '2021-10-10T10:10:10Z',
                        messages: [],
                    },
                    sender: {
                        id: '2',
                        username: 'user2',
                        email: 'test@ddd.com',
                        conversations: [],
                    },
                },
                {
                    id: '3',
                    content: 'How are you?',
                    createdAt: '2021-10-10T10:10:10Z',
                    updatedAt: '2021-10-10T10:10:10Z',
                    conversation: {
                        id: '1',
                        users: [],
                        createdAt: '2021-10-10T10:10:10Z',
                        updatedAt: '2021-10-10T10:10:10Z',
                        messages: [],
                    },
                    sender: {
                        id: '1',
                        username: 'user1',
                        email: 'test@ddd.com',
                        conversations: [],
                    },
                },
                {
                    id: '4',
                    content: 'I am fine',
                    createdAt: '2021-10-10T10:10:10Z',
                    updatedAt: '2021-10-10T10:10:10Z',
                    conversation: {
                        id: '1',
                        users: [],
                        createdAt: '2021-10-10T10:10:10Z',
                        updatedAt: '2021-10-10T10:10:10Z',
                        messages: [],
                    },
                    sender: {
                        id: '2',
                        username: 'user2',
                        email: 'test@ddd.com',
                        conversations: [],
                    },
                },
                {
                    id: '2',
                    content: 'Hi',
                    createdAt: '2021-10-10T10:10:10Z',
                    updatedAt: '2021-10-10T10:10:10Z',
                    conversation: {
                        id: '1',
                        users: [],
                        createdAt: '2021-10-10T10:10:10Z',
                        updatedAt: '2021-10-10T10:10:10Z',
                        messages: [],
                    },
                    sender: {
                        id: '2',
                        username: 'user2',
                        email: 'test@ddd.com',
                        conversations: [],
                    },
                },
                {
                    id: '3',
                    content: 'How are you?',
                    createdAt: '2021-10-10T10:10:10Z',
                    updatedAt: '2021-10-10T10:10:10Z',
                    conversation: {
                        id: '1',
                        users: [],
                        createdAt: '2021-10-10T10:10:10Z',
                        updatedAt: '2021-10-10T10:10:10Z',
                        messages: [],
                    },
                    sender: {
                        id: '1',
                        username: 'user1',
                        email: 'test@ddd.com',
                        conversations: [],
                    },
                },
                {
                    id: '4',
                    content: 'I am fine',
                    createdAt: '2021-10-10T10:10:10Z',
                    updatedAt: '2021-10-10T10:10:10Z',
                    conversation: {
                        id: '1',
                        users: [],
                        createdAt: '2021-10-10T10:10:10Z',
                        updatedAt: '2021-10-10T10:10:10Z',
                        messages: [],
                    },
                    sender: {
                        id: '2',
                        username: 'user2',
                        email: 'test@ddd.com',
                        conversations: [],
                    },
                },
                {
                    id: '2',
                    content: 'Hi',
                    createdAt: '2021-10-10T10:10:10Z',
                    updatedAt: '2021-10-10T10:10:10Z',
                    conversation: {
                        id: '1',
                        users: [],
                        createdAt: '2021-10-10T10:10:10Z',
                        updatedAt: '2021-10-10T10:10:10Z',
                        messages: [],
                    },
                    sender: {
                        id: '2',
                        username: 'user2',
                        email: 'test@ddd.com',
                        conversations: [],
                    },
                },
                {
                    id: '3',
                    content: 'How are you?',
                    createdAt: '2021-10-10T10:10:10Z',
                    updatedAt: '2021-10-10T10:10:10Z',
                    conversation: {
                        id: '1',
                        users: [],
                        createdAt: '2021-10-10T10:10:10Z',
                        updatedAt: '2021-10-10T10:10:10Z',
                        messages: [],
                    },
                    sender: {
                        id: '1',
                        username: 'user1',
                        email: 'test@ddd.com',
                        conversations: [],
                    },
                },
                {
                    id: '4',
                    content: 'I am fine',
                    createdAt: '2021-10-10T10:10:10Z',
                    updatedAt: '2021-10-10T10:10:10Z',
                    conversation: {
                        id: '1',
                        users: [],
                        createdAt: '2021-10-10T10:10:10Z',
                        updatedAt: '2021-10-10T10:10:10Z',
                        messages: [],
                    },
                    sender: {
                        id: '2',
                        username: 'user2',
                        email: 'test@ddd.com',
                        conversations: [],
                    },
                },
            ],
        }
    ]
})
</script>

<style scoped></style>
