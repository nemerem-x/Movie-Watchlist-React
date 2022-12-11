import React from 'react'
import '../style/NowplayingMovie.css'
import { useState } from 'react'
import { videoData } from '../src/reactQueries'
import { genreData } from '../src/reactQueries'
import { Link } from 'react-router-dom'
import {auth} from "../src/firebase"
import { useAuthState } from "react-firebase-hooks/auth"
import { useRecoilState } from 'recoil'
import { useRecoilValue } from 'recoil'
import {fireState, fireStatePost} from "../src/recoil"
import { useMediaQuery } from 'react-responsive'

export default function NowplayingMovie({item}) {

  const [user, loading] = useAuthState(auth)
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' })

  //React query
  const {data, isLoading, isError} = genreData()
  const allGenre = data?.genres.filter(e => item.genre_ids.includes(e.id)).slice(0,3)
  const {data: videodata, isLoading: videoloading, isError: videoerror} = videoData(item?.id)

  const [mouseIn, setMouseIn] = useState(false)
  const [playVideo, setPlayVideo] = useState(false)

  //src/recoil-Global State
  const fireStoreData = useRecoilValue(fireState)
  const [_, fireStorePost] = useRecoilState(fireStatePost)

  const addToFirestore = () => {
    if(user){

        const find = fireStoreData.find(each => each.id === item.id)
    
        if(find === undefined){
          const data = [...fireStoreData, {
            id: item.id,
            watchlisted: true,
            favorited: false
          }]
          fireStorePost(data)
        } 

    } else {
      navigate(`/login`)
    }
  }

  //remove from firestore
  const removeFromFirestore = () => {
      const newData = fireStoreData.filter(each => each.id != item.id)
      fireStorePost(newData)
  }

  const watchlisted = fireStoreData.some(each => each.id === item.id)

  return (
        <div className="nowplayingmovie" onMouseEnter={()=>setMouseIn(true)} onMouseLeave={()=>setMouseIn(false)}>
          <div className="playing">
            {
              playVideo ?
              <>
              {!isMobile && <div onClick={()=>setPlayVideo(false)} className="closeVideo"></div>}
              <iframe
                  width="1920" height="1080" 
                  src={`https://www.youtube.com/embed/${videodata?.results[0].key}?rel=0&modestbranding=1&autohide=1&mute=0&showinfo=0&controls=1&autoplay=1`} title="YouTube video player" frameBorder="0" allowFullScreen>
              </iframe>
              </>
              :
              <>
              <svg onClick={()=>setPlayVideo(true)} id='play' width="100" height="100" viewBox="0 0 250 250" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M218.75 125C218.75 73.2422 176.758 31.25 125 31.25C73.2422 31.25 31.25 73.2422 31.25 125C31.25 176.758 73.2422 218.75 125 218.75C176.758 218.75 218.75 176.758 218.75 125Z" stroke={mouseIn ? "#CCFF00" : "white"} strokeWidth="10" strokeMiterlimit="10"/>
                  <path d="M105.625 163.301L161.509 129.541C162.288 129.066 162.932 128.399 163.378 127.604C163.825 126.809 164.06 125.912 164.06 125C164.06 124.088 163.825 123.191 163.378 122.396C162.932 121.601 162.288 120.934 161.509 120.459L105.625 86.6992C104.824 86.2193 103.91 85.9611 102.976 85.9512C102.042 85.9412 101.123 86.1798 100.312 86.6425C99.5005 87.1052 98.8271 87.7753 98.3605 88.5841C97.8939 89.393 97.6508 90.3113 97.6562 91.2451V158.755C97.6508 159.689 97.8939 160.607 98.3605 161.416C98.8271 162.225 99.5005 162.895 100.312 163.357C101.123 163.82 102.042 164.059 102.976 164.049C103.91 164.039 104.824 163.781 105.625 163.301Z" fill={mouseIn ? "#CCFF00" : "white"}/>
              </svg>
              <img src={`https://image.tmdb.org/t/p/original${item.backdrop_path}`} alt="backdrop" />
              </>
            }

          </div>
          <p>{allGenre?.map(item => item.name).join(", ")}</p>
          <Link to={`/movie/${item?.id}`}><h2>{item?.original_title}</h2></Link>
          {
            watchlisted && user ?
            <button onClick={removeFromFirestore} id='movieWatchlisted' className="both">
              <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.11137 8.54706L2.10172 5.09558C2.10163 5.09547 2.10153 5.09536 2.10143 5.09525C2.00808 4.98755 1.89498 4.90003 1.76776 4.83955C1.64028 4.77894 1.50203 4.74714 1.36142 4.74714C1.22081 4.74714 1.08256 4.77894 0.955075 4.83955C0.82774 4.90008 0.714555 4.9877 0.621156 5.09553C0.433201 5.31244 0.332092 5.59836 0.332092 5.89088C0.332092 6.1834 0.433201 6.46932 0.621155 6.68623L0.621674 6.68682L4.41051 11.0315C4.41059 11.0316 4.41066 11.0317 4.41074 11.0317C4.50631 11.1418 4.62251 11.2308 4.75327 11.2912C4.88429 11.3518 5.02621 11.382 5.16999 11.379C5.31376 11.3759 5.45434 11.3397 5.58287 11.2738C5.71126 11.2079 5.82413 11.1144 5.91572 11.0005L5.91584 11.0006L5.92119 10.9935L12.1444 2.66854C12.5133 2.22413 12.507 1.53382 12.1263 1.09798C12.033 0.990342 11.9199 0.902866 11.7927 0.842405L11.6854 1.06819L11.7927 0.842405C11.6653 0.781797 11.527 0.75 11.3864 0.75C11.2458 0.75 11.1075 0.781797 10.9801 0.842405C10.8535 0.902589 10.7408 0.989542 10.6478 1.09651C10.635 1.11073 10.6231 1.12561 10.612 1.14103L5.11137 8.54706Z" fill="#222222" stroke="black" strokeWidth="0.5"/>
              </svg>
                Watchlisted
            </button>
            :
            <button onClick={addToFirestore} id='movieAddToWatchlist' className="both">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6.75 5.25V0H5.25V5.25H0V6.75H5.25V12H6.75V6.75H12V5.25H6.75Z" fill="white"/>
                  </svg>
                  Watchlist
            </button>
          }
        </div>
  )
}
