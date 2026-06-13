import "../css/MovieCard.css";
import { useState, useEffect, useRef } from "react";
import { API_KEY } from "../api/tmdb";

function MovieCard({ movie }) {
  const [hovered, setHovered] = useState(false);
  const videoRef = useRef(null);
  const timerRef = useRef(null);
  const [trailerUrl, setTrailerUrl] = useState("");

  const handleEnter = async () => {
    timerRef.current = setTimeout(() => {
      setHovered(true);
    }, 1000);

    // const res = await fetch(
    //   `https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=${API_KEY}`,
    // );

    const res = await fetch(`https://moviesphere-1.onrender.com/recommendations`);

    const data = await res.json();

    const trailer =
      data.results.find((v) => v.type === "Trailer") ||
      data.results.find((v) => v.type === "Teaser") ||
      data.results.find((v) => v.site === "YouTube") ||
      data.results.find((v) => v.site === "Clip") ||
      data.results[0];

    if (trailer) {
      setTrailerUrl(
        `https://www.youtube.com/embed/${trailer.key}?autoplay=1&mute=1`,
      );
    }
  };

  const handleLeave = () => {
    clearTimeout(timerRef.current);
    setHovered(false);
  };
  return (
    <>
      <div
        className="movieCard"
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
      >
        <img
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          alt={movie.title}
        ></img>
        {hovered && trailerUrl && (
          <div className="moviePopup">
            <iframe
              src={trailerUrl}
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
            <div className="popup-info">
              <h3>{movie.title}</h3>
              <button>▶ Play</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default MovieCard;
