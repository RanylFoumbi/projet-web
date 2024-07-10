import { createStore } from 'vuex'
import VuexPersister from 'vuex-persister'
import { AuthState, auth } from './modules/auth'
import { ConversationState, conversation } from './modules/conversation'

const vuexPersister = new VuexPersister({})

const store = createStore<AuthState, ConversationState>({
    plugins: [vuexPersister.persist],
    modules: {
        auth,
        conversation,
    },
})

export default store
