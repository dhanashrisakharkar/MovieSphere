import "../css/Login.css";
import Navbar from "../component/navbar";
import { Link } from "react-router-dom";
import { useState } from "react";
import regex from "../data/regex";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import loginBg from "../assets/Login6.jpg";

function Login() {
  const navigate = useNavigate();
  const [userformData, setUserFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    let users = JSON.parse(localStorage.getItem("users")) || [];
    let currentUser;

    if (users.length) {
      currentUser = users.find((a) => {
        return (
          userformData.email === a.email && userformData.password === a.password
        );
      });
      currentUser ? navigate("/Home") : alert("please enter valid details");
    }
    if (currentUser && rememberMe) {
      localStorage.setItem(JSON.stringify(currentUser));
    } else {
      sessionStorage.setItem(JSON.stringify(currentUser));
    }
  }

  function handleOnChange(e) {
    const updateUserFormData = {
      ...userformData,
      [e.target.name]: e.target.value,
    };
    setUserFormData(updateUserFormData);

    if (regex[e.target.name].test(e.target.value)) {
      setErrors({ ...errors, [e.target.name]: "" });
    } else if (
      !regex[e.target.name].test(e.target.value) &&
      e.target.value !== ""
    ) {
      setErrors({
        ...errors,
        [e.target.name]: `please add valid ${e.target.name}`,
      });
    } else {
      setErrors({ errors, [e.target.name]: "" });
    }
  }
  return (
    <>
      <Navbar />
      <main className="login-page">
        <section className="login-card">
          <h2 className="signin">Sign in</h2>
          <p className="subtitle">Welcome back! Please sign in to continue</p>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              onChange={handleOnChange}
            ></input>
            <div className="fieldContainer">
              <p className="errorMessage">{errors.email}</p>
            </div>
            <div className="passwordField">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter Password"
                onChange={handleOnChange}
              ></input>
              <span
                className="showEye"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
              <div className="fieldContainer">
                <p className="errorMessage">{errors.password}</p>
              </div>
            </div>
            <div className="options">
              <label className="remember">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={() => {
                    setRememberMe(!rememberMe);
                  }}
                ></input>
                Remember me
              </label>
              <Link to={"/ForgetPassword"} state={{ email: userformData.email }}> Forget Password</Link>
            </div>
            <button type="submit" className="loginButton">
              Login
            </button>
            <p className="subtitle">
              Don't have an account! <Link to="/signup">Register</Link>
            </p>
          </form>
        </section>
      </main>
    </>
  );
}

export default Login;
