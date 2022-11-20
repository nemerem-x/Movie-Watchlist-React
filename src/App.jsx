import './App.css'
import Home from '../pages/Home'
import Watchlist from '../pages/Watchlist'
import Login from "../components/Login"
import LoginPage from '../pages/LoginPage'
import Trending from '../components/Trending'
import TvShows from '../components/TvShows'
import TrendingPage from '../pages/TrendingPage'
import Signup from '../components/Signup'
import { Routes, Route } from "react-router-dom"
import { useAuthState } from "react-firebase-hooks/auth"
import {auth} from "../src/firebase"
import { Navigate } from "react-router-dom"
import Nav from '../components/Nav'

function App() {

  const [user, loading] = useAuthState(auth)

  return (
    <>
    
        <Nav/>

        <Routes>
          <Route path='/' element={<Home/>} />

          <Route exact path='/trending' 
            element={<TrendingPage/> } 
          />

          <Route exact path='/tvshows' 
            element={<TvShows/> } 
          />

          <Route exact path='/watchlist' 
            element={!user ? <Navigate to="/login" replace /> : <Watchlist/> } 
          />

          <Route exact path='/login'
            element={!user ? <LoginPage/> : <Navigate to="/watchlist" replace /> } 
          />

          <Route exact path='*' 
            element={<Navigate to="/watchlist" replace /> } 
          />

        </Routes>
    </>
  )
}

export default App
