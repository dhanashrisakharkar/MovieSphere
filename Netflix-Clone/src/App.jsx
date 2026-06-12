import { BrowserRouter, Routes, Route } from "react-router-dom";
import MovieCard from "./component/MovieCard.jsx";
// import movies from "./data/movies.js";
import SearchBar from "./component/SearchBar.jsx";
import { useState } from "react";
import { filterMovie } from "./utils/movieHelper.js";
import Login from "./pages/Login.jsx";
import Signup from "./pages/SignUp.jsx";
import Home from "./pages/Home.jsx";
import ForgetPassword from "./pages/ForgetPassword.jsx";
import { Navigate } from "react-router-dom";
// import Payment from "./pages/Payment.jsx";
// import Profile from "./pages/Profile.jsx";

function App() {
  const [search, setSearch] = useState("");
  const result = useState("");
  const currentUser =
    JSON.parse(localStorage.getItem("currentUser")) ||
    JSON.parse(sessionStorage.getItem("currentUser"));
  // const moviesList = filterMovie(movies, search);

  return (
    <>
      <BrowserRouter basename="/MovieSphere">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/ForgetPassword" element={<ForgetPassword />} />
          <Route path="/Home" element={currentUser ? <Home /> : <Navigate to={"/"} />} />
          {/* <Route path="/profile" element={<Profile />} />
          <Route path="/payment" element={<Payment />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
