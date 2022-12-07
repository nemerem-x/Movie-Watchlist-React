import { useState, useEffect } from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import {auth, db} from "../src/firebase"
import { doc, setDoc, onSnapshot  } from "firebase/firestore"
import Hero from "../components/Hero"
import Trending from "../components/Trending"
import Watchlist from "../components/Watchlist"
import Category from "../components/Category"
import NowPlaying from "../components/NowPlaying"
import { movieDataQuery } from '../src/reactQueries'
import { moviesSelected } from "../src/reactQueries"
import { useRecoilState } from 'recoil'
import { useRecoilValue } from 'recoil'
import {fireState, fireStatePost} from "../src/recoil"


export default function Home() {

    const [user, loading] = useAuthState(auth)
    const {data: trending, isLoading, isError} = movieDataQuery()
    const [selectedOption, setSelectedOption] = useState("upcoming")
    const {data: selected, isLoading: load, isError: error, refetch} = moviesSelected(selectedOption)
    const [expand, setExpand] = useState(false)

    //recoil state
    const [_, setFireStoreData] = useRecoilState(fireState)
    const fireStoreNewPost = useRecoilValue(fireStatePost)
    const selectOption = (e) => {
        setSelectedOption(e.currentTarget.textContent)
        setExpand(false)
        refetch()
    }

    // Get from firestore
    useEffect(()=>{
        if(user){
            const unsub = onSnapshot(doc(db, "user", user.uid), (doc) => {
                setFireStoreData(doc.data() ? doc.data().fireStoreNewPost : [])
            })
            return () => unsub()
        }
    },[user, fireStoreNewPost])

    // Post to firestore
    useEffect(()=>{
        const add = async () => {
            try {
                const docRef = await setDoc(doc(db, "user", user.uid), {
                    fireStoreNewPost
                })
                
            } catch(error) {
                console.log(error)
            }
        }
        if(fireStoreNewPost){
            add()
        }
    },[fireStoreNewPost])
    
    return (
        <>
            <Hero/>
            <Trending>
                {trending}
                {isError}
                {isLoading}
            </Trending>
            <Watchlist/>
            <Category>
                {selected}
                {load}
                {error}
                {selectedOption}
                {selectOption}
                {refetch}
                {expand}
                {setExpand}
            </Category>
            <NowPlaying/>
        </>
    )
}