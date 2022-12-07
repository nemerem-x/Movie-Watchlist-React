import { useAuthState } from "react-firebase-hooks/auth"
import {auth, db, signOut} from "../src/firebase"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"

export default function User({navModal}) {

    const [user, loading] = useAuthState(auth)
    const navigate = useNavigate()

    const logOut = () => {
        signOut(auth).then(() => {
            navigate('/')
          }).catch((error) => {
            console.log(error)
        })
    }

  return (
    <div className="logout">
        {
            user && 
            <>
                <p>User ID: <br /> {user.uid}</p>
                <p>User Email: {user.email}</p>
                <Link onClick={navModal} to={"/watchlist"}>Go to my watchlist</Link>
            </>
        }
        <button onClick={logOut}>Logout</button>
    </div>
  )
}
