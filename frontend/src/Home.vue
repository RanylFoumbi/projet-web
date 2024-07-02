<template>
    <div class="flex flex-col justify-center w-ful h-full">
        <div class="sticky top-0 z-10 w-full">
            <button
                @click="logout"
                class="bg-primary text-white p-2 rounded-md ml-2 mt-2"
            >
                Logout
            </button>

        </div>
        
    </div>
</template>

<script lang="ts">
import Loader from './components/Loader.vue'
import Header from './components/Header.vue'
import { useQuery } from 'villus'

export default {
    name: 'Home',
    components: {
        Loader,
        Header,
    },
    data() {
        return {
            showProfile: false,
        }
    },
    async mounted() {
        window.addEventListener('scroll', this.handleScroll)
    },
    beforeUnmount() {
        window.removeEventListener('scroll', this.handleScroll)
    },
    computed: {
    },
    methods: {

        logout() {
            this.$store.dispatch('auth/logout')
        },
    },
    watch: {
        creatingPost(value) {
            const body = document.body
            if (value) {
                body.classList.add('no-scroll')
            } else {
                body.classList.remove('no-scroll')
            }
        },
        showProfile(value) {
            const body = document.body
            if (value) {
                body.classList.add('no-scroll')
            } else {
                body.classList.remove('no-scroll')
            }
        },
        deletingPost(value) {
            const body = document.body
            if (value) {
                body.classList.add('no-scroll')
            } else {
                body.classList.remove('no-scroll')
            }
        },
    },
}
</script>

<style scoped></style>
