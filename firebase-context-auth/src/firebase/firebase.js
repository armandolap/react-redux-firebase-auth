import app from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

import firebaseConfig from './Firebase.config'

class Firebase {
    constructor() {
        app.initializeApp(firebaseConfig)
        /* Firebase APIs */
        this.auth = app.auth()
        this.db = app.database()
        /* Social Sign In Method Provider */
        this.googleProvider = new app.auth.GoogleAuthProvider()
    }
    // *** Auth API ***
    doCreateUserWithEmailAndPassword = async (email, password) => {
        return this.auth.createUserWithEmailAndPassword(email, password)
    }

    doSetDataInDatabase = (authUser) => {
        this.db.ref(authUser.user.uid).set({
            nickName: authUser.user.displayName,
            email: authUser.user.email,
            creationTime: authUser.user.metadata.creationTime
        })
    }
        
    doSignInWithEmailAndPassword = (email, password) => {
        return this.auth.signInWithEmailAndPassword(email, password)
    }
        
    doSignInWithGoogle = () =>
        this.auth.signInWithPopup(this.googleProvider)

    doSignOut = () => this.auth.signOut()

    doPasswordReset = email => this.auth.sendPasswordResetEmail(email)

    doSendEmailVerification = () =>
        this.auth.currentUser.sendEmailVerification()

    // *** Merge Auth and DB User API *** //
    onAuthUserListener = (next, fallback) =>
        this.auth.onAuthStateChanged(authUser => {
            if (authUser) {
                this.db.ref(authUser.uid).once('value')
                    .then((snapshot) => {
                        const dbUser = (snapshot.val()) 
                        authUser = {
                            uid: authUser.uid,
                            email: authUser.email,
                            emailVerified: authUser.emailVerified,
                            providerData: authUser.providerData,
                            ...dbUser,
                        }
                        next(authUser)
                    })
            } else { fallback() }
        })
}

export default Firebase
