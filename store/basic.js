export const state = () => ({
    quiz: [
        {
            id: 1,
            text: 'Question 1 text will be here...',
            answers: [
                { id: 1, text: 'Option A', isCorrect: true },
                { id: 2, text: 'Option B', isCorrect: false },
                { id: 3, text: 'Option C', isCorrect: false },
                { id: 4, text: 'Option D', isCorrect: false },
            ],
            status: true,
        },
        {
            id: 2,
            text: 'Question 2 text will be here...',
            answers: [
                { id: 1, text: 'Option A', isCorrect: false },
                { id: 2, text: 'Option B', isCorrect: true },
                { id: 3, text: 'Option C', isCorrect: false },
                { id: 4, text: 'Option D', isCorrect: false },
            ],
            status: true,
        },
        {
            id: 3,
            text: 'Question 3 text will be here...',
            answers: [
                { id: 1, text: 'Option A', isCorrect: false },
                { id: 2, text: 'Option B', isCorrect: false },
                { id: 3, text: 'Option C', isCorrect: true },
                { id: 4, text: 'Option D', isCorrect: false },
            ],
            status: true,
        }
    ]
})

export const mutations = {
    setQuiz(state, payload) {
        state.quiz = payload
    }
}

export const actions = {
    async getQuiz({ dispatch, commit, getters, state }, payload) {
        if (payload == 1) {
            let quiz = [
                {
                    id: 1,
                    text: 'Question 1 text will be here...',
                    answers: [
                        { id: 1, text: 'Option A', isCorrect: true },
                        { id: 2, text: 'Option B', isCorrect: false },
                        { id: 3, text: 'Option C', isCorrect: false },
                        { id: 4, text: 'Option D', isCorrect: false },
                    ],
                    status: true,
                },
                {
                    id: 2,
                    text: 'Question 2 text will be here...',
                    answers: [
                        { id: 1, text: 'Option A', isCorrect: false },
                        { id: 2, text: 'Option B', isCorrect: true },
                        { id: 3, text: 'Option C', isCorrect: false },
                        { id: 4, text: 'Option D', isCorrect: false },
                    ],
                    status: true,
                },
                {
                    id: 3,
                    text: 'Question 3 text will be here...',
                    answers: [
                        { id: 1, text: 'Option A', isCorrect: false },
                        { id: 2, text: 'Option B', isCorrect: false },
                        { id: 3, text: 'Option C', isCorrect: true },
                        { id: 4, text: 'Option D', isCorrect: false },
                    ],
                    status: true,
                }
            ]
            return quiz
        } else {
            return false
        }
    }
}

export const getters = {
    quiz: (state) => state.quiz
}