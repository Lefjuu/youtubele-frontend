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
    GET_VIDEOS_ERROR,
    GET_VIDEOS_SUCCESS,
    GET_VIDEO_BEGIN,
    GET_VIDEO_SUCCESS,
    GET_VIDEO_ERROR,
    // DISPLAY_VIDEO,
    // FIND_AUTHOR_ERROR,
    // FIND_AUTHOR_SUCCESS,
    // FIND_AUTHOR_BEGIN,
    FIND_USER_BEGIN,
    FIND_USER_SUCCESS,
    FIND_USER_ERROR,
    FOLLOW_USER_BEGIN,
    FOLLOW_USER_SUCCESS,
    FOLLOW_USER_ERROR,
    UNFOLLOW_USER_ERROR,
    UNFOLLOW_USER_SUCCESS,
    UNFOLLOW_USER_BEGIN,
} from './actions'
import { initialState } from './appContext'


const reducer = (state, action) => {

    if (action.type === TOGGLE_SIDEBAR) {
        return {
            ...state,
            showSidebar: !state.showSidebar,
        }
    }
    if (action.type === TOGGLE_LOGIN_PAGE) {
        return {
            ...state,
            showLoginPage: !state.showLoginPage,
        }
    }
    if (action.type === DISPLAY_ALERT) {
        return {
            ...state,
            showAlert: true,
            alertType: 'danger',
            alertText: 'Please provide all values!',
        }
    }
    if (action.type === CLEAR_ALERT) {
        return {
            ...state,
            showAlert: false,
            alertType: '',
            alertText: '',
        }
    }
    if (action.type === SETUP_USER_BEGIN) {
        return {
            ...state,
            isLoading: true
        }
    }
    if (action.type === SETUP_USER_SUCCESS) {
        return {
            ...state,
            isLoading: false,
            token: action.payload.token,
            followings: action.payload.followings,
            user: action.payload.user,
            // jobLocation: action.payload.location,
            showAlert: true,
            alertType: 'success',
            alertText: action.payload.alertText,
        }
    }
    if (action.type === SETUP_USER_ERROR) {
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: 'danger',
            alertText: action.payload.msg,
        }
    }
    if (action.type === UPDATE_USER_BEGIN) {
        return {
            ...state,
            isLoading: true,
        }
    }
    if (action.type === UPDATE_USER_SUCCESS) {
        return {
            ...state,
            isLoading: false,
            token: action.payload.token,
            user: action.payload.user,
            showAlert: true,
            alertType: 'success',
            alertText: 'User Updated'
        }
    }
    if (action.type === UPDATE_USER_ERROR) {
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: 'danger',
            alertText: action.payload.msg
        }
    }
    if (action.type === LOGOUT_USER) {
        return {
            ...initialState,
            user: null,
            token: null,
            followings: null,
        }
    }
    if (action.type === ADD_VIDEO_BEGIN) {
        return {
            ...state,
            isLoading: true
        }
    }
    if (action.type === ADD_VIDEO_SUCCESS) {
        return {
            ...state,
            isLoading: true,
            // token: action.payload.token,
            // user: action.payload.user,
            // jobLocation: action.payload.location,
            showAlert: true,
            alertType: 'success',
            alertText: action.payload.alertText,
        }
    }
    if (action.type === ADD_VIDEO_ERROR) {
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: 'danger',
            alertText: action.payload.msg,
        }
    }
    if (action.type === GET_VIDEOS_BEGIN) {
        return {
            ...state,
            isLoading: true,
            showAlert: false,
        }
    }
    if (action.type === GET_VIDEOS_SUCCESS) {
        return {
            ...state,
            isLoading: false,
            videos: action.payload.videos,
        }
    }
    if (action.type === GET_VIDEOS_ERROR) {
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: 'danger',
            alertText: action.payload.msg,
        }
    }
    if (action.type === GET_VIDEO_BEGIN) {
        return {
            ...state,
            isLoading: true,
            showAlert: false,
        }
    }
    if (action.type === GET_VIDEO_SUCCESS) {
        return {
            ...state,
            isLoading: false,
            // currentVideo: action.payload.currentVideo,
        }
    }
    if (action.type === GET_VIDEO_ERROR) {
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: 'danger',
            alertText: action.payload.msg,
        }
    }
    if (action.type === FIND_USER_BEGIN) {
        return {
            ...state,
            isLoading: true,
            showAlert: false,
            // followings: action.payload.followings
        }
    }
    if (action.type === FIND_USER_SUCCESS) {
        return {
            ...state,
            isLoading: false,
            followings: action.payload.followings

            // currentVideo: action.payload.currentVideo,
        }
    }
    if (action.type === FIND_USER_ERROR) {
        return {
            ...state,
            isLoading: false,
            // showAlert: true,
            // alertType: 'danger',
            // alertText: action.payload.msg,
        }
    }
    if (action.type === FOLLOW_USER_BEGIN) {
        return {
            ...state,
            isLoading: true,
            showAlert: false,
            // user: action.payload.user,
        }
    }
    if (action.type === FOLLOW_USER_SUCCESS) {
        return {
            ...state,
            isLoading: false,
            isFollowed: true,
            followings: action.payload.followings
            // currentVideo: action.payload.currentVideo,
        }
    }
    if (action.type === FOLLOW_USER_ERROR) {
        return {
            ...state,
            isLoading: false,
            // showAlert: true,
            // alertType: 'danger',
            // alertText: action.payload.msg,
        }
    }
    if (action.type === UNFOLLOW_USER_BEGIN) {
        return {
            ...state,
            isLoading: true,
            showAlert: false,
            // user: action.payload.user,
        }
    }
    if (action.type === UNFOLLOW_USER_SUCCESS) {
        return {
            ...state,
            isLoading: false,
            isFollowed: false,
            followings: action.payload.followings
            // currentVideo: action.payload.currentVideo,
        }
    }
    if (action.type === UNFOLLOW_USER_ERROR) {
        return {
            ...state,
            isLoading: false,
            // showAlert: true,
            // alertType: 'danger',
            // alertText: action.payload.msg,
        }
    }
    // if (action.type === DISPLAY_VIDEO) {
    //     const currentVideo = state.videos.find((video) => video.id === action.payload.id)
    //     const { id, title, video, thumbnail, author, description, views, likes, dislikes, timestamp } = currentVideo
    //     console.log(id);
    //     return {
    //         ...state,
    //         currentVideoId: id,
    //     }
    // }

    throw new Error(`no such action: ${action.type}`)
}

export default reducer