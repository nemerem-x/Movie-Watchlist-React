import './App.css'
import Home from '../pages/Home'
import Watchlist from '../pages/Watchlist'
import LoginPage from '../pages/LoginPage'
import Discover from '../pages/Discover'
import MovieDetail from '../pages/MovieDetail'
import Footer from '../components/Footer'
import { Routes, Route } from "react-router-dom"
import { useAuthState } from "react-firebase-hooks/auth"
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import {auth} from "../src/firebase"
import { Navigate } from "react-router-dom"
import Nav from '../components/Nav'

function App() {

  const queryClient = new QueryClient()

  const [user, loading] = useAuthState(auth)

  return (
    <QueryClientProvider client={queryClient}>
    
        <Nav/>

        <Routes>
          <Route path='/' element={<Home/>} />

          <Route exact path='/discover' element={<Discover/> }/>

          <Route exact path='/movie/:id' element={<MovieDetail/> }/>

          <Route exact path='/watchlist' 
            element={!user ? <Navigate to="/login" replace /> : <Watchlist/> } 
          />

          <Route exact path='/login'
            element={!user ? <LoginPage/> : <Navigate to="/watchlist" replace /> } 
          />

          <Route exact path='*' 
            element={<Navigate to="/" replace /> } 
          />

        </Routes>

        <Footer/>

    </QueryClientProvider>
  )
}

export default App
