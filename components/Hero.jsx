import HeroImage from '/hero_image.png'
import { useMediaQuery } from 'react-responsive'
import { useState, useEffect } from 'react'
import Loader from '/loading.svg'

export default function Hero() {

    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1000px)' })
    const [trailerIsOpen, setTrailerIsOpen] = useState(false)

    useEffect(()=>{
        document.body.style.overflow = trailerIsOpen ? 'hidden' : 'unset'
    },[trailerIsOpen])

    const style = {
        display: "flex",
        flexDirection: isTabletOrMobile ? "column" : "row",
        width: "100%",
        position: "relative",
        height: "600px",
        marginBottom: "5em",
    }

    const style2 = {
        position: "relative",
        display: "flex",
        alignItems: "center",
        width: "100%",
        height: isTabletOrMobile ? "72%" : "100%",
        backgroundImage:`linear-gradient(to ${isTabletOrMobile ? "bottom" : "left"}, transparent, #12130C ${isTabletOrMobile ? "80%" : "70%"}), url(${HeroImage})`,
        backgroundSize: "cover",
        backgroundPosition: isTabletOrMobile ? "center center" : "left top",
        justifyContent: "center",
    }

    const video = {
        height: "100vh",
        width: "100vw",
        position: "fixed",
        zIndex: "2",
        backgroundColor: "rgb(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    }

  return (
    <div className='heroSection' style={style}>

        {
            trailerIsOpen &&
            <div onClick={()=>setTrailerIsOpen(false)} style={video} className="video">
                <iframe
                    style={{width: isTabletOrMobile ? "90%" : "50%", height: isTabletOrMobile ? "40%" : "60%", zIndex:"1"}} 
                    width="1920" height="1080" 
                    src="https://www.youtube.com/embed/mkomfZHG5q4?rel=0&modestbranding=1&autohide=1&mute=0&showinfo=0&controls=1&autoplay=1" title="YouTube video player" frameBorder="0" allowFullScreen>
                </iframe>
                <img 
                    style={{position: "absolute", transform: "translate(-50%, -50%)", top:"50%", left:"50%"}} 
                    id='spinner' src={Loader} alt="loading..." 
                />
            </div>
        }

        <div className="heroInfo">
            <div className="heroDetails">
                <h1>Black Adam</h1>
                <p><span>8.2</span> 8.256 / 2369 votes     160 mins   -   Action, Drama, Adventure    -   2022</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing 
                    elit, sed do eiusmod tempor incididunt ut labore 
                    et dolore magna aliqua. Ut enim ad minim veniam, 
                    quis nostrud exercitation ullamco laboris nisi ut 
                    aliquip...
                </p>
                <button id='btnDetails'>Trailer</button><button id='btnAddToWatchlist'>Watchlist</button>
            </div>
        </div>

        <div className="heroContainer" style={style2}>

            {
                !trailerIsOpen &&
                <svg onClick={()=>setTrailerIsOpen(true)} style={{marginBottom: "8em", cursor: "pointer"}} width="100" height="100" viewBox="0 0 250 250" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M218.75 125C218.75 73.2422 176.758 31.25 125 31.25C73.2422 31.25 31.25 73.2422 31.25 125C31.25 176.758 73.2422 218.75 125 218.75C176.758 218.75 218.75 176.758 218.75 125Z" stroke="white" strokeWidth="10" strokeMiterlimit="10"/>
                    <path d="M105.625 163.301L161.509 129.541C162.288 129.066 162.932 128.399 163.378 127.604C163.825 126.809 164.06 125.912 164.06 125C164.06 124.088 163.825 123.191 163.378 122.396C162.932 121.601 162.288 120.934 161.509 120.459L105.625 86.6992C104.824 86.2193 103.91 85.9611 102.976 85.9512C102.042 85.9412 101.123 86.1798 100.312 86.6425C99.5005 87.1052 98.8271 87.7753 98.3605 88.5841C97.8939 89.393 97.6508 90.3113 97.6562 91.2451V158.755C97.6508 159.689 97.8939 160.607 98.3605 161.416C98.8271 162.225 99.5005 162.895 100.312 163.357C101.123 163.82 102.042 164.059 102.976 164.049C103.91 164.039 104.824 163.781 105.625 163.301Z" fill="white"/>
                </svg>
            }
        </div>

    </div>
  )

}