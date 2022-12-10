import '../style/WatchlistPage.css'
import { useRecoilValue } from 'recoil'
import {fireState} from "../src/recoil"
import { movieWatchlistData } from "../src/reactQueries"
import Trending from '../components/Trending'
import Movie from '../components/Movie'

export default function Watchlist() {

    const fireStoreData = useRecoilValue(fireState)

    const ids = fireStoreData?.map(item => item.id)
    const watchlistsArray = movieWatchlistData(ids)

    const watchlists = watchlistsArray?.map(movie => {

        if (movie?.status === "loading"){
            return <p key={movie?.data?.id}>loading...</p>
        }
        return (
            <Movie key={movie?.data?.id} movie={movie?.data} />
        )
    })

    return (
        <>
            <div className="watchlistbox">
                <h1>My Watchlist</h1>
                {
                    watchlistsArray.length ?
                    <div className="watchlistcontainer">{watchlists}</div>
                    : <h4>No movies in your watchlist.</h4>
                }
            </div>
            <Trending/>
        </>
    )
}