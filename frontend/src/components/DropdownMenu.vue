<template>
    <div class="relative inline-block text-left">
        <div class="flex" @click="toggleDropdown">
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
        <div
            :class="{
                hidden: !isDropdownVisible,
                absolute: isDropdownVisible,
                'right-0': isDropdownVisible,
                'z-10': isDropdownVisible,
                'mt-2': isDropdownVisible,
                'w-56': isDropdownVisible,
                'origin-top-right': isDropdownVisible,
                'rounded-md': isDropdownVisible,
                'bg-white': isDropdownVisible,
                'shadow-lg': isDropdownVisible,
                'ring-1': isDropdownVisible,
                'ring-black': isDropdownVisible,
                'ring-opacity-5': isDropdownVisible,
                'focus:outline-none': isDropdownVisible,
                'cursor-pointer': isDropdownVisible,
            }"
            id="user-dropdown"
        >
            <ul class="py-2" aria-labelledby="user-menu-button">
                <li>
                    <a @click="leaveConversation" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        <i class="mdi mdi-logout text-lg"></i>
                        Quitter la conversation</a
                    >
                </li>
                <li v-if="conversation.creatorId === store.state.auth.user.id">
                    <a @click="deleteConversation" class="block px-4 py-2 text-sm text-red-700 hover:bg-gray-100">
                        <i class="mdi mdi-delete text-lg"></i>
                        Supprimer la conversation</a
                    >
                </li>
            </ul>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { Conversation } from '../gql/graphql'

const store = useStore()

const props = defineProps<{
    conversation: Conversation
}>()

const isDropdownVisible = ref(false)

const toggleDropdown = () => {
    isDropdownVisible.value = !isDropdownVisible.value
}

const leaveConversation = async () => {
    console.log('Leave conversation')
    // await store.dispatch('conversations/leaveConversation', props.conversation.id, store.state.auth.user.id)
    // toggleDropdown()
}

const deleteConversation = async () => {
    console.log('Delete conversation')
    await store.dispatch('conversation/deleteConversation', {
        convId: props.conversation.id,
        userId: store.state.auth.user.id,
    })
    toggleDropdown()
}
</script>
