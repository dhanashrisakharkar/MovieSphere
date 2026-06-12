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

    if(!existingUser){
        return res.status(400).json({
            message:"user not found"
        })
    }

    if(existingUser.password !== user.password){
        return res.status(400).json({
            message:"invalid password"
        })
    }

    return req.json({
        message : "login successfull",
        user : existingUser
    })
  } catch (error) {
    console.log(error);
    res.status(500).send("something went wrong");
  }
});

module.exports = router;