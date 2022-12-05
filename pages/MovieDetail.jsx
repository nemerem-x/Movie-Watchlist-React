import '../style/MovieDetail.css'
import { useParams } from 'react-router-dom'
import { movieFullData } from '../src/reactQueries'
import { videoData } from '../src/reactQueries'
import { reviewsData } from '../src/reactQueries'
import Watchlist from '../components/Watchlist'
import Loader from '/loading.svg'

export default function MovieDetail() {
    
    const params = useParams()

    const {data, isLoading, isError} = movieFullData(params.id)
    const {data: reviews, isLoading: reviewloading, isError: reviewserror} = reviewsData(params.id)
    const {data: videodata, isLoading: videoloading, isError: videoerror} = videoData(data?.id)

    const click = (e) => {
        if(e.target.id === "add" || e.target.id === "movieAddToWatchlist") {
            console.log("add")
        } else {
            navigate(`/movie/${movie.id}`)
        }
    }

    // if (!data?.success){
    //     return <p id='errormessage'>{data?.status_message}</p>
    // }

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
                <h2>{data?.original_title}</h2>
                <p>{data?.runtime}mins - {data?.release_date?.slice(0,4)}</p>
            </div>
            <div className="titleboxright">
                <p>{data?.vote_average?.toFixed(1)}</p>
                <button onClick={(e)=>click(e)} id='movieAddToWatchlist' className="both">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6.75 5.25V0H5.25V5.25H0V6.75H5.25V12H6.75V6.75H12V5.25H6.75Z" fill="white"/>
                    </svg>
                    Watchlist
                </button>
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
            <img src={`https://image.tmdb.org/t/p/w500${data?.poster_path}`} alt="poster" />
        </div>

        <div className="otherdetails">
            <div className="otherdetailsleft">
                <img src={`https://image.tmdb.org/t/p/w500${data?.poster_path}`} alt="poster" />
                <div className="detailLeft">
                    <div className="allgenres">
                        {data?.genres?.map(item => <p key={item.id}>{item.name}</p>)}
                    </div>
                    <p>{data?.overview}</p>
                </div>
            </div>

            <div className="otherdetailsright">
                <div className="detailright">
                    <p>Budget</p>
                    <h2>${data?.budget}</h2>
                </div>
                <div className="detailright">
                    <p>Revenue</p>
                    <h2>${data?.revenue}</h2>
                </div>
                <div className="detailright">
                    <p>Country</p>
                    <h2>{data?.production_countries[0]?.iso_3166_1}</h2>
                </div>
            </div>
        </div>

        <div className="reviewBox" id='reviews'>
            <h1>Reviews</h1>
            <div className="review">
                {
                    reviews?.results?.slice(0,2).map(comment => {
                        return (
                            <div className="reviews">
                                <p>{comment?.author}</p>
                                <p>{comment?.content}</p>
                            </div>
                        )
                    })
                }
            </div>
        </div>
        <Watchlist/>
    </div>
  )
}
