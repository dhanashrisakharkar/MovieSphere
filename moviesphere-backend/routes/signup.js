const express = require("express");
const mongoose = require("mongoose");
const router =  express.Router();
const User = require("../model/user");

router.post("/signup" , async (req , res) => {
     try {
    console.log(req.body);
    const user = new User(req.body);
    const existingUser = await User.findOne({
      email: req.body.email,
    });

    if (existingUser) {
      return res.status(400).json({
        message: "email is already registered",
      });
    } else {
      await user.save();
      return res.json({
        message : "user registered successfully"
      })
    }
    console.log(user);
  } catch (err) {
    console.log(err);
    res.status(500).send("something went wrong");
  }
})

module.exports = router;