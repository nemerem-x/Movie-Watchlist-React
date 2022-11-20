import { useState, useEffect } from "react"
import { auth } from "../src/firebase"
import { useAuthState } from "react-firebase-hooks/auth"
import { Link } from "react-router-dom"
import userAvatar from "/login.png"
import addToWatchlist from "/add_to_watchlist.png"
import Login from "./Login"
import Signup from "./Signup"
import User from "./User"
import X from "/x.svg"

export default function Nav() {

    const [loginModal, setLoginModal] = useState(false)
    const [signInOut, setSignInOut] = useState(false)
    const [user, loading] = useAuthState(auth)

    useEffect(()=>{
        if(user){
            setLoginModal(false)
        }
    },[user])

  return (
    <div className='navbox'>
        <div className="navcontainer">
            <div className="left">
                <p className="logo">NMDb</p>
                <input type="text" placeholder="Search movies"/>
                <nav>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/trending">Trending</Link></li>
                        <li><Link to="/tvshows">TV Shows</Link></li>
                    </ul> 
                </nav>
            </div>

            <div className="right">
                <Link to="/watchlist">
                    <div className="watchlist">
                        <img src={addToWatchlist} alt="icon" /><div className="watchlistCount"></div> <p>Watchlist</p>
                    </div>
                </Link>

                <div className="avatar">
                {
                    user ?
                    <p id="profile" onClick={()=>setLoginModal(!loginModal)}>{user.email.slice(0,1).toUpperCase()}</p>
                    :
                    <img id="profile" onClick={()=>setLoginModal(!loginModal)} src={userAvatar} alt="login" />
                }
                </div>
                
            </div>
        </div>


        {
        loginModal &&
            <div className="loginBox">

                <svg onClick={()=>setLoginModal(false)} className="x" width="54" height="54" viewBox="0 0 54 54" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 50.3132L27.1566 27.1566M50.3132 4L27.1522 27.1566M27.1522 27.1566L4 4M27.1566 27.1566L50.3132 50.3132" stroke="white" strokeWidth="6.625" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>

            {
                user ?
                <User/>
                :
                <>
                    {
                        !signInOut ?
                        <>
                            <Login/>
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
                </>
            } 
            </div>
        }

    </div>
  )
}
