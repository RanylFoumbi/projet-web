<template>
    <div class="relative inline-block text-left">
        <div>
            <Avatar
                id="menu-button"
                :aria-expanded="isMenuOpen"
                aria-haspopup="true"
                :username="user?.username"
                :avatar="user?.profile?.original"
                class-name="w-12 h-12 text-xl cursor-pointer"
                @click="toggleMenu"
            />
        </div>

        <div
            v-show="isMenuOpen"
            class="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="menu-button"
            tabindex="-1"
        >
            <div class="py-1" role="none">
                <span
                    @click="emit('newPost')"
                    class="block px-4 py-2 text-sm text-gray-700 cursor-pointer hover:text-primary"
                    role="menuitem"
                    tabindex="-1"
                    id="menu-item-0"
                    >Créer un post</span
                >
                <span
                    @click="emit('profile')"
                    class="block px-4 py-2 text-sm text-gray-700 cursor-pointer hover:text-primary"
                    role="menuitem"
                    tabindex="-1"
                    id="menu-item-1"
                    >Mon profil</span
                >
                <span
                    @click="emit('logout')"
                    class="block px-4 py-2 text-sm text-gray-700 cursor-pointer hover:text-primary"
                    role="menuitem"
                    tabindex="-1"
                    id="menu-item-2"
                    >Déconnexion</span
                >
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useStore } from 'vuex'
import Avatar from './Avatar.vue'
import { ref } from 'vue'

const store = useStore()

const isMenuOpen = ref(false)
const user = ref(store.state.auth.user)
const emit = defineEmits(['profile', 'logout', 'newPost'])

const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value
}
</script>
