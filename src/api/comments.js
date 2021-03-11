import { v4 as uuidv4 } from 'uuid'
import { postId } from './config'

const commentId1 = uuidv4()
const commentId2 = uuidv4()
const commentId3 = uuidv4()
const commentId4 = uuidv4()
const commentId5 = uuidv4()
const commentId6 = uuidv4()
const commentId7 = uuidv4()
const commentId8 = uuidv4()
const commentId9 = uuidv4()

// mock comments
const comments = {
    [commentId1]: {
        id: commentId1,
        post_id: postId,
        time: "3h",
        comment_user: "sarahpicconi",
        likesCount: 1,
        content: "Come on!!",
        isReply: false,
        parent_id: null
    },
    [commentId2]: {
        id: commentId2,
        post_id: postId,
        time: "2h",
        comment_user: "nicolachilton",
        likesCount: 1,
        content: "the horses are so cool!",
        isReply: false,
        parent_id: null
    },
    [commentId3]: {
        id: commentId3,
        post_id: postId,
        time: "1h",
        comment_user: "alicedurbin",
        likesCount: 0,
        content: "@nicolachilton truly stunning!",
        isReply: true,
        parent_id: commentId2
    },
    [commentId4]: {
        id: commentId4,
        post_id: postId,
        time: "5h",
        comment_user: "jromas",
        likesCount: 1,
        content: "I'm weeping",
        isReply: false,
        parent_id: null
    },
    [commentId5]: {
        id: commentId5,
        post_id: postId,
        time: "4h",
        comment_user: "kiki.kaz75",
        likesCount: 1,
        content: "Miss Thang!!!",
        isReply: false,
        parent_id: null
    },
    [commentId6]: {
        id: commentId6,
        post_id: postId,
        time: "6h",
        comment_user: "jenniepart",
        likesCount: 0,
        content: "cool drink she's holding...",
        isReply: false,
        parent_id: null
    },
    [commentId7]: {
        id: commentId7,
        post_id: postId,
        time: "7h",
        comment_user: "erinmoos",
        likesCount: 0,
        content: "this is adorable!!!!!",
        isReply: false,
        parent_id: null
    },
    [commentId8]: {
        id: commentId8,
        post_id: postId,
        time: "3h",
        comment_user: "lisacericola",
        likesCount: 1,
        content: "what a magical place!",
        isReply: false,
        parent_id: null
    },
    [commentId9]: {
        id: commentId9,
        post_id: postId,
        time: "1h",
        comment_user: "heddaville",
        likesCount: 2,
        content: "this looks like a fairytale",
        isReply: false,
        parent_id: null
    }
}

export default comments