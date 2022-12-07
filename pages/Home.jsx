import { useState, useEffect } from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import {auth, db, signOut} from "../src/firebase"
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


    const [expand, setExpand] = useState(false)
    const [selectedOption, setSelectedOption] = useState("upcoming")

    const selectOption = (e) => {
        setSelectedOption(e.currentTarget.textContent)
        setExpand(false)
        refetch()
    }

    const {data: trending, isLoading, isError} = movieDataQuery()
    const {data: selected, isLoading: load, isError: error, refetch} = moviesSelected(selectedOption)

      const [_, setFireStoreData] = useRecoilState(fireState)
      const fireStoreNewPost = useRecoilValue(fireStatePost)

    // const [fireStoreData, setFireStoreData] = useState([])

    // const logOut = () => {
    //     signOut(auth).then(() => {
            
    //       }).catch((error) => {
    //         console.log(error)
    //     })
    // }

    // const addData = (e) => {
    //     const find = fireStoreData.find(each => each.id === e.target.textContent)

    //     if(find === undefined){
    //         setData([...data, {
    //             id: e.target.textContent,
    //             watchlisted: true,
    //             favorited: false
    //         }])
    //     } else {
    //         const newData = fireStoreData.filter(ele => ele.id != e.target.textContent)
    //         setFireStoreData(newData)
    //     }
    // }

    // const removeData = (e) => {
    //     const newData = fireStoreData.filter(ele => ele.id != e.target.textContent)
    //     setFireStoreData(newData)
    // }

    // Get from firestore
    useEffect(()=>{
        if(user){
            const unsub = onSnapshot(doc(db, "user", user.uid), (doc) => {
                setFireStoreData(doc.data() ? doc.data().fireStoreNewPost : [])
        })
        return () => unsub()
        }
    },[user])

    // Post to firestore
    useEffect(()=>{
        const add = async (e) => {
            try {
                const docRef = await setDoc(doc(db, "user", user.uid), {
                    fireStoreNewPost
                })
    
            } catch(error) {
                console.log(error)
            }
        }
        {user && add()}
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