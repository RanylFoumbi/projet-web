<template>
    <div v-if="props.isModalOpen" class="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
        <div
            id="crud-modal"
            ref="modal"
            tabindex="-1"
            aria-hidden="true"
            class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full"
        >
            <div class="relative p-4 w-full max-w-md max-h-full">
                <!-- Modal content -->
                <div class="relative bg-white rounded-lg shadow">
                    <!-- Modal header -->
                    <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                        <h3 class="text-lg font-semibold text-gray-900">Créer une nouvelle conversation</h3>
                        <button
                            type="button"
                            @click="props.closeModal"
                            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center"
                        >
                            <svg
                                class="w-3 h-3"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 14 14"
                            >
                                <path
                                    stroke="currentColor"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                />
                            </svg>
                            <span class="sr-only">Close modal</span>
                        </button>
                    </div>
                    <!-- Modal body -->
                    <form class="p-4 md:p-5">
                        <div class="grid gap-4 mb-4 grid-cols-2">
                            <div class="col-span-2">
                                <label for="name" class="block mb-2 text-sm font-medium text-gray-900">Nom</label>
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    v-model="name"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                    placeholder="Type product name"
                                />
                            </div>
                            <div class="col-span-2">
                                <label for="price" class="block mb-2 text-sm font-medium text-gray-900"
                                    >Participants</label
                                >
                                <select
                                    multiple
                                    v-model="selectedUsers"
                                    class="bg-gray-50 border border-gray-300 capitalize text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                >
                                    <option v-for="user in props?.users" :key="user?.id" :value="user?.id">
                                        {{ user?.username }}
                                    </option>
                                </select>
                            </div>
                        </div>
                        <button
                            type="button"
                            @click="createConversation"
                            class="text-white inline-flex items-center bg-indigo-600 hover:bg-indigo-600 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                        >
                            <svg
                                class="me-1 -ms-1 w-5 h-5"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fill-rule="evenodd"
                                    d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                                    clip-rule="evenodd"
                                ></path>
                            </svg>
                            Créer la conversation
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, defineProps } from 'vue'
import { User } from '../gql/graphql.ts'
import { useStore } from 'vuex'

const store = useStore()

const props = defineProps<{
    users: User[]
    isModalOpen: boolean
    closeModal: Function
}>()

const name = ref('')
const selectedUsers = ref<String[]>([])

const createConversation = async () => {
    await store.dispatch('conversation/createConversation', {
        name: name.value,
        creatorId: store.state.auth.user?.id,
        users: [...selectedUsers.value, store.state.auth.user?.id],
    })
    props.closeModal()
    name.value = ''
    selectedUsers.value = []
}
</script>

<style scoped></style>
