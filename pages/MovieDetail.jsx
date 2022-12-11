import '../style/MovieDetail.css'
import { useNavigate, useParams } from 'react-router-dom'
import { movieFullData } from '../src/reactQueries'
import { videoData } from '../src/reactQueries'
import { reviewsData } from '../src/reactQueries'
import Watchlist from '../components/Watchlist'
import NowPlaying from '../components/NowPlaying'
import Loader from '/loading.svg'
import {auth} from "../src/firebase"
import { useAuthState } from "react-firebase-hooks/auth"
import { useRecoilState } from 'recoil'
import { useRecoilValue } from 'recoil'
import {fireState, fireStatePost} from "../src/recoil"

export default function MovieDetail() {
    
    const navigate = useNavigate()
    const params = useParams()
    const [user, loading] = useAuthState(auth)

    const {data: movieData, isLoading, isError} = movieFullData(params.id)
    const {data: reviews, isLoading: reviewloading, isError: reviewserror} = reviewsData(params.id)
    const {data: videodata, isLoading: videoloading, isError: videoerror} = videoData(movieData?.id)

    //src/recoil-Global State
    const fireStoreData = useRecoilValue(fireState)
    const [_, fireStorePost] = useRecoilState(fireStatePost)

    const addToFirestore = () => {
        if(user){
            
            const find = fireStoreData.find(each => each.id === movieData.id)
            console.log(find)
            if(find === undefined){
                const data = [...fireStoreData, {
                id: movieData.id,
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
      const newData = fireStoreData.filter(each => each.id != movieData.id)
      fireStorePost(newData)
  }

  const watchlisted = fireStoreData.some(each => each.id === movieData?.id)


    if(isLoading) {
        return (
            <div className="spinnerbox">
                <img id='spinner' src={Loader} alt="loading" />
            </div>
        )
    }

    if (isError){
        return <p id='errormessage'>Something went wrong</p>
    }

    return (
    <div className='MovieDetail'>
        <div className="titlebox">
            <div className="titleboxleft">
                <h2>{movieData?.original_title}</h2>
                <p>{movieData?.runtime}mins - {movieData?.release_date?.slice(0,4)}</p>
            </div>
            <div className="titleboxright">
                <p>{movieData?.vote_average?.toFixed(1)}</p>
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
        </div>

        <div className="MovieDetailBox">
            <div className="video">
                <iframe
                width="1920" height="1080"
                src={`https://www.youtube.com/embed/${videodata?.results[0]?.key}?rel=0&modestbranding=1&autohide=1&mute=0&showinfo=0&controls=1&autoplay=1`} title="YouTube video player" frameBorder="0" allowFullScreen
                >
                </iframe>
            </div>
            <img src={`https://image.tmdb.org/t/p/w500${movieData?.poster_path}`} alt="poster" />
        </div>

        <div className="otherdetails">
            <div className="otherdetailsleft">
                <img src={`https://image.tmdb.org/t/p/w500${movieData?.poster_path}`} alt="poster" />
                <div className="detailLeft">
                    <div className="allgenres">
                        {movieData?.genres?.map(item => <p key={item.id}>{item.name}</p>)}
                    </div>
                    <p>{movieData?.overview}</p>
                </div>
            </div>

            <div className="otherdetailsright">
                <div className="detailright">
                    <p>Budget</p>
                    <h2>${movieData?.budget}</h2>
                </div>
                <div className="detailright">
                    <p>Revenue</p>
                    <h2>${movieData?.revenue}</h2>
                </div>
                <div className="detailright">
                    <p>Country</p>
                    <h2>{movieData?.production_countries[0]?.iso_3166_1}</h2>
                </div>
            </div>
        </div>

        <div className="reviewBox">
            <h1>Reviews</h1>
            <div className="review">
                {
                    reviews?.results?.slice(0,2).map(comment => {
                        return (
                            <div className="reviews" key={comment.id}>
                                <p>{comment?.author}</p>
                                <p>{comment?.content}</p>
                            </div>
                        )
                    })
                }
            </div>
        </div>
        <Watchlist/>
        <NowPlaying/>
    </div>
  )
}
