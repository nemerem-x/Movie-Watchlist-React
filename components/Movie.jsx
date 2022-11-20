import React from 'react'
import '../style/Movie.css'
import { useState } from 'react'

export default function Movie() {

    const [mouseIn, setMouseIn] = useState(false)

  return (
        <div className="movie" onMouseEnter={()=>setMouseIn(true)} onMouseLeave={()=>setMouseIn(false)}>
          {
            mouseIn &&
            <div className="overlay">
              <svg width="29" height="29" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.2257 1.25269H21.9715C26.9421 1.25269 30.9715 5.28212 30.9715 10.2527V22C30.9715 26.9706 26.9421 31 21.9715 31H10.2257C5.25515 31 1.22571 26.9706 1.22571 22V10.2527C1.22571 5.28212 5.25515 1.25269 10.2257 1.25269Z" stroke="white" strokeWidth="2"/>
                <path d="M16.442 15.4323V10.2709H15.1447V15.4323H10.6041V16.907H15.1447V22.0685H16.442V16.907H20.9826V15.4323H16.442Z" fill="white"/>
              </svg>
              <div className="rating">
                <h3>8.2</h3>
              </div>
            </div>
          }
          <img src="" alt="" />
          <p>Action, Drama, Adventure</p>
          <h2>Black Adam</h2>
        </div>
  )
}
