import { useState, useEffect } from "react"
import { auth } from "../src/firebase"
import { useAuthState } from "react-firebase-hooks/auth"
import { Link , NavLink } from "react-router-dom"
import userAvatar from "/login.png"
import addToWatchlist from "/add_to_watchlist.png"
import Login from "./Login"
import Signup from "./Signup"
import User from "./User"
import SearchResult from "./SearchResult"
import { useMediaQuery } from 'react-responsive'
import { searchData } from "../src/reactQueries"


export default function Nav() {

    const [searchQuery, setSearchQuery] = useState(undefined)
    const {data, isLoading, isError} = searchData(encodeURIComponent(searchQuery))

    const [loginModal, setLoginModal] = useState(false)
    const [mobileNavModal, setMobileNavModal] = useState(false)
    const [signInOut, setSignInOut] = useState(false)
    const [mobileSearch, setMobileSearch] = useState(false)
    const [user, loading] = useAuthState(auth)
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1000px)' })
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' })


    useEffect(()=>{
        if(user){
            setLoginModal(false)
        }
    },[user])

    const closeModal = (e) => {
        if(e.target.id === "signModalBg"){
            setLoginModal(false)
        }
        // console.log(e.target.id)
    }

  return (
    <div className='navbox'>
        <div className="navcontainer">
            <div className="left">
                <p className="logo"><Link to="/">NMDb</Link></p>
                {
                    !isMobile &&
                    <input onChange={(e)=>setSearchQuery(e.target.value)} id="mainInput" type="text" placeholder="Search movies"/>
                }
                {
                    isMobile && mobileSearch && 
                    <input onChange={(e)=>setSearchQuery(e.target.value)} id="mobileInput" type="text" placeholder="Search movies"/>
                }
                <nav>
                    <ul>
                        <li><NavLink className={({isActive})=>(isActive ? "active" : '')} to="/">Home</NavLink></li>
                        <li><NavLink className={({isActive})=>(isActive ? "active" : '')} to="/discover">Discover</NavLink></li>
                    </ul> 
                </nav>

                {data && <SearchResult data={data} isLoading={isLoading} isError={isError}/>}

            </div>

            {/* Disappears on mobile - css display none */}
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

            <div className="hamburger">
                {
                    mobileSearch ?
                        <svg onClick={()=>setMobileSearch(false)} width="24" height="24" viewBox="0 0 54 54" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4 50.3132L27.1566 27.1566M50.3132 4L27.1522 27.1566M27.1522 27.1566L4 4M27.1566 27.1566L50.3132 50.3132" stroke="white" strokeWidth="6.625" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    :
                    <>
                        {
                            isMobile &&
                            <svg onClick={()=>setMobileSearch(true)} width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M18.9 20.3L13.3 14.7C12.8 15.1 12.225 15.4167 11.575 15.65C10.925 15.8833 10.2333 16 9.5 16C7.68333 16 6.146 15.371 4.888 14.113C3.62933 12.8543 3 11.3167 3 9.5C3 7.68333 3.62933 6.14567 4.888 4.887C6.146 3.629 7.68333 3 9.5 3C11.3167 3 12.8543 3.629 14.113 4.887C15.371 6.14567 16 7.68333 16 9.5C16 10.2333 15.8833 10.925 15.65 11.575C15.4167 12.225 15.1 12.8 14.7 13.3L20.325 18.925C20.5083 19.1083 20.6 19.3333 20.6 19.6C20.6 19.8667 20.5 20.1 20.3 20.3C20.1167 20.4833 19.8833 20.575 19.6 20.575C19.3167 20.575 19.0833 20.4833 18.9 20.3ZM9.5 14C10.75 14 11.8127 13.5627 12.688 12.688C13.5627 11.8127 14 10.75 14 9.5C14 8.25 13.5627 7.18733 12.688 6.312C11.8127 5.43733 10.75 5 9.5 5C8.25 5 7.18733 5.43733 6.312 6.312C5.43733 7.18733 5 8.25 5 9.5C5 10.75 5.43733 11.8127 6.312 12.688C7.18733 13.5627 8.25 14 9.5 14Z" fill="white"/>
                            </svg>
                        }
                        <svg onClick={()=>setMobileNavModal(true)} width="36" height="36" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5.15625 22.9688H24.8438M5.15625 15.4688H24.8438M5.15625 7.96875H24.8438" stroke="white" strokeWidth="2.8125" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </>
                }
            </div>

        </div>

        {/* Mobile Menu */}
        
        {
            mobileNavModal &&
            <div className="mobilecontainer">

                <div className="logoSection">
                    <p onClick={()=>setMobileNavModal(false)} className="logo"><Link to="/">NMDb</Link></p>
                    <svg onClick={()=>setMobileNavModal(false)} className="x" width="54" height="54" viewBox="0 0 54 54" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4 50.3132L27.1566 27.1566M50.3132 4L27.1522 27.1566M27.1522 27.1566L4 4M27.1566 27.1566L50.3132 50.3132" stroke="white" strokeWidth="6.625" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </div>

                <nav>
                    <ul>
                        <li><NavLink className={({isActive})=>(isActive ? "active" : '')} onClick={()=>setMobileNavModal(false)} to="/">Home</NavLink></li>
                        <li><NavLink className={({isActive})=>(isActive ? "active" : '')} onClick={()=>setMobileNavModal(false)} to="/discover">Discover</NavLink></li>
                    </ul> 
                </nav>

                { user ? <User navModal={()=>setMobileNavModal(false)}/>
                    :
                    <div className="mobileMenuLogin">
                        <Link onClick={()=>setMobileNavModal(false)} className="loginButton" to="/login"><button>Sign in</button></Link>
                        <p>Don't have an account? 
                        <Link onClick={()=>setMobileNavModal(false)} to="/login"> Sign up</Link>
                        </p>
                    </div>
                }

            </div>
        }

        {
            loginModal &&
            <div id="signModalBg" onClick={(e)=>closeModal(e)}>

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
            </div>
        }

    </div>
  )
}
