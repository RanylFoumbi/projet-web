<template>
    <div :class="className ? className : 'md:h-32 md:w-32 h-14 w-16 p-3'">
        <img
            v-if="avatar"
            class="w-full h-full rounded-full border-2 border-secondary object-cover object-center focus:z-10"
            :src="avatar"
            :alt="username + '\'s avatar'"
        />
        <div
            v-if="username && !avatar"
            class="rounded-full w-full h-full bg-secondary border-2 border-white flex items-center justify-center"
        >
            <p class="font-bold">{{ username[0].toUpperCase() }}</p>
        </div>
    </div>
</template>

<script setup lang="ts">
defineProps({
    username: String,
    avatar: String,
    className: String,
})
</script>
