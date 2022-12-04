import '../style/SearchResult.css'
import { useNavigate } from 'react-router-dom'


export default function SearchResult({data, isLoading, isError}) {

    const navigate = useNavigate()

    const result = data?.results?.slice(0,5).map(item => {

        const seeMovie = () => {
            navigate(`movie/${item.id}`)
        }

        return (
            <div onClick={seeMovie} className="result" key={item?.id}>
                <img src="" alt="" />
                <div className="resultinfo">
                    <h2>{item?.original_title} </h2>
                    <p>{item?.release_date.slice(0,4)}</p>
                    <p>vote average: <span>{item?.vote_average}</span></p>
                </div>
            </div>
        )
    })

    if(isLoading) {
        return <img id='spinner' src={Loader} alt="loading" />
    }

    if(isError) {
        return <p id='errormessage'>Somthing went wrong</p>
    }

  return (
    <div className="searchmodal">

        <div className="searchresults">
            
            {result}
            {/* <div className="result">
                <img src="" alt="" />
                <div className="resultinfo">
                    <h2>Black </h2>
                    <p>$200m</p>
                    <p>maybe genre here</p>
                </div>
            </div>

            <div className="result">
                <img src="" alt="" />
                <div className="resultinfo">
                    <h2>Black </h2>
                    <p>$200m</p>
                    <p>maybe genre here</p>
                </div>
            </div> */}
        </div>

    </div>
  )
}
