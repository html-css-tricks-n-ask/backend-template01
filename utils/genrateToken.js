import jwt from "jsonwebtoken";

const generateToken = (userId) => {
  return jwt.sign(
    { userId },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }   // you can change this to "1h", "30d", etc.
  );
};

export default generateToken;
