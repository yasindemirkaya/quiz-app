export const state = () => ({
    tournamentDetails: {
        id: 1,
        title: 'Tournament 1 Title',
        description: 'Tournament 1 Description',
        category: 'Tournament 1 Category'
    },
    tournamentItems: [
        { id: 1, name: 'Item 1' },
        { id: 2, name: 'Item 2' },
        { id: 3, name: 'Item 3' },
        { id: 4, name: 'Item 4' },
        { id: 5, name: 'Item 5' },
        { id: 6, name: 'Item 6' },
        { id: 7, name: 'Item 7' },
        { id: 8, name: 'Item 8' },
        { id: 9, name: 'Item 9' },
        { id: 10, name: 'Item 10' },
        { id: 11, name: 'Item 11' },
        { id: 12, name: 'Item 12' },
        { id: 13, name: 'Item 13' },
        { id: 14, name: 'Item 14' },
        { id: 15, name: 'Item 15' },
        { id: 16, name: 'Item 16' },
    ],
})

export const mutations = {
    setTournamentItems(state, payload) {
        state.tournamentItems = payload
    },
    clearTournamentItems(state) {
        state.tournamentItems = []
    },
    setTournamentDetails(state, payload) {
        state.tournamentDetails = payload
    },
}

export const actions = {
    async getTournamentItems({ dispatch, commit, getters, state }, payload) {
        if (payload == 1) {
            let tournamentItems = [
                { id: 1, name: 'Item 1' },
                { id: 2, name: 'Item 2' },
                { id: 3, name: 'Item 3' },
                { id: 4, name: 'Item 4' },
                { id: 5, name: 'Item 5' },
                { id: 6, name: 'Item 6' },
                { id: 7, name: 'Item 7' },
                { id: 8, name: 'Item 8' },
                { id: 9, name: 'Item 9' },
                { id: 10, name: 'Item 10' },
                { id: 11, name: 'Item 11' },
                { id: 12, name: 'Item 12' },
                { id: 13, name: 'Item 13' },
                { id: 14, name: 'Item 14' },
                { id: 15, name: 'Item 15' },
                { id: 16, name: 'Item 16' },
            ]
            return tournamentItems
        } else {
            return false
        }
    },
    async getTournamentDetails({ dispatch, commit, getters, state }, payload) {
        if (payload == 1) {
            let details = {
                id: 1,
                title: 'Tournament 1 Title',
                description: 'Tournament 1 Description',
                category: 'Tournament 1 Category'
            }
            return details
        } else {
            return false
        }
    },
}

export const getters = {
    tournamentItems: (state) => state.tournamentItems,
    tournamentDetails: (state) => state.tournamentDetails
}