import "../css/Home.css";
import MovieCard from "../component/MovieCard";
// import movies from "../data/movies";
import HeroBanner from "../component/HeroBanner";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { API_KEY } from "../api/tmdb";
import MyNetflix from "./MyNetflix";
import { useNavigate } from "react-router-dom";

function Home() {
  const [showMenu, setShowMenu] = useState(false);
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`)
    fetch(`http://localhost:5000/recommendations`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setMovies(data.data);
      })
      .then((data) => console.log(data));
  }, []);

  useEffect(() => {
    const currentUser =
      JSON.parse(localStorage.getItem("currentUser")) ||
      JSON.parse(sessionStorage.getItem("currentUser"));

    if (!currentUser) {
      navigate("/");
    }
  }, []);
  return (
    <>
      <nav className="navbar">
        <h1 className="logo">Netflix</h1>

        <div className="navLinks">
          <button>Home</button>
          <button onClick={() => setShowMenu(!showMenu)}>My Netflix</button>
          {showMenu && <MyNetflix />}
        </div>
      </nav>

      <main className="homePage">
        <section className="heroSection">
          {movies.length > 0 && <HeroBanner movie={movies[1]} />}
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
            {movies.length > 0 &&
              movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
          </motion.div>
          {/* </div> */}
        </section>
      </main>
    </>
  );
}

export default Home;
