import { useState } from 'react'
import '../src/App.css'
import { signInWithEmailAndPassword } from "firebase/auth"
import {auth} from '../src/firebase'
import Loader from '/loading.svg'


function Login() {
  const [error, setError] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [successful, setSuccessful] = useState(false)
  const [spinner, setSpinner] = useState(false)


  const handleLogin = (e) => {
    e.preventDefault()
    setSpinner(true)

    signInWithEmailAndPassword(auth, email, password)
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
        setError(true)
        setSpinner(false)
        console.log(errorCode, errorMessage)
      });
  }

  // if(successful) {
  //   return <Navigate to="/watchlist" replace />
  // }

  if(!successful)
  return (
      <>
            <h2>Sign in</h2>
            <form className="login" onSubmit={handleLogin}>

                {error && <p className='error'>email or password is incorrect</p>}
                
                <label htmlFor="email">Email</label>
                <input onChange={e => setEmail(e.target.value)} id="email" type="email" placeholder="example@email.com"/>

                <label htmlFor="password">Password</label>
                <input onChange={e => setPassword(e.target.value)} id="password" type="password" placeholder="password"/>
                <p>forgot password?</p>

                {
                  spinner ?
                  <img id='spinner' src={Loader} alt="" />
                  :
                  <button>Sign in</button>
                }

            </form>
      </>
  )
}

export default Login
