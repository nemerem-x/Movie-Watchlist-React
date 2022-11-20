import '../style/Trending.css'
import Movie from './Movie'

export default function Trending() {


  return (
    <div className="trending">
      <div className="trendingcontainer">
        <h1>Trending</h1>

        <div className="trendingsection">
        <Movie/>
        <Movie/>
        <Movie/>
        <Movie/>
        <Movie/>
        <Movie/>
        <Movie/>
        </div>
      </div>
    </div>
  )
}
