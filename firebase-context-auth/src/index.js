import React from 'react'
import ReactDOM from 'react-dom'
import App from './app'

import Firebase from './firebase/firebase'
import FirebaseContext from './firebase/context'

ReactDOM.render(
    <FirebaseContext.Provider value={ new Firebase() }>
        <App />
    </FirebaseContext.Provider>,
    document.getElementById('root')
)