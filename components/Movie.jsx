import React from 'react'
import '../style/Movie.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'


export default function Movie({movie}) {
  // console.log(movie)

  const key = import.meta.env.VITE_APP_TMDB_KEY

  const genre = async () => {
    const genreData = await fetch(`https://api.themoviedb.org/3/genre/movie/list?language=en-US&api_key=${key}`)
    return genreData.json()
  }
  const {data, isLoading, isError} = useQuery(['genre'], genre)

  const allGenre = data?.genres.filter(e => movie.genre_ids.includes(e.id)).slice(0,3)
  
    const navigate = useNavigate()
    const [mouseIn, setMouseIn] = useState(false)

    const click = (e) => {
      // navigate(`/movie/${e.target.id}`)
      // if(e.target.id == "add"){
      //   console.log("add to watchlist")
      // } else {
      //   console.log("open movie")
      // }
    }

  return (
        <div onClick={(e)=>click(e)} className="movie" onMouseEnter={()=>setMouseIn(true)} onMouseLeave={()=>setMouseIn(false)}>
          {
            mouseIn &&
            <div className="overlay">
              <svg id='add' width="29" height="29" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.2257 1.25269H21.9715C26.9421 1.25269 30.9715 5.28212 30.9715 10.2527V22C30.9715 26.9706 26.9421 31 21.9715 31H10.2257C5.25515 31 1.22571 26.9706 1.22571 22V10.2527C1.22571 5.28212 5.25515 1.25269 10.2257 1.25269Z" stroke="white" strokeWidth="2"/>
                <path d="M16.442 15.4323V10.2709H15.1447V15.4323H10.6041V16.907H15.1447V22.0685H16.442V16.907H20.9826V15.4323H16.442Z" fill="white"/>
              </svg>
              <div className="rating">
                <h3>{movie.vote_average.toFixed(1)}</h3>
              </div>
            </div>
          }
          <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt="" />
          <p>{allGenre?.map(item => item.name).join(", ")}</p>
          <h2>{movie.original_title}</h2>
          <button id='movieAddToWatchlist' className="both">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6.75 5.25V0H5.25V5.25H0V6.75H5.25V12H6.75V6.75H12V5.25H6.75Z" fill="white"/>
              </svg>
              Watchlist
          </button>
          {/* <button id='movieWatchlisted' className="both">
            <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5.11137 8.54706L2.10172 5.09558C2.10163 5.09547 2.10153 5.09536 2.10143 5.09525C2.00808 4.98755 1.89498 4.90003 1.76776 4.83955C1.64028 4.77894 1.50203 4.74714 1.36142 4.74714C1.22081 4.74714 1.08256 4.77894 0.955075 4.83955C0.82774 4.90008 0.714555 4.9877 0.621156 5.09553C0.433201 5.31244 0.332092 5.59836 0.332092 5.89088C0.332092 6.1834 0.433201 6.46932 0.621155 6.68623L0.621674 6.68682L4.41051 11.0315C4.41059 11.0316 4.41066 11.0317 4.41074 11.0317C4.50631 11.1418 4.62251 11.2308 4.75327 11.2912C4.88429 11.3518 5.02621 11.382 5.16999 11.379C5.31376 11.3759 5.45434 11.3397 5.58287 11.2738C5.71126 11.2079 5.82413 11.1144 5.91572 11.0005L5.91584 11.0006L5.92119 10.9935L12.1444 2.66854C12.5133 2.22413 12.507 1.53382 12.1263 1.09798C12.033 0.990342 11.9199 0.902866 11.7927 0.842405L11.6854 1.06819L11.7927 0.842405C11.6653 0.781797 11.527 0.75 11.3864 0.75C11.2458 0.75 11.1075 0.781797 10.9801 0.842405C10.8535 0.902589 10.7408 0.989542 10.6478 1.09651C10.635 1.11073 10.6231 1.12561 10.612 1.14103L5.11137 8.54706Z" fill="#222222" stroke="black" strokeWidth="0.5"/>
            </svg>
              Watchlisted
          </button> */}
        </div>
  )
}
