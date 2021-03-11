import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/rootReducer';

import { initApp } from '../api/index'
import posts from '../api/posts'

import { postId } from '../api/config'

initApp()
const post = posts[postId]

const initialState = {
  Post: { post: post },
  Comments: { comments: [], replies: []}
}

const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
)

export default store