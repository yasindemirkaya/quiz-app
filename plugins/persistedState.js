import createPersistedState from 'vuex-persistedstate'
import SecureLS from 'secure-ls'

const ls = new SecureLS({ isCompression: false })

export default ({ store }) => {
    createPersistedState({
        key: 'qa',
        paths: ['basic', 'tournament', 'user'],
        storage: {
            getItem: (key) => ls.get(key),
            setItem: (key, value) => ls.set(key, value),
            removeItem: (key) => ls.remove(key)
        }
    })(store)
}