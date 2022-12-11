import '../style/SearchResult.css'
import { useNavigate } from 'react-router-dom'
import Loader from '/loading.svg'


export default function SearchResult({data, isLoading, isError, setSearchResultModal}) {

    const navigate = useNavigate()

    const result = data?.results?.slice(0,5).map(item => {

        const seeMovie = () => {
            navigate(`movie/${item.id}`)
            setSearchResultModal(false)
        }

        return (
            <div onClick={seeMovie} className="result" key={item?.id}>
                <img src={`https://image.tmdb.org/t/p/w500${item?.poster_path}`} alt="poster" />
                <div className="resultinfo">
                    <h2>{item?.original_title} </h2>
                    <p>{item?.release_date.slice(0,4)}</p>
                    <p>vote average: <span>{item?.vote_average}</span></p>
                </div>
            </div>
        )
    })

  return (

        <div className="searchresults">
            
            { isLoading ? <img id='spinner' src={Loader} alt="loading" /> 
            : isError ? <p id='errormessage'>Something went wrong</p>
            : result}

        </div>

  )
}
