import HeroImage from '/hero_image.png'

export default function Hero() {

    const style = {
        width: "100%",
        position: "relative",
        height: "600px",
        backgroundImage:`linear-gradient(to bottom, transparent, #12130C 90%), url(${HeroImage})`,
        backgroundSize: "cover",
        backgroundPosition: "left top",
    }

    const style2 = {
        position: "absolute",
        display: "flex",
        width: "80%",
        margin: "auto",
        top: "60%",
        left: "50%",
        transform: "translate(-50%)",
        justifyContent: "space-between",
    }

  return (
    <div className='heroSection' style={style}>
        <div className="heroContainer" style={style2}>
            <div className="heroInfo">
                <h1>Black Adam</h1>
                <p><span>8.2</span> 8.256 / 2369 votes     160 mins   -   Action, Drama, Adventure    -   2022</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing 
                    elit, sed do eiusmod tempor incididunt ut labore 
                    et dolore magna aliqua. Ut enim ad minim veniam, 
                    quis nostrud exercitation ullamco laboris nisi ut 
                    aliquip...
                </p>
                <button id='btnDetails'>Details</button><button id='btnAddToWatchlist'>Watchlist</button>
            </div>
            <iframe width="360" height="215" src="https://www.youtube.com/embed/mkomfZHG5q4?rel=0&modestbranding=0&autohide=1&mute=0&showinfo=0&controls=0&autoplay=0" title="YouTube video player" frameBorder="0" allowFullScreen>

            </iframe>

            {/* <video width="320" height="240">
                <source type='video/youtube' src='https://www.youtube.com/watch?v=mkomfZHG5q4' />
            </video> */}
        </div>
    </div>
  )

}