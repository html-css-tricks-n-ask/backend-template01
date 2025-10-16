import express from "express";
import passport from "../middleware/googleAuth.js";


import generateToken from "../utils/genrateToken.js";

const router = express.Router();

router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get("/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    // Generate JWT for the user
    const token = generateToken(req.user._id);
    // Redirect to frontend with token and user info
    res.redirect(`http://localhost:3000/?token=${token}&id=${req.user._id}&name=${encodeURIComponent(req.user.name)}&email=${encodeURIComponent(req.user.email)}`);
  }
);

export default router;
