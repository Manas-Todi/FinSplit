const User = require("../models/User");

const jwt = require("jsonwebtoken");

// generate JWT token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {expiresIn: "1h"});
};

// Register user(signup)
exports.registerUser = async (req, res) => {
    const { fullName, email, password, profileImageUrl } = req.body;

    //validate input
    if (!fullName || !email || !password) {
        return res.status(400).json({ message: "Please fill all fields" });
    }

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "email already exists" });
        }

        //create new user
        const user = await User.create({
            fullName,
            email,
            password,
            profileImageUrl,
        });

        //generate token
        res.status(201).json({
            _id: user._id,
            user,
            token: generateToken(user._id),
        });
    }
    catch (error) {
        res.status(500).json({ message: "Error registering user", error: error.message });
    }
};

// login user
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    //validate input    
    if (!email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user exists
    try{
        const user= await User.findOne({ email });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        res.status(200).json({
            _id: user._id,
            user,
            token: generateToken(user._id),
        });
    }
    catch (error) {
        res.status(500).json({ message: "Error logging in user", error: error.message });
    }
};

// get User info
exports.getUserInfo = async (req, res) => {
    try{
        const user = await User.findById(req.user._id).select("-password");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(user);

    }catch(error) {
        res.status(500).json({ message: "Error fetching user info", error: error.message });
    }
};