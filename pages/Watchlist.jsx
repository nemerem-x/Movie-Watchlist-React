import {auth} from "../src/firebase"

export default function Watchlist() {

    return (
        <div className="home">
            <h1>My Watchlist</h1>
            <button onClick={() => auth.signOut()}>Logout</button>
        </div>
    )
}