import HeroImage from '/hero_image.png'
import { useMediaQuery } from 'react-responsive'

export default function Hero() {

    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1000px)' })

    const style = {
        display: "flex",
        flexDirection: isTabletOrMobile ? "column" : "row",
        width: "100%",
        position: "relative",
        height: "600px",
        marginBottom: "5em",
    }

    const style2 = {
        position: "relative",
        display: "flex",
        gap: isTabletOrMobile ? "2em" : "0",
        flexDirection: isTabletOrMobile ? "column" : "row",
        alignItems: isTabletOrMobile ? "center" : "none",
        width: "100%",
        height: "100%",
        backgroundImage:`linear-gradient(to ${isTabletOrMobile ? "bottom" : "left"}, transparent, #12130C ${isTabletOrMobile ? "80%" : "70%"}), url(${HeroImage})`,
        backgroundSize: "cover",
        backgroundPosition: isTabletOrMobile ? "center center" : "left top",
        justifyContent: "space-between",
    }

  return (
    <div className='heroSection' style={style}>

        <div className="heroInfo">

            <div className="heroDetails">

            {/* <iframe width="360" height="215" src="https://www.youtube.com/embed/mkomfZHG5q4?rel=0&modestbranding=1&autohide=1&mute=0&showinfo=0&controls=0&autoplay=0" title="YouTube video player" frameBorder="0" allowFullScreen>
            </iframe> */}

                <h1>Black Adam</h1>
                <p><span>8.2</span> 8.256 / 2369 votes     160 mins   -   Action, Drama, Adventure    -   2022</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing 
                    elit, sed do eiusmod tempor incididunt ut labore 
                    et dolore magna aliqua. Ut enim ad minim veniam, 
                    quis nostrud exercitation ullamco laboris nisi ut 
                    aliquip...
                </p>
                <button id='btnDetails'>Trailer</button><button id='btnAddToWatchlist'>Watchlist</button>
            </div>

            
        </div>

        <div className="heroContainer" style={style2}></div>

    </div>
  )

}