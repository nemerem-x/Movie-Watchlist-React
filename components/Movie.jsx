import React from 'react'
import '../style/Movie.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { genreData } from '../src/reactQueries'
import {auth} from "../src/firebase"
import { useAuthState } from "react-firebase-hooks/auth"
import { useMediaQuery } from 'react-responsive'
import { useRecoilState } from 'recoil'
import { useRecoilValue } from 'recoil'
import {fireState, fireStatePost} from "../src/recoil"

export default function Movie({movie}) {

  const [user, loading] = useAuthState(auth)
  const {data:genre, isLoading, isError} = genreData()

  const allGenre = genre?.genres.filter(e => movie?.genre_ids?.includes(e.id)).slice(0,3)
  const navigate = useNavigate()
  const [mouseIn, setMouseIn] = useState(false)
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' })

  //src/recoil-Global State
  const fireStoreData = useRecoilValue(fireState)
  const [_, fireStorePost] = useRecoilState(fireStatePost)

  const addToFirestore = (e) => {
    
    if(e.target.id === "add" || e.target.id === "movieAddToWatchlist") {
      
      if (user) {
        const find = fireStoreData.find(each => each.id === movie.id)
        
        if(find === undefined){
          const data = [...fireStoreData, {
            id: movie.id,
            watchlisted: true,
            favorited: false
          }]
          fireStorePost(data)
        } 
      } else {
        navigate(`/login`)
        sessionStorage.setItem("scrollPosition", window.pageYOffset);
      }
      
    } else if (e.target.id === "overlay" || e.target.id === "title" || e.target.id === "image") {
      console.log(e.target.id)
      navigate(`/movie/${movie.id}`)
      sessionStorage.setItem("scrollPosition", window.pageYOffset);
    }

  }

  //remove from firestore
  const removeFromFirestore = (e) => {
    if(e.target.id === "movieWatchlisted" || e.currentTarget.id === "remove") {
      const newData = fireStoreData.filter(each => each.id != movie.id)
      fireStorePost(newData)
    } else {
      navigate(`/movie/${movie.id}`)
    }
  }
  
  const watchlisted = fireStoreData.some(each => each.id === movie.id)

  return (
        <div className="movie" onMouseEnter={()=>setMouseIn(true)} onMouseLeave={()=>setMouseIn(false)}>
          {
            //hover disappears on mobile
            !isMobile &&
            
              mouseIn &&
              <div  onClick={(e)=>addToFirestore(e)} id="overlay" className="overlay">
                {
                  watchlisted ?
                  <svg onClick={(e)=>removeFromFirestore(e)} id='remove' width="29" height="29" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="31.75" height="31.75" rx="10" fill="#CCFF00"/>
                    <path d="M19.8351 11.167C19.9069 11.084 19.9927 11.018 20.0874 10.973C20.182 10.928 20.2837 10.9048 20.3864 10.9048C20.4891 10.9048 20.5907 10.928 20.6854 10.973C20.78 11.018 20.8658 11.084 20.9377 11.167C21.2389 11.5114 21.2431 12.0679 20.9482 12.4183L14.7209 20.7487C14.6502 20.8365 14.5644 20.9071 14.4688 20.9562C14.3731 21.0052 14.2697 21.0317 14.1647 21.0339C14.0597 21.0361 13.9554 21.0141 13.8582 20.9691C13.761 20.9242 13.6729 20.8573 13.5993 20.7725L9.81008 16.4274C9.66394 16.2587 9.58208 16.0319 9.58208 15.7957C9.58208 15.5595 9.66394 15.3327 9.81008 15.1641C9.88195 15.0811 9.96773 15.0152 10.0624 14.9702C10.1571 14.9252 10.2587 14.902 10.3614 14.902C10.4641 14.902 10.5657 14.9252 10.6604 14.9702C10.7551 15.0152 10.8409 15.0811 10.9127 15.1641L14.127 18.8502L19.814 11.1932C19.8205 11.184 19.8276 11.1752 19.8351 11.167Z" fill="#222222"/>
                  </svg>
                  :
                  <svg onClick={(e)=>addToFirestore(e)} id='add' width="29" height="29" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.2257 1.25269H21.9715C26.9421 1.25269 30.9715 5.28212 30.9715 10.2527V22C30.9715 26.9706 26.9421 31 21.9715 31H10.2257C5.25515 31 1.22571 26.9706 1.22571 22V10.2527C1.22571 5.28212 5.25515 1.25269 10.2257 1.25269Z" stroke="white" strokeWidth="2"/>
                    <path d="M16.442 15.4323V10.2709H15.1447V15.4323H10.6041V16.907H15.1447V22.0685H16.442V16.907H20.9826V15.4323H16.442Z" fill="white"/>
                  </svg>
                }
                <div className="rating">
                  <h3>{movie.vote_average.toFixed(1)}</h3>
                </div>
              </div>
          }
          
          <img id='image' onClick={(e)=>addToFirestore(e)} src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt="poster" />
          <p>{allGenre?.map(item => item.name).join(", ")}</p>
          <h2 onClick={(e)=>addToFirestore(e)} id='title'>{movie.original_title}</h2>
          {
            watchlisted && user ?
            <button onClick={(e)=>removeFromFirestore(e)} id='movieWatchlisted' className="both">
              <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.11137 8.54706L2.10172 5.09558C2.10163 5.09547 2.10153 5.09536 2.10143 5.09525C2.00808 4.98755 1.89498 4.90003 1.76776 4.83955C1.64028 4.77894 1.50203 4.74714 1.36142 4.74714C1.22081 4.74714 1.08256 4.77894 0.955075 4.83955C0.82774 4.90008 0.714555 4.9877 0.621156 5.09553C0.433201 5.31244 0.332092 5.59836 0.332092 5.89088C0.332092 6.1834 0.433201 6.46932 0.621155 6.68623L0.621674 6.68682L4.41051 11.0315C4.41059 11.0316 4.41066 11.0317 4.41074 11.0317C4.50631 11.1418 4.62251 11.2308 4.75327 11.2912C4.88429 11.3518 5.02621 11.382 5.16999 11.379C5.31376 11.3759 5.45434 11.3397 5.58287 11.2738C5.71126 11.2079 5.82413 11.1144 5.91572 11.0005L5.91584 11.0006L5.92119 10.9935L12.1444 2.66854C12.5133 2.22413 12.507 1.53382 12.1263 1.09798C12.033 0.990342 11.9199 0.902866 11.7927 0.842405L11.6854 1.06819L11.7927 0.842405C11.6653 0.781797 11.527 0.75 11.3864 0.75C11.2458 0.75 11.1075 0.781797 10.9801 0.842405C10.8535 0.902589 10.7408 0.989542 10.6478 1.09651C10.635 1.11073 10.6231 1.12561 10.612 1.14103L5.11137 8.54706Z" fill="#222222" stroke="black" strokeWidth="0.5"/>
              </svg>
                Watchlisted
            </button>
            :
            <button onClick={(e)=>addToFirestore(e)} id='movieAddToWatchlist' className="both">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.75 5.25V0H5.25V5.25H0V6.75H5.25V12H6.75V6.75H12V5.25H6.75Z" fill="white"/>
                </svg>
                Watchlist
            </button>
          }
        </div>
  )
}
