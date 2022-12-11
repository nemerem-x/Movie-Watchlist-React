import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "../src/firebase"
import { Link } from "react-router-dom"
import { movieWatchlistData } from "../src/reactQueries"
import { useRecoilValue } from 'recoil'
import {fireState} from "../src/recoil"
import '../style/Watchlist.css'

export default function Watchlist() {

    const [user, loading] = useAuthState(auth)
    const fireStoreData = useRecoilValue(fireState)

    const ids = fireStoreData?.map(item => item.id)
    const watchlistsArray = movieWatchlistData(ids)

    const watchlists = watchlistsArray?.map(watchlist => {

        if (watchlist.status === "loading"){
            return <p key={watchlist?.data?.id}>loading...</p>
        }
        return (
            <div key={watchlist?.data?.id} className="listedmovie">
                <svg width="35" height="35" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="31.75" height="31.75" rx="10" fill="#CCFF00"/>
                    <path d="M19.8351 11.167C19.9069 11.084 19.9927 11.018 20.0874 10.973C20.182 10.928 20.2837 10.9048 20.3864 10.9048C20.4891 10.9048 20.5907 10.928 20.6854 10.973C20.78 11.018 20.8658 11.084 20.9377 11.167C21.2389 11.5114 21.2431 12.0679 20.9482 12.4183L14.7209 20.7487C14.6502 20.8365 14.5644 20.9071 14.4688 20.9562C14.3731 21.0052 14.2697 21.0317 14.1647 21.0339C14.0597 21.0361 13.9554 21.0141 13.8582 20.9691C13.761 20.9242 13.6729 20.8573 13.5993 20.7725L9.81008 16.4274C9.66394 16.2587 9.58208 16.0319 9.58208 15.7957C9.58208 15.5595 9.66394 15.3327 9.81008 15.1641C9.88195 15.0811 9.96773 15.0152 10.0624 14.9702C10.1571 14.9252 10.2587 14.902 10.3614 14.902C10.4641 14.902 10.5657 14.9252 10.6604 14.9702C10.7551 15.0152 10.8409 15.0811 10.9127 15.1641L14.127 18.8502L19.814 11.1932C19.8205 11.184 19.8276 11.1752 19.8351 11.167Z" fill="#222222"/>
                </svg>
                <div className="listedinfo">
                    <h2>{watchlist?.data?.original_title}</h2>
                    <p>Budget: ${watchlist?.data?.budget}</p>
                </div>
            </div>
        )
    }).slice(0,6)

  return (
    <div className='yourwatchlist'>
        <div className="watchlistcontainer">

        {
            user ?
                <>
                    <h1><Link to="/watchlist">Your Watchlist</Link>
                        <svg width="12" height="8" viewBox="0 0 14 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6.99999 8.47077C6.84443 8.47077 6.69393 8.4416 6.54849 8.38327C6.40226 8.32493 6.28054 8.24716 6.18332 8.14993L0.816652 2.78327C0.602763 2.56938 0.495819 2.29716 0.495819 1.9666C0.495819 1.63605 0.602763 1.36382 0.816652 1.14993C1.03054 0.936046 1.30276 0.829102 1.63332 0.829102C1.96387 0.829102 2.2361 0.936046 2.44999 1.14993L6.99999 5.69993L11.55 1.14993C11.7639 0.936046 12.0361 0.829102 12.3667 0.829102C12.6972 0.829102 12.9694 0.936046 13.1833 1.14993C13.3972 1.36382 13.5042 1.63605 13.5042 1.9666C13.5042 2.29716 13.3972 2.56938 13.1833 2.78327L7.81665 8.14993C7.69999 8.2666 7.5736 8.34905 7.43749 8.39727C7.30137 8.44627 7.15554 8.47077 6.99999 8.47077Z" fill="#DBDBDB"/>
                        </svg>
                    </h1>
                    {
                        watchlistsArray.length ?
                        <div className="watchlistsection">

                            {watchlists}
                            
                        </div>
                        :
                        <h4>Your watchlist is empty</h4>
                    }
                </>
            :
                <div className="accesswatchlist">
                    <svg width="29" height="29" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.2257 1.25269H21.9715C26.9421 1.25269 30.9715 5.28212 30.9715 10.2527V22C30.9715 26.9706 26.9421 31 21.9715 31H10.2257C5.25515 31 1.22571 26.9706 1.22571 22V10.2527C1.22571 5.28212 5.25515 1.25269 10.2257 1.25269Z" stroke="white" strokeWidth="2"/>
                        <path d="M16.442 15.4323V10.2709H15.1447V15.4323H10.6041V16.907H15.1447V22.0685H16.442V16.907H20.9826V15.4323H16.442Z" fill="white"/>
                    </svg>
                    <p> Sign in to access your Watchlist <br />
                        Save shows and movies to keep track of what you want to watch.
                    </p>
                    <Link to="/login">Sign in to NMDb</Link>
                </div>
        }
        </div>
    </div>
  )
}
