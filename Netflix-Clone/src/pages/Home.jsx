import "../css/Home.css";
import MovieCard from "../component/MovieCard";
// import movies from "../data/movies";
import HeroBanner from "../component/HeroBanner";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { API_KEY } from "../api/tmdb";
import MyNetflix from "./MyNetflix";

function Home() {
  const [showMenu, setShowMenu] = useState(false);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
       setMovies(data.results);
      })
      .then((data) => console.log(data));
  }, []);
  return (
    <>
      <nav className="navbar">
        <h1 className="logo">Netflix</h1>

        <div className="navLinks">
          <button>Home</button>
          <button onClick={() => setShowMenu(!showMenu)}>My Netflix</button>
          {showMenu && ( 
           <MyNetflix />
          )}
        </div>
      </nav>

      <main className="homePage">
        <section className="heroSection">
          {movies.length > 0 && ( <HeroBanner movie={movies[4]} />)}
        </section>

        <section className="moviesCard">
          {/* <h2>Trending Now</h2> */}

          {/* <div className="movieRow"> */}
          <motion.div
            className="movieRow"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            {movies.length > 0 && (movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            )))}
          </motion.div>
          {/* </div> */}
        </section>
      </main>
    </>
  );
}

export default Home;
