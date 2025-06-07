
const jwt = require("jsonwebtoken");

// generate JWT token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {expiresIn: "1h"});
};

// Register user
exports.registerUser = async (req, res) => {};

// login user
exports.loginUser = async (req, res) => {};

// getUser user
exports.getUserInfo = async (req, res) => {};