export const state = () => ({
    user: {
        email: 'yasin@test.com',
        username: 'HypeR4',
        password: 'testtest'
    },
    // Login olmuş aktif kullanıcının bilgileri burada tutulur
    currentUser: {
        email: null,
    }
})

export const mutations = {
    // Kullanıcı login olduğunda store'a set edilir
    setCurrentUser(state, payload) {
        state.currentUser = payload
    },
    // Kullanıcı logout'a tıkladığında bu değer clear edilir
    clearCurrentUser(state) {
        state.currentUser.email = null
    }
}

export const actions = {
    // Register
    async register({ dispatch, commit, getters, state }, payload) {
        if (payload == 1) {
            return currentUser
        } else {
            return false
        }
    },
    // Forgot Password
    async forgotPassword({ dispatch, commit, getters, state }, payload) {
        if (payload == 1) {
            return currentUser
        } else {
            return false
        }
    },
    // Check User (Sadece username gönderilir, kayıtta böyle bir kullanıcı olup olmadığı kontrol edilir.)
    async checkUser({ dispatch, commit, getters, state }, payload) {
        if (payload.email == this.state.user.email) {
            // console.log('CHECK USER -> PAYLOAD: ', payload, 'STATE EMAIL: ', this.state.user.user.email)
            return true
        } else {
            return false
        }
    },
    // Login
    async loginUser({ dispatch, commit, getters, state }, payload) {
        if (payload.email == this.state.user.user.email) {
            // console.log('LOGIN USER EMAIL -> PAYLOAD: ', payload.email, 'STATE EMAIL: ', this.state.user.user.email)
            if (payload.password == this.state.user.user.password) {
                // console.log('LOGIN USER PASSWORD -> PAYLOAD: ', payload.password, 'STATE EMAIL: ', this.state.user.user.password)
                return true
            } else {
                return false
            }
            return true
        } else {
            return false
        }
    },
}

export const getters = {
    currentUser: (state) => state.currentUser
}