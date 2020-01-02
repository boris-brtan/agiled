import {
    SET_COUNTDOWN, SET_SCALE,
    TOGGLE_SETTINGS, TOGGLE_SOUND, TOGGLE_THEME, SET_COUNTDOWN_WARNING, TOGGLE_ONLINE, SET_ONLINE_URL, TOGGLE_CLOSE_ON_VOTE
} from '../actions/settings.js'

const initialState = {
    scale: 0,
    open: false,
    sound: true,
    theme: 0,
    countdown: 7,
    countdownWarning: 3,
    online: false,
    onlineURL: false,
    closeOnVote: false,
}

function settingsReducer(state = initialState, action) {
    switch (action.type) {
        case SET_COUNTDOWN:
            return {
                ...state,
                countdown: action.payload,
            }
        case SET_COUNTDOWN_WARNING:
            return {
                ...state,
                countdownWarning: action.payload,
            }
        case SET_SCALE:
            return {
                ...state,
                scale: action.payload,
            }
        case TOGGLE_SETTINGS:
            return {
                ...state,
                open: action.payload,
            }
        case TOGGLE_SOUND:
            return {
                ...state,
                sound: action.payload,
            }
        case TOGGLE_THEME:
            return {
                ...state,
                theme: action.payload,
            }
        case TOGGLE_ONLINE:
            return {
                ...state,
                online: action.payload,
            }
        case SET_ONLINE_URL:
            return {
                ...state,
                onlineURL: action.payload,
            }
        case TOGGLE_CLOSE_ON_VOTE:
            return {
                ...state,
                closeOnVote: action.payload,
            }
        default:
            return state
    }
}

export default settingsReducer
