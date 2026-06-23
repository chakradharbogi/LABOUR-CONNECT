const express = require("express");
const router = express.Router();

const User = require("../models/User");


// ====================================
// REGISTER USER
// ====================================
router.post("/register", async (req, res) => {

  try {

    const {

      name,

      phone,

      role,

      location,

      skill

    } = req.body;

    const existingUser = await User.findOne({
      phone
    });

    if (existingUser) {

      return res.status(400).json({
        message: "User already exists"
      });

    }

    const user = new User({

      name,
      phone,
      role,
      location,
      skill

    });

    await user.save();

    res.status(201).json({

      message: "User registered successfully",

      user

    });

  }

  catch (error) {

    res.status(500).json({

      message: error.message

    });

  }

});


// ====================================
// LOGIN USER
// ====================================
router.post("/login", async (req, res) => {

  try {

    const { phone } = req.body;

    const user = await User.findOne({

      phone

    });

    if (!user) {

      return res.status(404).json({

        message: "User not found"

      });

    }

    res.status(200).json({

      message: "Login successful",

      user

    });

  }

  catch (error) {

    res.status(500).json({

      message: error.message

    });

  }

});


// ====================================
// RATE USER
// ====================================
router.put("/rate/:userId", async (req, res) => {

  try {

    const { userId } = req.params;

    const { rating } = req.body;

    const user = await User.findById(userId);

    if (!user) {

      return res.status(404).json({

        message: "User not found"

      });

    }

    // initialize values if missing
    if (user.rating == null) {

      user.rating = 0;

    }

    if (user.totalRatings == null) {

      user.totalRatings = 0;

    }

    const totalScore =

      user.rating * user.totalRatings;

    user.totalRatings += 1;

    user.rating =

      (totalScore + Number(rating))

      /

      user.totalRatings;

    await user.save();

    res.status(200).json({

      message: "User rated successfully",

      user

    });

  }

  catch (error) {

    console.log(error);

    res.status(500).json({

      message: error.message

    });

  }

});
// ====================================
// GET USER PROFILE
// ====================================
router.get("/:userId", async (req, res) => {

  try {

    const user = await User.findById(
      req.params.userId
    );

    if (!user) {

      return res.status(404).json({
        message: "User not found"
      });

    }

    res.status(200).json(user);

  }

  catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

});
module.exports = router;