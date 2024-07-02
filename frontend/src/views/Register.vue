<template>
    <div class="flex h-screen flex-col justify-center items-center px-6 py-12 lg:px-8">
        <div
            class="md:w-[40%] w-full lg:w-[30%] relative z-0 flex flex-col min-w-0 break-words bg-white border-0 shadow-2xl rounded-2xl bg-clip-border"
        >
            <div class="p-3 mb-0 text-center bg-white border-b-0 rounded-t-2xl">
                <img
                    class="mx-auto my-3 h-12 w-auto"
                    src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                    alt="Workflow"
                />
                <h2><b>Création de compte</b></h2>
            </div>

            <div class="flex-auto p-6">
                <div class="mb-4">
                    <input
                        type="text"
                        v-model="username"
                        :disabled="loading"
                        class="text-sm focus:shadow-primary-outline leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 px-3 font-normal text-gray-700 transition-all focus:border-indigo-600 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow"
                        placeholder="joehn"
                        aria-label="Email"
                        aria-describedby="email-addon"
                    />
                    <p v-if="usernameError && username !== ''" class="text-red-500 text-xs mt-2">{{ usernameError }}</p>
                </div>
                <div class="mb-4">
                    <input
                        type="email"
                        v-model="email"
                        :disabled="loading"
                        class="text-sm focus:shadow-primary-outline leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 px-3 font-normal text-gray-700 transition-all focus:border-indigo-600 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow"
                        placeholder="test@example.com"
                        aria-label="Email"
                        aria-describedby="email-addon"
                    />
                    <p v-if="emailError && email !== ''" class="text-red-500 mt-2 text-xs">{{ emailError }}</p>
                </div>
                <div class="mb-2 relative">
                    <input
                        :type="showPassword ? 'text' : 'password'"
                        placeholder="123#ER"
                        v-model="password"
                        :disabled="loading"
                        class="text-sm focus:shadow-primary-outline leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding p-2 font-normal text-gray-700 transition-all focus:border-indigo-600 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow"
                        aria-label="Password"
                        aria-describedby="password-addon"
                    />
                    <div class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500">
                        <i
                            :class="showPassword ? 'mdi mdi-eye' : 'mdi mdi-eye-off'"
                            @click="showPassword = !showPassword"
                        ></i>
                    </div>
                </div>
                <p v-if="passwordError && password !== ''" class="text-red-500 text-xs">{{ passwordError }}</p>
                <div class="text-center">
                    <button
                        :disabled="!isFormValid || loading"
                        type="button"
                        @click="register"
                        class="inline-block w-full px-6 py-3 mt-6 mb-2 font-bold text-center text-white uppercase align-middle transition-all bg-transparent border-0 rounded-lg cursor-pointer active:opacity-85 hover:-translate-y-px hover:shadow-md leading-normal text-xs ease-in tracking-tight-rem shadow-md bg-150 bg-x-25 bg-gradient-to-tl from-indigo-600 to-indigo-600 hover:border-indigo-600 hover:bg-indigo-600 hover:text-white"
                    >
                        Créer un compte
                    </button>
                </div>
                <p class="mt-4 mb-0 leading-normal text-sm">
                    J'ai déja un compte ? <a href="/login" class="font-bold text-indigo-600">Se connecter</a>
                </p>
            </div>
            <Loader :state="loading" />
        </div>
    </div>
</template>

<script>
import Loader from '../components/Loader.vue'
import router from '../router'

export default {
    name: 'Register',
    components: {
        Loader,
    },
    data() {
        return {
            email: '',
            username: '',
            password: '',
            showPassword: false,
        }
    },
    computed: {
        loading() {
            return this.$store.getters['auth/loadingRegister']
        },
        passwordError() {
            if (this.password.length < 6) {
                return 'Le mot de passe doit contenir au moins 6 caractères'
            }
            return null
        },
        emailError() {
            const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            if (!regex.test(this.email)) {
                return 'Adresse mail invalide !'
            }
            return null
        },
        usernameError() {
            if (this.username.length < 5) {
                return "Le nom d'utilisateur doit contenir au moins 5 caractères"
            }
            return null
        },
        isFormValid() {
            return (
                !this.passwordError &&
                !this.emailError &&
                !this.usernameError &&
                this.password !== '' &&
                this.email !== '' &&
                this.username !== ''
            )
        },
    },
    methods: {
        async register() {
            if (this.isFormValid) {
                await this.$store.dispatch('auth/register', {
                    email: this.email,
                    username: this.username,
                    password: this.password,
                })
            }
        },
    },
}
</script>

<style scoped></style>
