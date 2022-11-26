import {auth} from "../src/firebase"
import '../style/WatchlistPage.css'
import Movie from '../components/Movie'

export default function Watchlist() {


    return (
        <div className="watchlistbox">
            <h1>My Watchlist</h1>
            <div className="watchlistcontainer">
                <Movie/>
                <Movie/>
                <Movie/>
                <Movie/>
                <Movie/>
                <Movie/>
                <Movie/>
            </div>
        </div>
    )
}