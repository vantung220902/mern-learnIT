import { POST_LOADED_FAILED, POST_LOADED_SUCCESS, ADD_POST, UPDATE_POST, FIND_POST } from "../contexts/constant"
import { DELETE_POST } from './../contexts/constant';

export const postReducer = (state, action) => {
    const { type, payload } = action
    switch (type) {
        case POST_LOADED_SUCCESS:
            return {
                ...state,
                posts: payload,
                postsLoading: false,
            }
        case POST_LOADED_FAILED:
            return {
                ...state,
                posts: [],
                postsLoading: false,
            }
        case ADD_POST:
            return {
                ...state,
                posts: [
                    ...state.posts,
                    payload,
                ]
            }
        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter(post => post._id !== payload)
            }
        case UPDATE_POST:
            const newPosts = state.posts.map(post => {
                return post._id === payload._id ? payload : post
            })
            return {
                ...state,
                posts: newPosts
              
            }
        case FIND_POST:
            return {
                ...state,
                post: payload
            }
        default: return state
    }
}