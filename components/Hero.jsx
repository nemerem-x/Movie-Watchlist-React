import HeroImage from '/hero_image.png'
import { useMediaQuery } from 'react-responsive'
import { useState, useEffect } from 'react'
import Loader from '/loading.svg'
import { movieDataQuery } from '../src/reactQueries'
import { genreData } from '../src/reactQueries'
import { videoData } from '../src/reactQueries'
import { Link, useNavigate } from 'react-router-dom'
import { useRecoilValue, useRecoilState } from 'recoil'
import {fireState, fireStatePost} from "../src/recoil"
import { doc, setDoc  } from "firebase/firestore"
import {auth, db} from "../src/firebase"
import { useAuthState } from "react-firebase-hooks/auth"
import { useMutation } from "@tanstack/react-query"


export default function Hero() {

    const navigate = useNavigate()
    const [user, loading] = useAuthState(auth)

    //recoil-state
    const fireStoreData = useRecoilValue(fireState)
    const [_, fireStorePost] = useRecoilState(fireStatePost)

    //react-query
    const {data, isLoading, isError} = movieDataQuery()
    const {data: genre, isLoading: genreloading, isError: error} = genreData()
    
    const trending = data ? data.results.slice(0,3) : []
    const allGenre = genre ? genre.genres.filter(e => trending[0]?.genre_ids.includes(e.id)).slice(0,3) : []
    
    //react query
    const {data: videodata, isLoading: videoloading, isError: videoerror} = videoData(trending[0]?.id)

    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1000px)' })
    const [trailerIsOpen, setTrailerIsOpen] = useState(false)

    useEffect(()=>{
        document.body.style.overflow = trailerIsOpen ? 'hidden' : 'unset'
    },[trailerIsOpen])


    //add to firestore and/or watchlist
    // const add = (data) => {
    // return setDoc(doc(db, "user", user.uid), { data })
    // }
    // const { mutate } = useMutation(add)
    const addToFirestore = (e) => {
    if(user){

            const find = fireStoreData.find(each => each.id === trending[0]?.id)

            if(find === undefined){
                const data = [...fireStoreData, {
                id: trending[0]?.id,
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
    const removeFromFirestore = (e) => {
        const newData = fireStoreData.filter(each => each.id != trending[0]?.id)
        fireStorePost(newData)
    }

    //right button if or not in firestore
    const watchlisted = fireStoreData?.some(each => each.id === trending[0]?.id)

    const review = () => {
        navigate(`/movie/${trending[0]?.id}`)
    }

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
        position: "absolute",
        zIndex: "2",
        backgroundColor: "rgb(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        top: "0",
    }

    if(isLoading) {
        return (
            <div className="spinnerbox">
                <img id='spinner' src={Loader} alt="loading" />
            </div>
        )
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
                <Link to={`movie/${trending[0]?.id}`}><h1>{trending[0]?.original_title}</h1></Link>
                <p><span>{trending[0]?.vote_average.toFixed(1)}</span> {allGenre.map(item => item.name).join(', ')} - {trending[0]?.release_date.slice(0,4)}</p>
                <p>{trending[0]?.overview}</p>
                <div className="btns">
                    <button id='btnDetails' onClick={review}>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10.0001 15C14.6026 15 18.3334 10 18.3334 10C18.3334 10 14.6026 5 10.0001 5C5.39758 5 1.66675 10 1.66675 10C1.66675 10 5.39758 15 10.0001 15Z" stroke="#222222" strokeWidth="2" strokeLinejoin="round"/>
                            <path d="M10.0001 12.0833C10.5526 12.0833 11.0825 11.8638 11.4732 11.4731C11.8639 11.0824 12.0834 10.5525 12.0834 9.99996C12.0834 9.44742 11.8639 8.91752 11.4732 8.52682C11.0825 8.13612 10.5526 7.91663 10.0001 7.91663C9.44755 7.91663 8.91764 8.13612 8.52694 8.52682C8.13624 8.91752 7.91675 9.44742 7.91675 9.99996C7.91675 10.5525 8.13624 11.0824 8.52694 11.4731C8.91764 11.8638 9.44755 12.0833 10.0001 12.0833Z" stroke="#222222" strokeWidth="2" strokeLinejoin="round"/>
                        </svg>
                        Reviews
                    </button>

                    {
                        watchlisted  && user ?
                        <button onClick={(e)=>removeFromFirestore(e)} id='movieWatchlisted' className="movieWatchlisted">
                            <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5.11137 8.54706L2.10172 5.09558C2.10163 5.09547 2.10153 5.09536 2.10143 5.09525C2.00808 4.98755 1.89498 4.90003 1.76776 4.83955C1.64028 4.77894 1.50203 4.74714 1.36142 4.74714C1.22081 4.74714 1.08256 4.77894 0.955075 4.83955C0.82774 4.90008 0.714555 4.9877 0.621156 5.09553C0.433201 5.31244 0.332092 5.59836 0.332092 5.89088C0.332092 6.1834 0.433201 6.46932 0.621155 6.68623L0.621674 6.68682L4.41051 11.0315C4.41059 11.0316 4.41066 11.0317 4.41074 11.0317C4.50631 11.1418 4.62251 11.2308 4.75327 11.2912C4.88429 11.3518 5.02621 11.382 5.16999 11.379C5.31376 11.3759 5.45434 11.3397 5.58287 11.2738C5.71126 11.2079 5.82413 11.1144 5.91572 11.0005L5.91584 11.0006L5.92119 10.9935L12.1444 2.66854C12.5133 2.22413 12.507 1.53382 12.1263 1.09798C12.033 0.990342 11.9199 0.902866 11.7927 0.842405L11.6854 1.06819L11.7927 0.842405C11.6653 0.781797 11.527 0.75 11.3864 0.75C11.2458 0.75 11.1075 0.781797 10.9801 0.842405C10.8535 0.902589 10.7408 0.989542 10.6478 1.09651C10.635 1.11073 10.6231 1.12561 10.612 1.14103L5.11137 8.54706Z" fill="#222222" stroke="black" strokeWidth="0.5"/>
                            </svg>
                                Watchlisted
                        </button>
                        :
                        <button onClick={addToFirestore} id='btnAddToWatchlist'>
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6.75 5.25V0H5.25V5.25H0V6.75H5.25V12H6.75V6.75H12V5.25H6.75Z" fill="white"/>
                            </svg>
                            Watchlist
                        </button>
                    }


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