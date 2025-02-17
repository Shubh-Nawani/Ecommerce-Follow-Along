// /controllers/profileController.js
const Profile = require("../models/profileModel");

const getProfile = async (req, res) => {
  try {
    // Assuming userId comes from the authenticated user (session or JWT)
    const profile = await Profile.findOne({ userId: req.userId });

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.status(200).json(profile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching profile data" });
  }
};

const addAddress = async (req, res) => {
  const { userId, address } = req.body;

  try {

    const newProfile = new Profile({
        userId,
        address
    })

    await newProfile.save()


    res.status(200).json({ message: "Address added successfully", address});
  } catch (error) {
    console.error(error);
    res.status(500).json({error: error.message});
  }
};

module.exports = { getProfile, addAddress };
