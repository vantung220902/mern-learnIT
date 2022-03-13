import { createContext, useReducer, useState } from "react"
import { postReducer } from '../reducers/postReducer'
import { ADD_POST, apiUrl, DELETE_POST, FIND_POST, POST_LOADED_FAILED, POST_LOADED_SUCCESS, UPDATE_POST } from "./constant"
import axios from 'axios'

export const PostContext = createContext()

const PostContextProvider = ({ children }) => {
    //state
    const [postState, dispatch] = useReducer(postReducer, {
        posts: [],
        postsLoading: true,
        post: null
    })
    const [showAddModal, setShowAddModal] = useState(false)
    const [showUpdateModal, setShowUpdateModal] = useState(false)
    const [showToast, setShowToast] = useState({
        show: false,
        message: '',
        type: null

    })
    //get all posts
    const getPosts = async () => {
        try {
            const response = await axios.get(`${apiUrl}/posts`)
            if (response.data.success) {
                dispatch({
                    type: POST_LOADED_SUCCESS,
                    payload: response.data.posts
                })
            }

        } catch (error) {
            dispatch({
                type: POST_LOADED_FAILED
            })
        }
    }
    //Add a new Post
    const addPost = async newPost => {
        try {
            const response = await axios.post(`${apiUrl}/posts`, newPost)
            if (response.data.success)
                dispatch({
                    type: ADD_POST,
                    payload: response.data.post,
                })

            return response.data
        } catch (error) {
            return error.response.data ? error.response.data : { success: false, message: 'Server error' }
        }
    }
    //Delete a post
    const deletePost = async id => {
        try {
            const response = await axios.delete(`${apiUrl}/posts/${id}`)
            if (response.data.success) dispatch({
                type: DELETE_POST,
                payload: id
            })
            return response.data
        } catch (error) {
            return error.response.data ? error.response.data : { success: false, message: 'Server error' }
        }
    }
    //find a post
    const findPost = _id => {
        const post = postState.posts.find(post => post._id === _id);
        dispatch({
            type: FIND_POST,
            payload: post
        })
    }

    //Update
    const updatePost = async newPost => {
        console.log(newPost)
        try {
            const response = await axios.put(`${apiUrl}/posts/${newPost._id}`, newPost)
            if (response.data.success) {
                dispatch({
                    type: UPDATE_POST,
                    payload: response.data.post
                })
                return response.data
            }
        } catch (error) {
            return error.response.data ? error.response.data : { success: false, message: 'Server error' }
        }
    }

    const postContextData = {
        getPosts, postState, showAddModal,
        setShowAddModal, addPost, showToast,
        setShowToast, deletePost, updatePost,
        findPost, setShowUpdateModal, showUpdateModal
    }
    return (
        <PostContext.Provider value={postContextData}>
            {children}
        </PostContext.Provider>
    )
}
export default PostContextProvider