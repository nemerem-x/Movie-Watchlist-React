import {auth} from "../src/firebase"
import '../style/WatchlistPage.css'

export default function Watchlist() {


    return (
        <div className="watchlistbox">
            <h1>My Watchlist</h1>
            <button onClick={() => auth.signOut()}>Logout</button>
        </div>
    )
}