const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const User = require("../model/user");

router.post("/login", async (req, res) => {
  try {
    console.log(req.body);
    const user = new User(req.body);
    const existingUser = await User.findOne({
      email: req.body.email,
    });

    if (!existingUser) {
      return res.status(400).json({
        message: "user not found",
      });
    }

    if (existingUser.password !== user.password) {
      return res.status(400).json({
        message: "invalid password",
      });
    }

    return res.json({
      message: "login successfull",
      user: existingUser,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "something went wrong",
    });
  }
});

module.exports = router;
