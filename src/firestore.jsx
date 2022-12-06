import { useAuthState } from "react-firebase-hooks/auth"
import {auth, db} from "../src/firebase"
import { doc, onSnapshot  } from "firebase/firestore"
import { useState, useEffect } from 'react'

function firestore() {

    const [user, loading] = useAuthState(auth)
    const [data , setData] = useState()

    useEffect(()=>{
        if(user){
            const unsub = onSnapshot(doc(db, "user", user.uid), (doc) => {
                setData(doc.data().data ? doc.data().data : [])
            })
            return () => unsub()
        }
    },[user])

  return {data}

}

export {firestore}
