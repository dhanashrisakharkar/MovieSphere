import "../css/ForgetPassword.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../component/navbar";
import regex from "../data/regex";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useLocation } from "react-router-dom";

function ForgetPassword() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [emailVerified, setEmailVerified] = useState(!!email);
  const [useEmailID, setEmailID] = useState(email || "");
  const [showHint, setShowHint] = useState(false);
  const [errors, setErrors] = useState({
    password: "",
    confirmPassword: "",
    email: "",
  });

  async function handleSubmit(e) {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/resetPassword" , {
      method :'Post',
      headers:{
        "content-type" : "Application/json"
      },
      body : JSON.stringify({password : password , email : useEmailID})
    })
    const data = await response.json();
    if (!response.ok) {
      alert(data.message);
      return;
    }
    navigate("/");

    
  }

  async function handleEmailSubmit(e) {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/emailVerification", {
      method: "Post",
      headers: {
        "Content-type": "Application/json",
      },
      body: JSON.stringify({email : useEmailID})
    });
    const data = await response.json();
    if (!response.ok) {
      alert(data.message);
      return;
    }
    setEmailVerified(true);
  }

  function verifyRegexPattern(name, value) {
    if (regex[name].test(value)) {
      setErrors({ ...errors, [name]: "" });
    } else if (!regex[name].test(value) && value !== "") {
      setErrors({
        ...errors,
        [name]: `please enter valid ${name}`,
      });
    } else {
      setErrors({ [name]: "" });
    }
  }

  function handleOnChange(e) {
    setPassword(e.target.value);
    verifyRegexPattern(e.target.name, e.target.value);
  }

  function handleOnEmailChange(e) {
    setEmailID(e.target.value);
    verifyRegexPattern(e.target.name, e.target.value);
  }

  return !emailVerified ? (
    <>
      <Navbar />
      <main className="forget-Page">
        <section className="forgetPage-Card">
          <h1>Password Reset</h1>
          <p className="title">Please Enter Your Email ID!</p>
          <form onSubmit={handleEmailSubmit}>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              onChange={handleOnEmailChange}
            />
            <div className="fieldContainer">
              <p className="errorMessage">{errors.email}</p>
            </div>
            <button type="submit" className="confirmButton">
              Reset Password ➜
            </button>
          </form>
        </section>
      </main>
    </>
  ) : (
    <>
      <Navbar />
      <main className="forget-Page">
        <section className="forgetPage-Card">
          <h1>Forget Password</h1>
          <p className="title">Please update your new Password!</p>
          <form onSubmit={handleSubmit}>
            <div className="passwordField">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="enter a password"
                onChange={handleOnChange}
                onFocus={() => setShowHint(true)}
                onBlur={() => setShowHint(false)}
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
            {showHint && password && errors.password && (
              <div className="password-hints">
                <div className="password-hint">
                  Password must contain :<strong> 8+ characters</strong>,
                  <strong> 1 uppercase letter</strong>,
                  <strong> 1 lowercase letter</strong>,
                  <strong> 1 number</strong>
                  <strong> and 1 special character</strong>.
                </div>
              </div>
            )}
            <div className="passwordField">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="confirm password"
                onChange={handleOnChange}
              ></input>
              <span
                className="showEye"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
              <div className="fieldContainer">
                <p className="errorMessage">{errors.confirmPassword}</p>
              </div>
            </div>
            <button type="submit" className="confirmButton">
              Confirm
            </button>
          </form>
        </section>
      </main>
    </>
  );
}

export default ForgetPassword;
