const regex = {
    "firstName" : /^[A-Za-z]+$/,
    "lastName" : /^[A-Za-z]+$/,
    "email" : /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    "password" : /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/,
    "confirmPassword" : /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/
}

export default regex;