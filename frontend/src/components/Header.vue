<template>
    <div class="sticky bg-primary w-full p-3 top-0 flex items-start gap-2 justify-start">

        <img
            class="ml-4 my-3 h-12 w-24 mr-32 md:block hidden"
            src="../../public/vite.svg"
            alt="logo"
        />
        <div class="flex flex-col md:w-[85%] lg:w-[70%] w-full justify-center">
        </div>
        <DropdownMenu
            @logout="$emit('logout')"
            @new-post="$emit('newPost')"
            @profile="$emit('profile')"
            class="md:hidden block"
        />
    </div>
</template>

<script lang="ts">
import Avatar from './Avatar.vue'
import DropdownMenu from './DropdownMenu.vue'

export default {
    name: 'Header',
    components: {
        Avatar,
        DropdownMenu,
    },
    props: {
    },
    data() {
        return {}
            
    },
    methods: {
        
       
    },
}
</script>

<style scoped></style>
