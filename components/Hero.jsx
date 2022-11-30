import HeroImage from '/hero_image.png'
import { useMediaQuery } from 'react-responsive'
import { useState, useEffect } from 'react'
import Loader from '/loading.svg'
import { movieDataQuery } from '../src/reactQueries'
import { genreData } from '../src/reactQueries'
import { videoData } from '../src/reactQueries'


export default function Hero() {
    
    //react-query
    const {data, isLoading, isError} = movieDataQuery()
    const {data: genre, isLoading: loading, isError: error} = genreData()

    console.log(isLoading, isError)
    
    const trending = data ? data.results.slice(0,3) : []
    const allGenre = genre ? genre.genres.filter(e => trending[0]?.genre_ids.includes(e.id)).slice(0,3) : []
    
    //react query
    const {data: videodata, isLoading: videoloading, isError: videoerror} = videoData(trending[0]?.id)

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
        backgroundImage:`linear-gradient(to ${isTabletOrMobile ? "bottom" : "left"}, transparent, #12130C ${isTabletOrMobile ? "80%" : "70%"}), url(${`https://image.tmdb.org/t/p/original${trending[0]?.poster_path}`})`,
        backgroundSize: "cover",
        backgroundPosition: isTabletOrMobile ? "center top" : "left top",
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

    if(isLoading) {
        return <img id='spinner' src={Loader} alt="loading" />
    }

    if(isError) {
        return <p id='errormessage'>Something went wrong</p>
    }

    //youtube link error handling
    const youtube = () => {
        if(videoloading) {
            return <img id='spinner' src={Loader} alt="loading..." />
        }

        if(videoerror) {
            return <p id='errormessage'>Something went wrong</p>
        }

        if(videodata.results){
            return (
                <iframe
                    style={{width: isTabletOrMobile ? "90%" : "50%", height: isTabletOrMobile ? "40%" : "60%", zIndex:"1"}} 
                    width="1920" height="1080" 
                    src={`https://www.youtube.com/embed/${videodata?.results[0].key}?rel=0&modestbranding=1&autohide=1&mute=0&showinfo=0&controls=1&autoplay=1`} title="YouTube video player" frameBorder="0" allowFullScreen>
                </iframe>
            )
        } else if (!videodata.results) {
                return <p id='errormessage'>Something went wrong</p>
        }
    }

  return (
    <div className='heroSection' style={style}>

        {
            trailerIsOpen &&
            <div onClick={()=>setTrailerIsOpen(false)} style={video} className="video">

                {youtube()}

                <img 
                    style={{position: "absolute", transform: "translate(-50%, -50%)", top:"50%", left:"50%"}} 
                    id='spinner' src={Loader} alt="loading..." 
                />
            </div>
        }

        <div className="heroInfo">
            <div className="heroDetails">
                <h1>{trending[0]?.original_title}</h1>
                <p><span>{trending[0]?.vote_average.toFixed(1)}</span> {allGenre.map(item => item.name).join(', ')}</p>
                <p>{trending[0]?.overview}</p>
                <div className="btns">
                    <button id='btnDetails'>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10.0001 15C14.6026 15 18.3334 10 18.3334 10C18.3334 10 14.6026 5 10.0001 5C5.39758 5 1.66675 10 1.66675 10C1.66675 10 5.39758 15 10.0001 15Z" stroke="#222222" strokeWidth="2" strokeLinejoin="round"/>
                            <path d="M10.0001 12.0833C10.5526 12.0833 11.0825 11.8638 11.4732 11.4731C11.8639 11.0824 12.0834 10.5525 12.0834 9.99996C12.0834 9.44742 11.8639 8.91752 11.4732 8.52682C11.0825 8.13612 10.5526 7.91663 10.0001 7.91663C9.44755 7.91663 8.91764 8.13612 8.52694 8.52682C8.13624 8.91752 7.91675 9.44742 7.91675 9.99996C7.91675 10.5525 8.13624 11.0824 8.52694 11.4731C8.91764 11.8638 9.44755 12.0833 10.0001 12.0833Z" stroke="#222222" strokeWidth="2" strokeLinejoin="round"/>
                        </svg>
                        Reviews
                    </button>

                    <button id='btnAddToWatchlist'>
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6.75 5.25V0H5.25V5.25H0V6.75H5.25V12H6.75V6.75H12V5.25H6.75Z" fill="white"/>
                        </svg>
                        Watchlist
                    </button>
                </div>
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