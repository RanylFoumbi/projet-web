<template>
    <div :class="isMine ? 'flex justify-end' : 'w-full'">
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
import { useStore } from 'vuex'

const store = useStore()

const props = defineProps<{
    message: Message | null
}>()

const isMine = computed(() => props?.message?.sender?.id === store.state.auth.user?.id)

const formatName = (name: string) => {
    if (!name) return ''
    return name.charAt(0).toUpperCase() + name.slice(1)
}

onMounted(() => {
    console.log('Message mounted', props.message)
})
</script>

<style scoped></style>
