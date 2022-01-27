import firebase from '../../firebase'
import { useEffect, useState } from 'react'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import auth from 'firebase/auth'
import { setUserCookie } from '../../firebase/userCookies'
import { mapUserData } from '../../firebase/mapUserData'



const FirebaseAuthConfig = {
    signInFlow: 'popup',
    signInOptions: [{
            provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
            requireDisplayName: true,
        },
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
        // firebase.auth.GithubAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    ],
    signInSuccessUrl: '/',
    credentialHelper: 'none',
    callbacks: {
        signInSuccessWithAuthResult: async({ user }, redirectUrl) => {
            const userData = mapUserData(user)
            setUserCookie(userData)
        },
    },
} 

const FirebaseAuth = () => {
    const [renderAuth, setRenderAuth] = useState(false)
    useEffect(() => {
        if (typeof window !== 'undefined') {
            setRenderAuth(true)
        }
    }, [])
    return (
        <div>
            {
                renderAuth ? (
                    <StyledFirebaseAuth
                        uiConfig={FirebaseAuthConfig}
                        firebaseAuth={firebase.auth()}
                    />
                ) : null
            }
        </div>
    )
}

export default FirebaseAuth