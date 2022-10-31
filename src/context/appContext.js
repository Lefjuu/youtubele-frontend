import React, { useContext, useReducer } from 'react'
import {
    TOGGLE_SIDEBAR,
    TOGGLE_LOGIN_PAGE,
    SETUP_USER_BEGIN,
    SETUP_USER_SUCCESS,
    SETUP_USER_ERROR,
    DISPLAY_ALERT,
    CLEAR_ALERT,
    UPDATE_USER_BEGIN,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_ERROR,
    LOGOUT_USER,
    ADD_VIDEO_BEGIN,
    ADD_VIDEO_SUCCESS,
    ADD_VIDEO_ERROR,
    GET_VIDEOS_BEGIN,
    GET_VIDEOS_SUCCESS,
    GET_VIDEO_BEGIN,
    GET_VIDEO_SUCCESS,
    GET_VIDEO_ERROR,
    // DISPLAY_VIDEO,
    // FIND_AUTHOR_BEGIN,
    // FIND_AUTHOR_SUCCESS,
    // FIND_AUTHOR_ERROR,
    FIND_USER_BEGIN,
    FIND_USER_SUCCESS,
    FIND_USER_ERROR,
    FOLLOW_USER_BEGIN,
    FOLLOW_USER_SUCCESS,
    UNFOLLOW_USER_BEGIN,
    UNFOLLOW_USER_SUCCESS
} from './actions'

import reducer from './reducer'
import axios from 'axios'

const token = localStorage.getItem('token')
const user = localStorage.getItem('user')
// const followings = localStorage.getItem('followings')

const initialState = {
    isLoading: false,
    showAlert: false,
    alertText: '',
    alertType: '',
    user: user ? JSON.parse(user) : null,
    // followings: followings ? JSON.stringify[(followings)] : null,
    followings: [],
    showSidebar: true,
    showLoginPage: false,
    token: token,
    videos: [],
    // isFollowed: false,
}

const AppContext = React.createContext()

const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    const authFetch = axios.create({
        baseURL: '/api/v1/'
    })

    authFetch.interceptors.request.use((config) => {
        config.headers.common['Authorization'] = `Bearer ${state.token}`
        return config
    }, (error) => {
        return Promise.reject(error)
    })

    authFetch.interceptors.response.use((response) => {
        return response
    }, (error) => {
        if (error.response.status === 401) {
            logoutUser()
            console.log('logout');
        }
        return Promise.reject(error)
    })

    const addUserToLocalStorage = ({ user, token, followings }) => {
        localStorage.setItem('user', JSON.stringify(user))
        localStorage.setItem('token', token)
        // localStorage.setItem('followings', followings)

    }

    const removeUserFromLocalStorage = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        // localStorage.removeItem('followings')
    }

    const uploadImage = async (previewSource) => {
        const base64EncodedImage = previewSource
        if (base64EncodedImage) {
            const fetchImage = await fetch('/api/uploadImage', {
                method: 'POST',
                body: JSON.stringify({ data: base64EncodedImage }),
                headers: { 'Content-Type': 'application/json' },
            }).then((response) => response.json())
                .then((data) => {
                    return data
                });
            return fetchImage
        } else {
            return
        }
    }

    const uploadVideo = async (video) => {
        const base64EncodedImage = video
        if (base64EncodedImage) {
            const fetchVideo = await fetch('/api/uploadVideo', {
                method: 'POST',
                body: JSON.stringify({ data: base64EncodedImage }),
                headers: { 'Content-Type': 'application/json' },
            }).then((response) => response.json())
                .then((data) => {
                    return data
                });
            console.log(fetchVideo);
            return fetchVideo
        } else {
            return
        }
    }

    const getAllVideos = async () => {
        dispatch({ type: GET_VIDEOS_BEGIN })

        try {
            const { data } = await axios.get(`/api/v1/video`)
            // console.log(data);
            if (!data) {
                console.log('not found');
            }
            dispatch({
                type: GET_VIDEOS_SUCCESS,
                payload: {
                    videos: data
                }
            })
        } catch (error) {
            console.log(error);
        }
    }

    const getVideo = async (id) => {
        dispatch({ type: GET_VIDEO_BEGIN })

        try {
            const { data } = await axios.get(`/api/v1/video/${id}`)
            dispatch({
                type: GET_VIDEO_SUCCESS,
            })
            return data
        } catch (error) {
            console.log(error);
        }
    }

    // const findVideo = async (id) => {
    //     dispatch({ type: DISPLAY_VIDEO, payload: { id } })
    //     console.log(id);
    // }

    const setupUser = async ({ currentUser, endPoint, alertText }) => {
        dispatch({ type: SETUP_USER_BEGIN })
        try {
            const { data } = await axios.post(`/api/v1/auth/${endPoint}`, currentUser)
            console.log(currentUser);

            const { user, token, followings } = data

            dispatch({
                type: SETUP_USER_SUCCESS,
                payload: { user, token, alertText }
            })
            addUserToLocalStorage({ user, token, followings })
        } catch (error) {
            dispatch({
                type: SETUP_USER_ERROR,
                payload: { msg: error.response.data.msg }
            })
        }
        clearAlert()
    }

    const toggleSidebar = () => {
        dispatch({ type: TOGGLE_SIDEBAR })
    }

    const toggleLoginPage = () => {
        dispatch({ type: TOGGLE_LOGIN_PAGE })
    }

    const displayAlert = () => {
        dispatch({ type: DISPLAY_ALERT })
        clearAlert()
    }

    const logoutUser = () => {
        dispatch({ type: LOGOUT_USER })
        removeUserFromLocalStorage()
    }

    const clearAlert = () => {
        setTimeout(() => {
            dispatch({ type: CLEAR_ALERT })
        }, 3000)
    }

    const updateUser = async (currentUser) => {
        dispatch({ type: UPDATE_USER_BEGIN })
        try {
            const { data } = await authFetch.patch('auth/updateUser', currentUser)
            const { user, token } = data

            console.log(user);

            const updatedUser = {
                email: user.email,
                username: user.username,
                password: user.password,
                profilePicture: user.profilePicture,
            }

            console.log(updatedUser);

            dispatch({
                type: UPDATE_USER_SUCCESS,
                payload: { user: updatedUser, token }
            })
            addUserToLocalStorage({ user: updatedUser, token })
        } catch (error) {
            if (error.response.status !== 401) {
                dispatch({ type: UPDATE_USER_ERROR, payload: { msg: error.response.data.msg } })
            }
        }
        clearAlert()
    }

    const addVideo = async ({ newVideo, alertText }) => {
        dispatch({ type: ADD_VIDEO_BEGIN })

        console.log(newVideo);
        try {
            const { data } = await axios.post(`/api/v1/video`, newVideo)
            console.log(data);
            dispatch({
                type: ADD_VIDEO_SUCCESS,
                payload: { alertText }
            })
            console.log('posting');
        } catch (error) {
            dispatch({
                type: ADD_VIDEO_ERROR,
                payload: { msg: error.response.data.msg }
            })
        }
    }

    // const findAuthor = async (email) => {
    //     dispatch({ type: FIND_AUTHOR_BEGIN })

    //     try {
    //         const { data } = await axios.get(`/api/v1/users/find?email=${email}`)
    //         dispatch({
    //             type: FIND_AUTHOR_SUCCESS,
    //             payload: { followings: data.followings }
    //         })
    //         return data

    //     } catch (error) {
    //         dispatch({
    //             type: FIND_AUTHOR_ERROR,
    //             payload: { msg: error.response.data.msg }
    //         })
    //     }
    // }

    const findAuthor = async (email) => {
        // dispatch({ type: FIND_USER_BEGIN })

        try {
            const { data } = await axios.get(`/api/v1/users/find?email=${email}`)
            // dispatch({
            //     type: FIND_USER_SUCCESS,
            //     payload: { followings: data.followings }
            // })
            return data

        } catch (error) {
            console.log(error);
            // dispatch({
            //     type: FIND_USER_ERROR,
            //     payload: { msg: error.response.data.msg }
            // })
        }
    }

    const findUser = async (email) => {
        dispatch({ type: FIND_USER_BEGIN })

        try {
            const { data } = await axios.get(`/api/v1/users/find?email=${email}`)
            dispatch({
                type: FIND_USER_SUCCESS,
                payload: { followings: data.followings }
            })
            return data
        } catch (error) {
            dispatch({
                type: FIND_USER_ERROR,
                payload: { msg: error.response.data.msg }
            })
        }
    }

    const followUser = async (id) => {
        dispatch({ type: FOLLOW_USER_BEGIN })
        const userJSON = JSON.parse(user)

        const { data } = await axios.patch(`/api/v1/users/${id}/follow`, { email: userJSON.email })

        dispatch({
            type: FOLLOW_USER_SUCCESS,
            payload: {
                isFollowed: true,
                followings: data
            }
        })
        return data
    }

    const unfollowUser = async (id) => {
        dispatch({ type: UNFOLLOW_USER_BEGIN })
        const userJSON = JSON.parse(user)
        const { data } = await axios.patch(`/api/v1/users/${id}/unfollow`, { email: userJSON.email })

        dispatch({
            type: UNFOLLOW_USER_SUCCESS,
            payload: {
                isFollowed: false,
                followings: data
            }
        })
        return data
    }

    return (<AppContext.Provider value={{
        ...state,
        toggleSidebar,
        toggleLoginPage,
        setupUser,
        displayAlert,
        updateUser,
        uploadImage,
        addVideo,
        uploadVideo,
        getAllVideos,
        findAuthor,
        getVideo,
        followUser,
        unfollowUser,
        findUser,
    }}>
        {children}
    </AppContext.Provider>
    )
}

const useAppContext = () => {
    return useContext(AppContext)
}

export {
    AppProvider,
    initialState,
    useAppContext
}
