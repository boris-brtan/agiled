import React from 'react'
import BreakIcon from '@material-ui/icons/LocalBarRounded'

export const SET_COUNTDOWN = 'SET_COUNTDOWN'
export const setCountdown = (seconds = 7) => ({ type: SET_COUNTDOWN, payload: seconds })

export const SET_COUNTDOWN_WARNING = 'SET_COUNTDOWN_WARNING'
export const setCountdownWarning = (seconds = 4) => ({ type: SET_COUNTDOWN_WARNING, payload: seconds })

export const SET_SCALE = 'SET_SCALE'
export const SCALES = ['Standard', 'Fibonacci', 'T-shirts']
export const SCALE_ITEMS = [
    [0, 1, 2, 3, 5, 8, 13, 20, 40, 100, '?', <BreakIcon />],
    [0, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, '?', <BreakIcon />],
    ['XS', 'S', 'M', 'L', 'XL', 'XXL', '?', <BreakIcon />],
]
export const setScale = (scale = 0) => ({ type: SET_SCALE, payload: scale })

export const TOGGLE_SETTINGS = 'TOGGLE_SETTINGS'
export const toggleSettings = (open) => ({ type: TOGGLE_SETTINGS, payload: open })

export const TOGGLE_SOUND = 'TOGGLE_SOUND'
export const toggleSound = (sound) => ({ type: TOGGLE_SOUND, payload: sound })

export const TOGGLE_THEME = 'TOGGLE_THEME'
export const toggleTheme = (theme) => ({ type: TOGGLE_THEME, payload: theme })

export const TOGGLE_ONLINE = 'TOGGLE_ONLINE'
export const toggleOnline = (online) => ({ type: TOGGLE_ONLINE, payload: online })

export const SET_ONLINE_URL = 'SET_ONLINE_URL'
export const setOnlineURL = (onlineURL) => ({ type: SET_ONLINE_URL, payload: onlineURL })

export const TOGGLE_CLOSE_ON_VOTE = 'TOGGLE_CLOSE_ON_VOTE'
export const toggleCloseOnVote = (closeOnVote) => ({ type: TOGGLE_CLOSE_ON_VOTE, payload: closeOnVote })
