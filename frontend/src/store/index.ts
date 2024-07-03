import { createStore } from 'vuex'
import { AuthState, auth } from './modules/auth'
import VuexPersister from 'vuex-persister'

const vuexPersister = new VuexPersister({})

const store = createStore<AuthState>({
    plugins: [vuexPersister.persist],
    modules: {
        auth,
    },
})

export default store
