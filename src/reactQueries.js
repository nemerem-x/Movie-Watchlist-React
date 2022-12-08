import { useQuery } from '@tanstack/react-query'
import { useQueries } from '@tanstack/react-query'

  const key = import.meta.env.VITE_APP_TMDB_KEY

  const trendingData = async () => {
    const data = await fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=${key}`)
    return data.json()
  }
  export const movieDataQuery = () => useQuery(['trending'], trendingData)
  

  const movieSelect = async ({queryKey}) => {
    const [_, selected] = queryKey
    const data = await fetch(`https://api.themoviedb.org/3/movie/${selected}?api_key=${key}&language=en-US&page=1`)
    return data.json()
  }
  export const moviesSelected = (selected) => useQuery(['selected', selected], movieSelect)


  const genre = async () => {
    const genreData = await fetch(`https://api.themoviedb.org/3/genre/movie/list?language=en-US&api_key=${key}`)
    return genreData.json()
  }
  export const genreData = () => useQuery(['genre'], genre)


  const videos = async ({queryKey}) => {
    const [_, id] = queryKey
    const videoData = await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${key}`)
    return videoData.json()
  }
  export const videoData = (id) => useQuery(['videos', id], videos)


  const nowPlaying = async () => {
    const nowPlayingData = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${key}`)
    return nowPlayingData.json()
  }
  export const nowPlayingData = () => useQuery(['nowPlaying'], nowPlaying)


  const movie = async ({queryKey}) => {
    const [_, id] = queryKey
    const movieFullData = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${key}`)
    return movieFullData.json()
  }
  export const movieFullData = (id) => useQuery(['movie', id], movie)

  // const ids = [
  //   {favorited: false,
  //   id: '774752',
  //   watchlisted: true},
  //   {favorited: false,
  //   id: '436270',
  //   watchlisted: true }
  // ]
  const movieWatchlist = async ({queryKey}) => {
    const [_, id] = queryKey
      const movieFullData = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${key}`)
      return movieFullData.json()
  }
  export const movieWatchlistData = (ids) => useQueries({
    queries: ids.map(id => {
      return {queryKey: ['moviedata', id], queryFn: movieWatchlist}
    })
  })


  const discover = async ({queryKey}) => {
    const [_, page] = queryKey
    const data = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${key}&page=${page}`)
    return data.json()
  }
  export const discoverData = (page) => useQuery(['discover', page], discover)


  const reviews = async ({queryKey}) => {
    const [_, id] = queryKey
    const data = await fetch(`https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${key}`)
    return data.json()
  }
  export const reviewsData = (id) => useQuery(['review', id], reviews)


  const search = async ({queryKey}) => {
    const [_, phrase] = queryKey
    const data = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${key}&query=${phrase}&language=en-US`)
    return data.json()
  }
  export const searchData = (phrase) => useQuery(['search', phrase], search)