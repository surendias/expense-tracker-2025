import jwt from "jsonwebtoken";
import { jwtDecode } from "jwt-decode";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
}

// Define the structure of the decoded token (adjust based on your token structure)
interface DecodedToken {
  userId: string;
  exp: number;
  iat: number;
}

export const getUserIdFromToken = (token: string) => {
  try {
    const decoded: DecodedToken = jwtDecode(token);
    // Check if the token has expired
    const currentTime = Date.now() / 1000; // Current time in seconds
    if (decoded.exp < currentTime) {
      throw new Error("Token has expired.");
    }
    return decoded.userId; // Return the userId from the token payload
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};
