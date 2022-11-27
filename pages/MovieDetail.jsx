import '../style/MovieDetail.css'
import { useParams } from 'react-router-dom'

export default function MovieDetail() {

    const params = useParams()

    return (
    <div className='MovieDetail'>
        <div className="MovieDetailBox">
            <div className="detailLeft">
                <p>8.2</p>
                <h2>Black Adam</h2>
                <p>160 mins - Action, Drama, Adventure - 2022</p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur 
                    adipiscing elit, sed do eiusmod tempor incididunt
                     ut labore et dolore magna aliqua. Ut enim ad minim
                      veniam, quis nostrud exercitation ullamco laboris
                       nisi ut aliquip...

                    Lorem ipsum dolor sit amet, consectetur adipiscing
                     elit, sed do eiusmod tempor incididunt ut labore 
                     et dolore magna aliqua. Ut enim ad minim veniam, 
                     quis nostrud exercitation ullamco laboris nisi ut
                    aliquip...
                </p>
                <div className="detailLeftInteraction">
                    <button>Trailer</button>
                </div>
            </div>

            <div className="detailRight">

            </div>
        </div>

        <div className="reviewBox">
            <h1>Reviews</h1>
            <div className="review">
                <div className="reviews">
                    <p>Jogn7689</p>
                    <p>
                        Lorem ipsum dolor sit amet, 
                        consectetur adipiscing elit, sed do 
                        eiusmod tempor incididunt ut labore et 
                        dolore magna aliqua
                    </p>
                </div>

                <div className="reviews">
                    <p>Jogn7689</p>
                    <p>
                        Lorem ipsum dolor sit amet, 
                        consectetur adipiscing elit, sed do 
                        eiusmod tempor incididunt ut labore et 
                        dolore magna aliqua
                    </p>
                </div>
            </div>
        </div>
    </div>
  )
}
