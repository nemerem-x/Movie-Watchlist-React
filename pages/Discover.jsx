import '../style/Discover.css'
import Movie from "../components/Movie"
import { discoverData } from '../src/reactQueries'
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Loader from '/loading.svg'
import Category from '../components/Category'


export default function Discover() {

  const params = useParams()
  const navigate = useNavigate()

  const {data, isLoading, isError} = discoverData(params.page < 1 ? 1 : params.page)

  const discover = data?.results.map(movie => {
    return <Movie key={movie.id} movie={movie}/>
  })

  const next = () => {
    navigate(`/discover/${data?.page + 1}`)
  }

  const prev = () => {
    if(data?.page >= 2){
      navigate(`/discover/${data?.page - 1}`)
    }
  }

  return (
    <>
      <div className='discover'>
        <h1>Discover Movies</h1>

          {isLoading ? 
            <div className="spinnerbox">
              <img id='spinner' src={Loader} alt="loading" />
            </div> 
          : isError ? <p id='errormessage'>Something went wrong</p>
          :
            <div className="discovermovies">
              {discover}
            </div>
          }

        <div className="paginationbox">
          <div className="pagination">

            <div className="prev" onClick={prev}>
                <svg width="12" height="8" viewBox="0 0 14 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6.99999 8.47077C6.84443 8.47077 6.69393 8.4416 6.54849 8.38327C6.40226 8.32493 6.28054 8.24716 6.18332 8.14993L0.816652 2.78327C0.602763 2.56938 0.495819 2.29716 0.495819 1.9666C0.495819 1.63605 0.602763 1.36382 0.816652 1.14993C1.03054 0.936046 1.30276 0.829102 1.63332 0.829102C1.96387 0.829102 2.2361 0.936046 2.44999 1.14993L6.99999 5.69993L11.55 1.14993C11.7639 0.936046 12.0361 0.829102 12.3667 0.829102C12.6972 0.829102 12.9694 0.936046 13.1833 1.14993C13.3972 1.36382 13.5042 1.63605 13.5042 1.9666C13.5042 2.29716 13.3972 2.56938 13.1833 2.78327L7.81665 8.14993C7.69999 8.2666 7.5736 8.34905 7.43749 8.39727C7.30137 8.44627 7.15554 8.47077 6.99999 8.47077Z" fill="#DBDBDB"/>
                </svg>
              <p>Prev</p>
            </div>

            <div className="numbers">
              { data?.page > 1 && <p>{data?.page - 1}</p>}
              <p style={{color: "#CCFF00"}}>{data?.page}</p>
              <p>{data?.page + 1}</p>
              { data?.page === 1 && <p>{data?.page + 2}</p>}
            </div>

            <div className="next" onClick={next}>
              <p>Next</p>
              <svg width="12" height="8" viewBox="0 0 14 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.99999 8.47077C6.84443 8.47077 6.69393 8.4416 6.54849 8.38327C6.40226 8.32493 6.28054 8.24716 6.18332 8.14993L0.816652 2.78327C0.602763 2.56938 0.495819 2.29716 0.495819 1.9666C0.495819 1.63605 0.602763 1.36382 0.816652 1.14993C1.03054 0.936046 1.30276 0.829102 1.63332 0.829102C1.96387 0.829102 2.2361 0.936046 2.44999 1.14993L6.99999 5.69993L11.55 1.14993C11.7639 0.936046 12.0361 0.829102 12.3667 0.829102C12.6972 0.829102 12.9694 0.936046 13.1833 1.14993C13.3972 1.36382 13.5042 1.63605 13.5042 1.9666C13.5042 2.29716 13.3972 2.56938 13.1833 2.78327L7.81665 8.14993C7.69999 8.2666 7.5736 8.34905 7.43749 8.39727C7.30137 8.44627 7.15554 8.47077 6.99999 8.47077Z" fill="#DBDBDB"/>
              </svg>
            </div>

          </div>
        </div>
      </div>
      <Category/>
    </>
  )
}
