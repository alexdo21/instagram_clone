import { getPost } from '../../api/index'


export const like_post = () => dispatch => {
    // TODO
}
export const get_post = () => dispatch => {
    // grab post data from api
    getPost().then(res => {
        dispatch({
            type: 'GET_POST',
            payload: res
        })
    }).catch(err => {
        console.log(err)
    })

}

