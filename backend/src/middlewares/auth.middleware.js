import jwt from "jsonwebtoken"

import ApiError from "../utils/ApiError.js"
import asyncHandler from "../utils/asyncHandler.js"
import User from "../models/user.model.js"

// Middleware to verify JWT and protect routes from unauthorized access
const verifyJWT = asyncHandler(async (req, res, next) => {
  try {
    // Check for token in cookies or Authorization header
    const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")

    // If no token is found, return 401 Unauthorized
    if (!token) {
      return res.status(401).json({ message: "Unauthorized: No token provided" })
    }

    // Verify the token and decode its payload
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

    // Fetch the user from the database using the ID from the token payload but exclude sensitive fields like password and refreshToken
    const user = await User.findById(decodedToken.id).select("-password -refreshToken")

    // If user is not found, return 401 Unauthorized
    if (!user) {
      return res.status(401).json({ message: "Unauthorized: User not found" })
    }

    // Attach the user object to the request for use in subsequent middleware/routes
    req.user = user
    next()
  }
  catch (error) {
    throw new ApiError(401, error?.message || 'Unauthorized: Invalid access token')
  }
})

export default verifyJWT
