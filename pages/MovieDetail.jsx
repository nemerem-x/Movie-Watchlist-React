import '../style/MovieDetail.css'
import { useParams } from 'react-router-dom'
import { movieFullData } from '../src/reactQueries'


export default function MovieDetail() {
    
    const params = useParams()

    const {data, isLoading, isError} = movieFullData(params.id)

    console.log(data)

    return (
    <div className='MovieDetail'>
        <div className="MovieDetailBox">
            <div className="detailLeft">
                <p>8.2</p>
                <h2>{data?.original_title}</h2>
                <p>{data?.runtime} mins - {data.genres.map(item => item.name).join(", ")} - {data?.release_date.slice(0,4)}</p>
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
                    <button>
                        <svg width="12" height="15" viewBox="0 0 12 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1.80741 14.7915C1.41235 15.0537 1.01215 15.0686 0.606815 14.8363C0.202272 14.6047 0 14.2469 0 13.7628V1.23751C0 0.753443 0.202272 0.395231 0.606815 0.162877C1.01215 -0.0686696 1.41235 -0.0533406 1.80741 0.208864L11.4667 6.47152C11.8222 6.71356 12 7.05644 12 7.50017C12 7.9439 11.8222 8.28678 11.4667 8.52882L1.80741 14.7915Z" fill="#42443C"/>
                        </svg>
                        Trailer
                    </button>
                    <svg id='add' width="29" height="29" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.2257 1.25269H21.9715C26.9421 1.25269 30.9715 5.28212 30.9715 10.2527V22C30.9715 26.9706 26.9421 31 21.9715 31H10.2257C5.25515 31 1.22571 26.9706 1.22571 22V10.2527C1.22571 5.28212 5.25515 1.25269 10.2257 1.25269Z" stroke="white" strokeWidth="2"/>
                        <path d="M16.442 15.4323V10.2709H15.1447V15.4323H10.6041V16.907H15.1447V22.0685H16.442V16.907H20.9826V15.4323H16.442Z" fill="white"/>
                    </svg>
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
