import "../css/HeroBanner.css";
import { useEffect, useState, useRef } from "react";
// import movies from "../data/movies";
import { API_KEY } from "../api/tmdb";

function HeroBanner({ movie }) {
  const [showTrailer, setShowTrailer] = useState(false);
  const [trailerUrl, setTrailerUrl] = useState("");
  const [trailekey , setTrailerKey] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTrailer(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!movie?.id) return;

    fetch(
      `https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=${API_KEY}`,
    )
      .then((res) => res.json())
      .then((data) => {
        const trailer = data.results.find((video) => video.type === "Clip");
        setTrailerUrl(`https://www.youtube.com/embed/${trailer.key}`);
        setTrailerKey(trailer.key);
        console.log(data);
      });
  }, [movie]);

  return (
    <>
      <main className="hero-banner">
        <section className="overlay">
          {/* <h1>{movie.title}</h1> */}
          {/* <p>{movie.description}</p> */}
          {!showTrailer ? (
            <img
              // src={movie.banner}
              src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
              alt={movie.title}
              className="banner-image"
            ></img>
          ) : (
            // <button onClick={() => setShowTrailer(true)}>▶ Play</button>
            <div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              {/* <video
                autoPlay
                muted
                loop
                playsInline
                className="banner-video"
                onLoadedMetadata={(e) => {
                  e.target.currentTime = 4;
                }}
              > */}
                {/* <source src={movie.trailerUrl} type="video/mp4" /> */}
               
              {/* </video> */}
               <iframe
                  src={`${trailerUrl}?autoplay=1&mute=1&loop=1&playlist=${trailekey}`}
                  className="banner-video"
                  title="YouTube video player"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerpolicy="strict-origin-when-cross-origin"
                  allowfullscreen
                  onLoadedMetadata={(e) => {
                  e.target.currentTime = 4;
                }}
                ></iframe>
            </div>
          )}
        </section>
      </main>
    </>
  );
}

export default HeroBanner;
