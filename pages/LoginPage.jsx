import { useState } from "react"
import Login from "../components/Login"
import Signup from "../components/Signup"
import { Navigate } from "react-router-dom"
import { useAuthState } from "react-firebase-hooks/auth"
import {auth} from "../src/firebase"
import '../style/LoginPage.css'

export default function LoginPage() {

    const [signInOut, setSignInOut] = useState(false)
    const [user, loading] = useAuthState(auth)

    return (
        <div className="loginpage">
            <div className="loginpagecontainer">
                

                {
                        !signInOut ?
                        <>
                            {!user ? <Login/> : <Navigate to="/watchlist" replace /> }
                            <p>Don't have an account? 
                                <span onClick={()=>setSignInOut(true)}>Sign up</span>
                            </p>
                        </>
                        :
                        <>
                            <Signup/>
                            <p>Already have an account?
                                <span onClick={()=>setSignInOut(false)}>Sign in</span>
                            </p>
                        </>
                    }
            </div>
        </div>
    )
}