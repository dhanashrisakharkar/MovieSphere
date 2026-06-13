const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const User = require("../model/user");
console.log("Movies route file loaded");
router.post("/recommendations", async (req, res) => {
  try {
    // const response =
    // await fetch("http://localhost:3000/recommendations", {
    //   method: "Post",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(req.body),
    // });
      console.log("Recommendations route hit");
    const response = await fetch("http://localhost:5000/recommendations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        selectedMovieIds: ["tt7414436"],
        limit: 10,
        page: 1,
        pageSize: 10,
      }),
    });
    console.log("Movies route loaded");
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Something went wrong",
    });
  }
});

module.exports = router;
