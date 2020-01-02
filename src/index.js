import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './index.css'
import * as serviceWorker from './serviceWorker'

import { createBrowserHistory, createHashHistory } from 'history'
import { Router } from 'react-router-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { routerMiddleware } from 'react-router-redux'

import rootReducer from './reducers'

const history = process.env.PUBLIC_URL.search(/agiled/) === -1 ? createBrowserHistory() : createHashHistory()

const store = createStore(
    rootReducer,
    applyMiddleware(
        routerMiddleware(history)
    )
)

const settings = store.getState().settings
store.getState().settings = {
    ...settings,
    ...JSON.parse(localStorage.settings || "{}"),
}

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <App />
        </Router>
    </Provider>,
    document.getElementById('root')
)

window.onbeforeunload = () => {
    localStorage.settings = JSON.stringify(store.getState().settings)
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
