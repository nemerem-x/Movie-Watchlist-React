import { useState } from 'react'
import '../src/App.css'
import { createUserWithEmailAndPassword } from "firebase/auth";
import {auth, db} from '../src/firebase';
import { doc, setDoc } from "firebase/firestore"
import { Link } from "react-router-dom"
import { Navigate } from "react-router-dom"
import Loader from '/loading.svg'
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

function Signup() {
  const [error, setError] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [password2, setPassword2] = useState("")
  const [successful, setSuccessful] = useState(false)
  const [spinner, setSpinner] = useState(false)

  const handleLogin = (e) => {
    e.preventDefault()
    setSpinner(true)

    if(password === password2){
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user
          setError(false)
          setSuccessful(true)
          setSpinner(false)
        })
        .catch((error) => {
          const errorCode = error.code
          const errorMessage = error.message
          setError(errorMessage)
          setSpinner(false)
          console.log(errorCode, errorMessage)
        })
      } else {
        setError("password doesn't match")
      }
  }

  const googleSignUp = () => {
    signInWithPopup(auth, provider)
    .then((result) => {
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    const user = result.user;
    // ...
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.customData.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
      console.log(error)
    });
  }

  if(!successful)
  return (
    <>
      <h2>Sign up</h2>
        {error && <p className='error'>{error}</p>}
        <form onSubmit={handleLogin} className="login">
            <label htmlFor="email">Email</label>
            <input onChange={e => setEmail(e.target.value)} id="email" type="email" placeholder="example@email.com"/>

            <label htmlFor="password">Password</label>
            <input onChange={e => setPassword(e.target.value)} id="password" type="password" placeholder="password"/>
            
            <label htmlFor="password">Confirm Password</label>
            <input onChange={e => setPassword2(e.target.value)} id="password" type="password" placeholder="password"/>

            {
              spinner ?
              <img id='spinner' src={Loader} alt="" />
              :
              <button type='submit'>Sign up with Email</button>
            }
        </form>
        <button id='googleBtn' onClick={googleSignUp}>
          <svg width="20" height="20" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_223_2)">
            <path d="M29.3027 15.2806C29.3027 14.0516 29.2029 13.1547 28.9871 12.2245H14.9521V17.772H23.1904C23.0243 19.1506 22.1274 21.2268 20.1342 22.6219L20.1063 22.8077L24.5439 26.2454L24.8513 26.2761C27.6749 23.6684 29.3027 19.8316 29.3027 15.2806" fill="#4285F4"/>
            <path d="M14.9522 29.8969C18.9882 29.8969 22.3765 28.5681 24.8514 26.2761L20.1343 22.6219C18.872 23.5023 17.1778 24.1168 14.9522 24.1168C10.9991 24.1168 7.64406 21.5092 6.44807 17.905L6.27276 17.9198L1.65849 21.4909L1.59814 21.6586C4.05631 26.5418 9.10559 29.8969 14.9522 29.8969Z" fill="#34A853"/>
            <path d="M6.44781 17.905C6.13223 16.9748 5.9496 15.9782 5.9496 14.9485C5.9496 13.9186 6.13223 12.9221 6.4312 11.992L6.42285 11.7939L1.75075 8.1655L1.59788 8.23821C0.584754 10.2646 0.00341797 12.5401 0.00341797 14.9485C0.00341797 17.3568 0.584754 19.6323 1.59788 21.6586L6.44781 17.905" fill="#FBBC05"/>
            <path d="M14.9522 5.78004C17.7591 5.78004 19.6525 6.99252 20.7322 8.00576L24.951 3.8866C22.36 1.47824 18.9882 0 14.9522 0C9.10559 0 4.05631 3.35508 1.59814 8.23821L6.43147 11.992C7.64406 8.38775 10.9991 5.78004 14.9522 5.78004" fill="#EB4335"/>
            </g>
            <defs>
            <clipPath id="clip0_223_2">
            <rect width="29.32" height="30" fill="white"/>
            </clipPath>
            </defs>
          </svg>
          Sign up with Google
          </button>
    </>
  )
}

export default Signup
