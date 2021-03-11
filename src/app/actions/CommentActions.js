import { likeComment, addComment, replyComment, getReplies, getComments } from '../../api/index'

export const like_comment = (comment_id) => dispatch => {
    likeComment(comment_id).then(res => {
        dispatch({
            type: 'LIKE_COMMENT',
            payload: res
        })
    }).catch(err => {
        console.log(err)
    })
}

export const add_comment = (data) => dispatch => {
    addComment(data).then(res => {
        getComments().then(res => {
            dispatch({
                type: 'ADD_COMMENT',
                payload: res
            })
        })

    }).catch(err => {
        console.log(err)
    })
}

export const reply_comment = (data) => dispatch => {
    replyComment(data).then(res => {
        dispatch({
            type: 'REPLY_COMMENT',
            payload: res
        })
    }).catch(err => {
        console.log(err)
    })
}

export const get_comments = () => dispatch => {
    getComments().then(res => {
        console.log(res)
        dispatch({
            type: 'GET_COMMENTS',
            payload: res
        })
    }).catch(err => {
        console.log(err)
    })
}

export const get_replies = (comment_id) => dispatch => {
    getReplies(comment_id).then(res => {
        dispatch({
            type: 'GET_REPLIES',
            payload: res
        })
    }).catch(err => {
        console.log(err)
    })
}