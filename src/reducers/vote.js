import {
    SET_VOTE
} from '../actions/vote.js'

const initialState = {
    selected: null,
}

function settingsReducer(state = initialState, action) {
    switch (action.type) {
        case SET_VOTE:
            return {
                ...state,
                selected: action.payload,
            }
        default:
            return state
    }
}

export default settingsReducer
