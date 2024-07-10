import { createStore } from 'vuex'
import VuexPersister from 'vuex-persister'
import { AuthState, auth } from './modules/auth'
import { ConversationState, conversation, GET_CONVERSATION_MESSAGES_QUERY, NEW_MESSAGE_SUBSCRIPTION } from './modules/conversation'

export { GET_CONVERSATION_MESSAGES_QUERY, NEW_MESSAGE_SUBSCRIPTION };

const vuexPersister = new VuexPersister({})

const store = createStore<AuthState, ConversationState>({
    plugins: [vuexPersister.persist],
    modules: {
        auth,
        conversation,
    },
})

export default store
