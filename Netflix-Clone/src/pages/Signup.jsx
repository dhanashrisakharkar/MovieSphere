import { Link } from "react-router-dom";
import "../css/SignUp.css";
import Navbar from "../component/navbar";
import { useState } from "react";
import regex from "../data/regex.js";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();
  const [userFormData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showHint, setShowHint] = useState(false);

  async function handleSubmit (e) {
    e.preventDefault();
    const finalObj = {};
    const users = JSON.parse(localStorage.getItem("users")) || [];
    if (
      regex.firstName.test(userFormData.firstName) &&
      regex.lastName.test(userFormData.lastName)
    ) {
      finalObj.firstName = userFormData.firstName;
      finalObj.lastName = userFormData.lastName;
    }
    if (regex.email.test(userFormData.email)) {
      finalObj.email = userFormData.email;
    }
    if (
      regex.password.test(userFormData.password) &&
      regex.password.test(userFormData.confirmPassword)
    ) {
      if (userFormData.password !== userFormData.confirmPassword) return;
      finalObj.password = userFormData.password;
      // finalObj.confirmPassword = userFormData.confirmPassword;
    }
    const response = await fetch("http://localhost:5000/signup" , {
      method : "POST",
      headers :{
        "Content-Type" : "Application/json",
      },
      body: JSON.stringify(userFormData)
    })
    const data = await response.json();
    console.log(data.message);

    if(!response.ok){
      alert("user is already registered");
      return;
    }
    navigate("/");
  };

  function handleOnChange(e) {
    const updateFormDate = { ...userFormData, [e.target.name]: e.target.value };
    setFormData(updateFormDate);
    if (regex[e.target.name].test(e.target.value)) {
      setErrors({
        ...errors,
        [e.target.name]: "",
      });
      // if (e.target.name === "password") {
      //   setShowHint(false);
      // }
    } else if (
      !regex[e.target.name].test(e.target.value) &&
      e.target.value !== ""
    ) {
      setErrors({
        ...errors,
        [e.target.name]: `please add valid ${e.target.name}`,
      });
      // if (e.target.name === "password") {
      //   setShowHint(true);
      // }
    } else {
      setErrors({
        ...errors,
        [e.target.name]: "",
      });
    }
    if (
      updateFormDate.confirmPassword &&
      updateFormDate.password !== updateFormDate.confirmPassword
    ) {
      setErrors({
        ...errors,
        confirmPassword: "Passwords do not match",
      });
    }
  }
  return (
    <>
      <Navbar />
      <main className="singupPage">
        <section className="singupCard">
          <h2>Register</h2>
          <p className="title">Hello , Please Register Your Account</p>

          <form className="formData" onSubmit={handleSubmit}>
            <div className="nameRow">
              <input
                type="text"
                name="firstName"
                placeholder="enter name"
                value={userFormData.firstName}
                onChange={handleOnChange}
              ></input>
              <input
                type="text"
                name="lastName"
                placeholder="enter surname"
                value={userFormData.lastName}
                onChange={handleOnChange}
              ></input>
            </div>
            {
              <div className="fieldContainer">
                <p
                  className={`errorMessage ${
                    errors.firstName
                      ? "leftError"
                      : errors.lastName
                        ? "rightError"
                        : ""
                  }`}
                >
                  {errors.firstName || errors.lastName}
                </p>
              </div>
            }
            <input
              type="email"
              name="email"
              placeholder="enter email id"
              value={userFormData.email}
              onChange={handleOnChange}
            ></input>
            {errors.email && (
              <div className="fieldContainer">
                <p className="errorMessage">{errors.email}</p>
              </div>
            )}
            <div className="passwordField">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="enter password"
                value={userFormData.password}
                onFocus={() => setShowHint(true)}
                onBlur={() => setShowHint(false)}
                onChange={handleOnChange}
              ></input>
              <span
                className="showEye"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
              {errors.password && (
                <div className="fieldContainer">
                  <p className="errorMessage">{errors.password}</p>
                </div>
              )}
              {showHint && userFormData.password && errors.password && (
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
            </div>
            <div className="passwordField">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="confirm password"
                value={userFormData.confirmPassword}
                onChange={handleOnChange}
              ></input>
              <span
                className="showEye"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
              {errors.confirmPassword && (
                <div className="fieldContainer">
                  <p className="errorMessage">{errors.confirmPassword}</p>
                </div>
              )}
            </div>
            <button type="submit" className="signupButton">
              Sign Up
            </button>
            <p className="loginLink">
              Already have an account?
              <Link to="/">Login</Link>
            </p>
          </form>
        </section>
      </main>
    </>
  );
}

export default Signup;
