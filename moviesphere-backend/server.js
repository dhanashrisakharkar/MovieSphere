const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const signupRoute = require("./routes/signup");
const loginRoute = require("./routes/login");
const forgetPassword = require("./routes/forgetPassword");

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(
    "mongodb+srv://dhanashrisakharkar333_db_user:Dhanashri999@cluster0.jwjx9uv.mongodb.net/?appName=Cluster0",
  )
  .then(() => {
    console.log("Moongose Connected");
  })
  .catch((err) => {
    console.log(err);
  });


app.use(signupRoute);
app.use(loginRoute);
app.use(forgetPassword);

// app.get("/users", async (req, res) => {
//   const users = await User.find();

//   console.log(users);
//   res.json(users);
// });

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
