import './App.css'
import Home from '../pages/Home'
import Watchlist from '../pages/Watchlist'
import LoginPage from '../pages/LoginPage'
import Discover from '../pages/Discover'
import MovieDetail from '../pages/MovieDetail'
import Footer from '../components/Footer'
import { useEffect } from 'react'
import { Routes, Route } from "react-router-dom"
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { Navigate } from "react-router-dom"
import { useLocation } from "react-router-dom";
import Nav from '../components/Nav'
import { useRecoilState } from 'recoil'
import { useRecoilValue } from 'recoil'
import {fireState, fireStatePost} from "../src/recoil"
import { useAuthState } from "react-firebase-hooks/auth"
import {auth, db} from "../src/firebase"
import { doc, setDoc, onSnapshot  } from "firebase/firestore"

function App() {

  const [user, loading] = useAuthState(auth)

  //recoil global state
  const [_, setFireStoreData] = useRecoilState(fireState)
  const fireStoreNewPost = useRecoilValue(fireStatePost)

  // Get from firestore
  useEffect(()=>{
    if(user){
        const unsub = onSnapshot(doc(db, "user", user.uid), (doc) => {
            setFireStoreData(doc.data() ? doc.data().fireStoreNewPost : [])
        })
        return () => unsub()
    }
  },[user, fireStoreNewPost])

  // Post to firestore
  useEffect(()=>{
    const add = async () => {
        try {
            const docRef = await setDoc(doc(db, "user", user.uid), {
                fireStoreNewPost
            })
            
        } catch(error) {
            console.log(error)
        }
    }
      add()
  },[fireStoreNewPost])


  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  })

  function ScrollToTop() {
    const { pathname } = useLocation();
  
    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);
  
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
    
        <Nav/>

        <div className="pageContainer">
          <Routes>
            {ScrollToTop()}
            <Route path='/' element={<Home/>} />

            <Route exact path='/discover' element={<Discover/> }/>

            <Route exact path='/discover/:page' element={<Discover/> }/>

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
        </div>

        <Footer/>
              
    </QueryClientProvider>
  )
}

export default App
