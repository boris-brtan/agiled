import React from 'react'
import Menu from './components/Menu'
import { responsiveFontSizes, createMuiTheme, ThemeProvider } from '@material-ui/core'
import CountDown from './components/CountDown'
import Settings from './components/Settings'
import { useSelector, useDispatch } from 'react-redux'
import { toggleTheme } from './actions'
import { Route } from 'react-router-dom'
import VoteResults from './components/VoteResults'

function App() {
    const dispatch = useDispatch()
    const themeType = useSelector(({settings}) => settings.theme)
    const theme = responsiveFontSizes(
        createMuiTheme({
            palette: {
                type: ['dark', 'light'][themeType],
                primary: {
                    main: '#448aff',
                },
                secondary: {
                    main: '#00897b',
                },
            },
        })
    )

    const togglePalleteMode = () => {
        dispatch(toggleTheme((themeType + 1) % 2))
    }

    return <ThemeProvider theme={theme}>
        <Menu togglePalleteMode={togglePalleteMode}>
            <Settings />
            <Route path="/" exact component={CountDown} />
            <Route path="/results" component={VoteResults} />
        </Menu>
    </ThemeProvider>
}

export default App
