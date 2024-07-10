<template>
    <div class="flex h-screen overflow-hidden">
        <!-- Sidebar -->
        <div class="w-full sm:w-1/4 flex flex-col bg-white border-r border-gray-300">
            <!-- Sidebar Header -->
            <header class="p-4 border-b border-gray-300 flex justify-between items-center bg-indigo-600">
                <div
                    class="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-200 rounded-full"
                >
                    <span class="text-indigo-500 capitalize">{{
                        store?.state?.auth?.user?.username?.substring(0, 1)
                    }}</span>
                </div>
                <h1 class="text-md font-semibold text-white">Mes conversations</h1>
                <button @click="openModal" class="bg-indigo-500 text-white px-4 py-2 rounded-md">
                    <i class="mdi mdi-plus"></i>
                </button>
            </header>

            <!-- Contact Conversations -->
            <div class="flex-1 overflow-y-auto p-3">
                <div
                    v-if="conversationList.length > 0"
                    v-for="(conversation, index) in conversationList"
                    :key="index"
                    class="flex items-center mb-4 cursor-pointer bg-gray-100 p-2 rounded-md"
                    @click="selectConversation(index)"
                >
                    <div
                        class="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-200 rounded-full"
                    >
                        <span class="text-gray-500 capitalize">{{ conversation?.name?.charAt(0) }}</span>
                    </div>
                    <div class="flex-1 pl-5">
                        <h3 class="font-semibold capitalize">{{ conversation?.name }}</h3>
                        <p class="text-sm text-gray-500">{{ lastConvMessage(conversation) }}</p>
                    </div>
                    <div class="flex flex-col items-end">
                        <span class="text-sm text-gray-500">
                            {{ formatDateToFR(conversation?.updatedAt) }}
                        </span>
                        <span class="bg-indigo-500 text-white px-2 py-1 rounded-md text-xs">{{
                            conversation?.messages?.length || 0
                        }}</span>
                    </div>
                </div>

                <div v-else class="flex items-center justify-center h-full">
                    <p class="text-gray-500">Aucune conversation</p>
                </div>
            </div>

            <footer class="bg-white border-t border-gray-300 flex justify-center p-4">
                <button @click="logout" class="bg-indigo-500 text-white px-4 py-2 rounded-md w-full">
                    <i class="mdi mdi-logout text-xl mr-4"></i>  Se déconnecter  
                </button>
            </footer>
        </div>

        <!-- Modal -->
        <NewConvDialog :users="users" :closeModal="closeModal" :isModalOpen="isModalOpen" />

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
import { computed, onMounted, ref } from 'vue'
import Welcome from './components/Welcome.vue'
import Conversation from './components/Conversation.vue'
import NewConvDialog from './components/NewConvDialog.vue'
import { Conversation as ConversationType, User } from './gql/graphql'
import { formatDateToFR } from './utils/formatDate'
import { useStore } from 'vuex'

const store = useStore()

const users = ref<User[]>([])
const selectedConversation = ref<ConversationType | null>(null)
const conversationList = computed(() => store.state.conversation.conversations)

const isModalOpen = ref(false)

const lastConvMessage = (conversation: ConversationType) =>
    computed(() => {
        return conversation.messages[conversation.messages.length - 1]?.content || ''
    })

const openModal = async () => {
    isModalOpen.value = true
    await store.dispatch('conversation/getUsers', '')
    users.value = store.state.conversation?.users || []
}

const closeModal = () => {
    isModalOpen.value = false
}

const selectConversation = async (index: number) => {
    selectedConversation.value = conversationList.value[index]
}

const logout = () => {
    store.dispatch('auth/logout')
}

onMounted(async () => {
    await store.dispatch('conversation/getConversations', store.state.auth.user?.id)
})
</script>

<style scoped></style>
