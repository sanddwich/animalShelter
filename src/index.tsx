import React, { createContext } from 'react'
import ReactDOM from 'react-dom'
import './index.scss'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { Provider } from 'react-redux'
import store from './Redux'
import { BrowserRouter } from 'react-router-dom'

// import firebase from 'firebase/app'
// import auth from 'firebase/auth'
// import firestore from 'firebase/firestore'

// firebase.initializeApp(Config.firebaseConfig)

const Context = createContext(null)

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
