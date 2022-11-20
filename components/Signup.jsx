import { useState } from 'react'
import '../src/App.css'
import { createUserWithEmailAndPassword } from "firebase/auth";
import {auth, db} from '../src/firebase';
import { doc, setDoc } from "firebase/firestore"
import { Link } from "react-router-dom"
import { Navigate } from "react-router-dom"
import Loader from '/loading.svg'


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
              <button type='submit'>Sign up</button>
            }
        </form>
        
    </>
  )
}

export default Signup
