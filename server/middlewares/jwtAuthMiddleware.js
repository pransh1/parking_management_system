import jwt from "jsonwebtoken";
import dotenv from "dotenv";

const generateJwtToken = (userData) => {
  return jwt.sign(userData, process.env.PRIVATE_KEY, { expiresIn: "7d" });
};

const validateJwtToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  console.log("token recieved", token);

  if (!token) {
    console.log("No token recieved");
    res.status(400).json({ message: "Token not recieved" });
  }

  try {
    const decode = jwt.verify(token, process.env.PRIVATE_KEY);
    console.log("Token decoded successfully", decode);
    req.user = decode;
    next();
  } catch (err) {
    console.log("token validation error", err.message);
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};

export { generateJwtToken, validateJwtToken };
