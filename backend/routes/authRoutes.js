const express = require("express");
const {protect} = require("../middleware/authMiddleware.js");
const upload = require("../middleware/uploadMiddleware.js");

const {
    registerUser,
    loginUser,
    getUserInfo,
} = require("../controllers/authController.js");

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/getUser", protect, getUserInfo);

router.post("/upload-image", upload.single("image"), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
    }

    // Assuming the image is stored in a directory called 'uploads'
    const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
    res.status(200).json({ imageUrl });
});

module.exports = router;