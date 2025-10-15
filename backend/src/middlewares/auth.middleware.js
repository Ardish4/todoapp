import jwt from "jsonwebtoken"

import ApiError from "../utils/ApiError.js"
import asyncHandler from "../utils/asyncHandler.js"
import User from "../models/user.model.js"

const verifyJWT = asyncHandler(async (req, res, next) => {
  try {
    const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")

    if (!token) {
      return res.status(401).json({ message: "Unauthorized: No token provided" })
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

    const user = await User.findById(decodedToken.id).select("-password -refreshToken")

    if (!user) {
      return res.status(401).json({ message: "Unauthorized: User not found" })
    }

    req.user = user
    next()
  }
  catch (error) {
    throw new ApiError(401, error?.message || 'Unauthorized: Invalid access token')
  }
})

export default verifyJWT
