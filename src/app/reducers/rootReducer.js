import { combineReducers } from 'redux'
import PostReducer from './PostReducer'
import CommentReducer from './CommentReducer'

export default combineReducers({
    Post: PostReducer,
    Comments: CommentReducer
})