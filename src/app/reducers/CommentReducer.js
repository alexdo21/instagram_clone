/* eslint-disable import/no-anonymous-default-export */
const initialState = {
    comments: [],
    replies: []
}

export default (state=initialState, action) => {
    switch (action.type) {
        case 'LIKE_COMMENT':
            return {
                ...state
            }
        case 'ADD_COMMENT':
            return {
                ...state
            }
        case 'REPLY_COMMENT':
            return {
                ...state
            }
        case 'GET_COMMENTS':
            return {
                ...state,
                comments: action.payload
            }
        case 'GET_REPLIES':
            return {
                ...state,
                replies: action.payload
            }
        default:
            return {
                ...state
            }
    }
}