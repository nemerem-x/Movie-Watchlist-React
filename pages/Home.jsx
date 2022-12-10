import { useEffect } from "react"
import Hero from "../components/Hero"
import Trending from "../components/Trending"
import Watchlist from "../components/Watchlist"
import Category from "../components/Category"
import NowPlaying from "../components/NowPlaying"

export default function Home() {
    
    useEffect(()=>{
        const scrollPosition = sessionStorage.getItem("scrollPosition")
        if (scrollPosition) {
            window.scrollTo(0, parseInt(scrollPosition))
            setTimeout(()=>{
                sessionStorage.removeItem("scrollPosition")
            },200)
        }
    },[])

    return (
        <>
            <Hero/>
            <Trending/>
            <Watchlist/>
            <Category/>
            <NowPlaying/>
        </>
    )
}