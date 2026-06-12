const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const User = require("../model/user");

router.post("/emailVerification", async (req, res) => {

//   console.log(req.body);
  const user = new User(req.body);

  const existingUser = await User.findOne({
    email: req.body.email,
  });
  if (!existingUser) {
    return res.status(400).json({
      message: "user not found",
    });
  }
  return res.json({
    message: "Email Verified",
  });
});

router.post("/resetPassword", async (req, res) => {

  console.log(req.body);
  const user = new User(req.body);

  const existingUser = await User.findOne({
    email: req.body.email,
  });

  console.log(existingUser);
  if (!req.body.password) {
    return res.status(400).json({
      message: "please enter a a password",
    });
  }
  user.password = req.body.password;
  await user.save();
  return res.json({
    message: "Password Update Sucesssfully",
  });
});


module.exports = router;