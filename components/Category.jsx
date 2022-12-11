import { useRef, useState } from 'react'
import '../style/Category.css'
import Movie from './Movie'
import Loader from '/loading.svg'
import { moviesSelected } from "../src/reactQueries"

export default function Category() {

  const [selectedOption, setSelectedOption] = useState("Upcoming")
  const {data: selected, isLoading: load, isError: error, refetch} = moviesSelected(selectedOption.replace(' ', '_').toLowerCase())
  const [expand, setExpand] = useState(false)

  const selectOption = (e) => {
    setSelectedOption(e.currentTarget.textContent)
    setExpand(false)
    refetch()
  }

  const movieMap = selected?.results.map(movie => {
    return <Movie key={movie.id} movie={movie} />
  })

  const scrollable = useRef(null)
  // const [leftArrow, setLeftArrow] = useState(false)
  // const [rightArrow, setRightArrow] = useState(false)

  const scrollIt = (toRight) => {
      // if(scrollable.current.scrollLeft + scrollable.current.clientWidth - 50 > scrollable.current.clientWidth){
      //   setLeftArrow(true)
      //   setRightArrow(false)
      // }

      // if(scrollable.current.scrollWidth - scrollable.current.clientWidth - 50 < scrollable.current.scrollLeft){
      //   setRightArrow(true)
      // } 

      const scrollLength = scrollable.current.clientWidth
      scrollable.current.scrollBy({left: scrollLength * (toRight ? 1 : -1), behavior: "smooth"})
  }

  return (
    <div className="genre">

      <div className="genrecontainer">

        <div onClick={()=>setExpand(!expand)} className="select">{selectedOption}
          <svg width="12" transform={expand ? "rotate(180)" : "rotate(0)"} height="8" viewBox="0 0 14 9" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.99999 8.47077C6.84443 8.47077 6.69393 8.4416 6.54849 8.38327C6.40226 8.32493 6.28054 8.24716 6.18332 8.14993L0.816652 2.78327C0.602763 2.56938 0.495819 2.29716 0.495819 1.9666C0.495819 1.63605 0.602763 1.36382 0.816652 1.14993C1.03054 0.936046 1.30276 0.829102 1.63332 0.829102C1.96387 0.829102 2.2361 0.936046 2.44999 1.14993L6.99999 5.69993L11.55 1.14993C11.7639 0.936046 12.0361 0.829102 12.3667 0.829102C12.6972 0.829102 12.9694 0.936046 13.1833 1.14993C13.3972 1.36382 13.5042 1.63605 13.5042 1.9666C13.5042 2.29716 13.3972 2.56938 13.1833 2.78327L7.81665 8.14993C7.69999 8.2666 7.5736 8.34905 7.43749 8.39727C7.30137 8.44627 7.15554 8.47077 6.99999 8.47077Z" fill="#DBDBDB"/>
          </svg>
        </div>

        {
          expand && 
          <div className="options">
            <p onClick={(e)=>selectOption(e)}>Upcoming</p>
            <p onClick={(e)=>selectOption(e)}>Popular</p>
            <p onClick={(e)=>selectOption(e)}>Top Rated</p>
          </div>
        }
        <div ref={scrollable} className="genresection">

          <svg id="toLeft" onClick={()=>scrollIt(false)} width="48" height="48" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M23 46C16.9 46 11.0499 43.5768 6.73654 39.2635C2.42321 34.9501 1.47745e-06 29.1 2.01072e-06 23C2.544e-06 16.9 2.42321 11.0499 6.73655 6.73654C11.0499 2.4232 16.9 -2.544e-06 23 -2.01072e-06C29.1 -1.47745e-06 34.9501 2.42321 39.2635 6.73654C43.5768 11.0499 46 16.9 46 23C46 29.1 43.5768 34.9501 39.2635 39.2635C34.9501 43.5768 29.1 46 23 46V46ZM33.0625 24.4375C33.4438 24.4375 33.8094 24.286 34.079 24.0165C34.3486 23.7469 34.5 23.3812 34.5 23C34.5 22.6188 34.3486 22.2531 34.079 21.9835C33.8094 21.7139 33.4438 21.5625 33.0625 21.5625L16.4076 21.5625L22.5803 15.3927C22.7139 15.2591 22.8199 15.1004 22.8923 14.9258C22.9646 14.7512 23.0018 14.564 23.0018 14.375C23.0018 14.186 22.9646 13.9988 22.8923 13.8242C22.8199 13.6496 22.7139 13.4909 22.5803 13.3572C22.4466 13.2236 22.2879 13.1176 22.1133 13.0452C21.9387 12.9729 21.7515 12.9357 21.5625 12.9357C21.3735 12.9357 21.1863 12.9729 21.0117 13.0452C20.8371 13.1176 20.6784 13.2236 20.5448 13.3572L11.9198 21.9822C11.7859 22.1158 11.6797 22.2744 11.6072 22.4491C11.5347 22.6237 11.4974 22.8109 11.4974 23C11.4974 23.1891 11.5347 23.3763 11.6072 23.5509C11.6797 23.7256 11.7859 23.8842 11.9198 24.0177L20.5448 32.6427C20.6784 32.7764 20.8371 32.8824 21.0117 32.9548C21.1863 33.0271 21.3735 33.0643 21.5625 33.0643C21.7515 33.0643 21.9387 33.0271 22.1133 32.9548C22.2879 32.8824 22.4466 32.7764 22.5803 32.6427C22.7139 32.5091 22.8199 32.3504 22.8923 32.1758C22.9646 32.0012 23.0018 31.814 23.0018 31.625C23.0018 31.436 22.9646 31.2488 22.8923 31.0742C22.8199 30.8996 22.7139 30.7409 22.5803 30.6072L16.4076 24.4375L33.0625 24.4375Z" fill="#CCFF00"/>
          </svg>

          <svg id="toRight" onClick={()=>scrollIt(true)} width="48" height="48" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M23 0C29.1 0 34.9501 2.42321 39.2635 6.73654C43.5768 11.0499 46 16.9 46 23C46 29.1 43.5768 34.9501 39.2635 39.2635C34.9501 43.5768 29.1 46 23 46C16.9 46 11.0499 43.5768 6.73654 39.2635C2.42321 34.9501 0 29.1 0 23C0 16.9 2.42321 11.0499 6.73654 6.73654C11.0499 2.42321 16.9 0 23 0V0ZM12.9375 21.5625C12.5563 21.5625 12.1906 21.714 11.921 21.9835C11.6515 22.2531 11.5 22.6188 11.5 23C11.5 23.3812 11.6515 23.7469 11.921 24.0165C12.1906 24.2861 12.5563 24.4375 12.9375 24.4375H29.5924L23.4197 30.6072C23.2861 30.7409 23.1801 30.8996 23.1077 31.0742C23.0354 31.2488 22.9982 31.436 22.9982 31.625C22.9982 31.814 23.0354 32.0012 23.1077 32.1758C23.1801 32.3504 23.2861 32.5091 23.4197 32.6428C23.5534 32.7764 23.7121 32.8824 23.8867 32.9548C24.0613 33.0271 24.2485 33.0643 24.4375 33.0643C24.6265 33.0643 24.8137 33.0271 24.9883 32.9548C25.1629 32.8824 25.3216 32.7764 25.4553 32.6428L34.0803 24.0178C34.2141 23.8842 34.3203 23.7256 34.3928 23.5509C34.4653 23.3763 34.5026 23.1891 34.5026 23C34.5026 22.8109 34.4653 22.6237 34.3928 22.4491C34.3203 22.2744 34.2141 22.1158 34.0803 21.9822L25.4553 13.3572C25.3216 13.2236 25.1629 13.1176 24.9883 13.0452C24.8137 12.9729 24.6265 12.9357 24.4375 12.9357C24.2485 12.9357 24.0613 12.9729 23.8867 13.0452C23.7121 13.1176 23.5534 13.2236 23.4197 13.3572C23.2861 13.4909 23.1801 13.6496 23.1077 13.8242C23.0354 13.9988 22.9982 14.186 22.9982 14.375C22.9982 14.564 23.0354 14.7512 23.1077 14.9258C23.1801 15.1004 23.2861 15.2591 23.4197 15.3928L29.5924 21.5625H12.9375Z" fill="#CCFF00"/>
          </svg>
          
            {load ? <img id='spinner' src={Loader} alt="loading" />
            : error ? <p id='errormessage'>Something went Wrong</p>
            : movieMap}

        </div>

      </div>
      
    </div>
  )
}
