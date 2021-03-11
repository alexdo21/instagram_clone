/* eslint-disable import/no-anonymous-default-export */
const initialState = {
    post: {}
}

export default (state=initialState, action) => {
    switch (action.type) {
        case 'GET_POST':
            return {
                ...state,
                post: action.payload
            }
        default:
            return {
                ...state
            }
    }
}