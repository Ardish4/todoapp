import jwt from "jsonwebtoken"

import asyncHandler from "../utils/asyncHandler.js"
import User from "../models/user.model.js"

const verifyJWT = asyncHandler(async (req, res, next) => {
  try {
    const token = req.cookies?.token || req.headers("Authorization")?.replace("Bearer ", "")

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
    next(error)
  }
})

export default verifyJWT
