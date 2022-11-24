import React from 'react'
import '../style/NowplayingMovie.css'
import { useState } from 'react'

export default function NowplayingMovie() {

    const [mouseIn, setMouseIn] = useState(false)

    const click = (e) => {
      if(e.target.id){
        console.log("add to watchlist")
      } else {
        console.log("open movie")
      }
    }

  return (
        <div onClick={(e)=>click(e)} className="nowplayingmovie" onMouseEnter={()=>setMouseIn(true)} onMouseLeave={()=>setMouseIn(false)}>
          {/* {
            mouseIn &&
            <div className="overlay">
              <svg id='add' width="29" height="29" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.2257 1.25269H21.9715C26.9421 1.25269 30.9715 5.28212 30.9715 10.2527V22C30.9715 26.9706 26.9421 31 21.9715 31H10.2257C5.25515 31 1.22571 26.9706 1.22571 22V10.2527C1.22571 5.28212 5.25515 1.25269 10.2257 1.25269Z" stroke="white" strokeWidth="2"/>
                <path d="M16.442 15.4323V10.2709H15.1447V15.4323H10.6041V16.907H15.1447V22.0685H16.442V16.907H20.9826V15.4323H16.442Z" fill="white"/>
              </svg>
            </div>
          } */}
            <div className="playing">
                <svg id='play' width="100" height="100" viewBox="0 0 250 250" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M218.75 125C218.75 73.2422 176.758 31.25 125 31.25C73.2422 31.25 31.25 73.2422 31.25 125C31.25 176.758 73.2422 218.75 125 218.75C176.758 218.75 218.75 176.758 218.75 125Z" stroke={mouseIn ? "#CCFF00" : "white"} strokeWidth="10" strokeMiterlimit="10"/>
                    <path d="M105.625 163.301L161.509 129.541C162.288 129.066 162.932 128.399 163.378 127.604C163.825 126.809 164.06 125.912 164.06 125C164.06 124.088 163.825 123.191 163.378 122.396C162.932 121.601 162.288 120.934 161.509 120.459L105.625 86.6992C104.824 86.2193 103.91 85.9611 102.976 85.9512C102.042 85.9412 101.123 86.1798 100.312 86.6425C99.5005 87.1052 98.8271 87.7753 98.3605 88.5841C97.8939 89.393 97.6508 90.3113 97.6562 91.2451V158.755C97.6508 159.689 97.8939 160.607 98.3605 161.416C98.8271 162.225 99.5005 162.895 100.312 163.357C101.123 163.82 102.042 164.059 102.976 164.049C103.91 164.039 104.824 163.781 105.625 163.301Z" fill={mouseIn ? "#CCFF00" : "white"}/>
                </svg>
                <img src="" alt="" />
            </div>
            <p>Action, Drama, Adventure</p>
            <h2>Black Adam</h2>
        </div>
  )
}
