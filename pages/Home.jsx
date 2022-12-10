import { useState, useEffect } from "react"
import Hero from "../components/Hero"
import Trending from "../components/Trending"
import Watchlist from "../components/Watchlist"
import Category from "../components/Category"
import NowPlaying from "../components/NowPlaying"
import { movieDataQuery } from '../src/reactQueries'
import { moviesSelected } from "../src/reactQueries"


export default function Home() {

    const {data: trending, isLoading, isError} = movieDataQuery()
    const [selectedOption, setSelectedOption] = useState("Upcoming")
    const {data: selected, isLoading: load, isError: error, refetch} = moviesSelected(selectedOption.replace(' ', '_').toLowerCase())
    const [expand, setExpand] = useState(false)
    
    const selectOption = (e) => {
        setSelectedOption(e.currentTarget.textContent)
        setExpand(false)
        refetch()
    }

    useEffect(()=>{
        const scrollPosition = sessionStorage.getItem("scrollPosition")
        if (scrollPosition) {
            window.scrollTo(0, parseInt(scrollPosition))
            setTimeout(()=>{
                sessionStorage.removeItem("scrollPosition")
            },200)
        }
    },[trending])

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