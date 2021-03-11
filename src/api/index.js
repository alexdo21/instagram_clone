import { v4 as uuidv4 } from 'uuid'

import { user, postId } from './config'
import posts from './posts'
import comments from './comments'

// init local storage with mock data
export const initApp = () => {
    localStorage.setItem("user", user)
    localStorage.setItem("posts", JSON.stringify(posts))
    localStorage.setItem("postId", postId)
    localStorage.setItem("comments", JSON.stringify(comments))
}

// getPost with postId
export const getPost = () =>
    new Promise((resolve, reject) => {
        const postId = localStorage.getItem("postId")
        const postsJson = localStorage.getItem("posts")
        const postsData = JSON.parse(postsJson)
        const post = postsData[postId]
        console.log(post)
        resolve(post)
})


// like a comment/reply with comment_id
export const likeComment = (comment_id) =>
    new Promise((resolve, reject) => {
        const commentsJson = localStorage.getItem("comments")
        const commentsData = JSON.parse(commentsJson)

        commentsData[comment_id].likesCount++

        localStorage.setItem("comments", JSON.stringify(commentsData))
        resolve(commentsData)
})

// addComment to post with post_id
export const addComment = (data) =>
    new Promise((resolve, reject) => {
        const comment_id = uuidv4()
        const user = localStorage.getItem("user")
        const comment = {
            id: comment_id,
            post_id: data.post_id,
            time: "0h", 
            comment_user: user,
            likesCount: 0,
            content: data.content,
            isReply: false,
            parent_id: null
        }
        const commentsJson = localStorage.getItem("comments")
        const commentsData = JSON.parse(commentsJson)
        commentsData[comment_id] = comment

        const postsJson = localStorage.getItem("posts")
        const postsData = JSON.parse(postsJson)
        postsData.commentsCount++

        localStorage.setItem("comments", JSON.stringify(commentsData))
        localStorage.setItem("posts", JSON.stringify(postsData))

        resolve(commentsData[comment_id])
    })

// add reply to a comment with parent_id
export const replyComment = (data) => 
    new Promise((resolve, reject) => {
        const reply_id = uuidv4()
        const reply = {
            id: reply_id,
            post_id: data.post_id,
            time: data.time, 
            comment_user: data.comment_user,
            likesCount: 0,
            content: data.content,
            isReply: true,
            parent_id: data.parent_id
        }

        const commentsJson = localStorage.getItem("comments")
        const commentsData = JSON.parse(commentsJson)
        commentsData[reply_id] = reply

        const postsJson = localStorage.getItem("posts")
        const postsData = JSON.parse(postsJson)
        postsData.commentsCount++

        localStorage.setItem("comments", JSON.stringify(commentsData))
        localStorage.setItem("posts", JSON.stringify(postsData))

        resolve(commentsData)

    }) 


// get comments of post with post_id
export const getComments = () =>
    new Promise((resolve, reject) => {
        const postId = localStorage.getItem("postId")
        const commentsJson = localStorage.getItem("comments")
        const commentsData = JSON.parse(commentsJson)
        var commentsList = []
        for (var key in commentsData) {
            if (commentsData.hasOwnProperty(key)) {
                if (commentsData[key].post_id === postId) {
                    commentsList.push(commentsData[key])
                }
            }
        }
        console.log(commentsList)
        resolve(commentsList)
    })

// get replies of comment with comment_id
export const getReplies = (comment_id) => 
    new Promise((resolve, reject) => {
        const commentsJson = localStorage.getItem("comments")
        const commentsData = JSON.parse(commentsJson)
        var repliesList = []

        for (var key in commentsData) {
            if (commentsData.hasOwnProperty(key)) {
                if (commentsData[key].isReply && commentsData[key].parent_id === comment_id) {
                    repliesList.push(commentsData.key)
                }
            }
        }

        resolve(repliesList)
    })