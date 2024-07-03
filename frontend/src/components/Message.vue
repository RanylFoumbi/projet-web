<template>
    <div v-if="props?.message?.content == 'DISCONNECTION_MESSAGE'">
        <div class="flex items-center justify-center w-full my-7">
            <div class="flex flex-col items-center gap-1.5 p-2.5 bg-gray-100 rounded-xl">
                <span class="text-sm font-normal text-red-400">{{ props?.message?.createdAt }}</span>
                <span class="text-sm font-normal text-gray-400"
                    ><b class="text-black">{{ formatName(props?.message?.sender?.username) }}</b> a quitté la
                    conversation</span
                >
            </div>
        </div>
    </div>

    <div v-else-if="props?.message?.content == 'CONNECTION_MESSAGE'">
        <div class="flex items-center justify-center w-full my-7">
            <div class="flex flex-col items-center gap-1.5 p-2.5 bg-gray-100 rounded-xl">
                <span class="text-sm font-normal text-green-400">{{ props?.message?.createdAt }}</span>
                <span class="text-sm font-normal text-gray-400"
                    ><b class="text-black">{{ formatName(props?.message?.sender?.username) }}</b> vient de rejoindre la
                    conversation</span
                >
            </div>
        </div>
    </div>

    <div v-else :class="isMine ? 'flex justify-end' : 'w-full'">
        <div :class="isMine ? 'flex items-start flex-row-reverse gap-2.5 my-7' : 'flex items-start gap-2.5 my-9'">
            <div class="flex mb-2">
                <div class="rounded py-2 px-3" style="background-color: #f2f2f2">
                    <p v-if="!isMine" class="text-sm text-teal font-bold">
                        {{ formatName(props?.message?.sender?.username) }}
                    </p>
                    <p class="text-sm mt-1">
                        {{ props?.message?.content }}
                    </p>
                    <p class="text-right text-xs text-grey-dark mt-1">
                        {{ formatDateToFR(props?.message?.createdAt) }}
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { computed, defineProps, onMounted } from 'vue'
import { Message } from '../gql/graphql'
import { formatDateToFR } from '../utils/formatDate'

const props = defineProps<{
    message: Message | null
}>()

const isMine = computed(() => props?.message?.sender.id === '1')

const formatName = (name: string) => {
    if (!name) return ''
    return name.charAt(0).toUpperCase() + name.slice(1)
}

onMounted(() => {
    console.log('Message mounted', props.message)
})
</script>

<style scoped></style>
