import User from '../models/user.model.js'
import ApiError from '../utils/ApiError.js'
import ApiResponse from '../utils/ApiResponse.js'
import asyncHandler from '../utils/asyncHandler.js'

// Helper function to generate access and refresh tokens
const generateAccessAndRefreshToken = async (userId) => {
  try {
    // Find user by ID
    const user = await User.findById(userId)
    // Generate tokens
    const accessToken = user.generateAccessToken()
    const refreshToken = user.generateRefreshToken()

    // Save refresh token to user document
    user.refreshToken = refreshToken
    // Save without validation
    await user.save({ validateBeforeSave: false })

    return { accessToken, refreshToken }
  }
  catch (error) {
    throw new ApiError(500, 'Failed to generate tokens')
  }
}

export const signup = asyncHandler(async (req, res) => {
  // Extract user details from request body
  const { username, email, password } = req.body

  // Validate required fields
  if (!username || !email || !password) {
    throw new ApiError(400, 'All fields are required')
  }

  // Check if user with the same email already exists
  const existingUser = await User.findOne({ email })

  // If user exists, throw conflict error
  if (existingUser) {
    throw new ApiError(409, 'Email already in use')
  }

  // Create new user
  const user = await User.create({ username, email, password })

  // Fetch the created user without sensitive fields
  const createdUser = await User.findById(user._id).select(
    '-password -refreshToken'
  )

  // If user creation failed, throw error
  if (!createdUser) {
    throw new ApiError(500, 'User creation failed')
  }

  // Return success response
  return res.status(201).json(
    new ApiResponse(201, 'User signup successfully', createdUser)
  )
})

export const login = asyncHandler(async (req, res) => {
  // Extract email and password from request body
  const { email, password } = req.body

  // Validate required fields
  if (!email || !password) {
    throw new ApiError(400, 'Email and password are required')
  }

  // Find user by email
  const user = await User.findOne({ email })

  // If user not found, throw unauthorized error
  if (!user) {
    throw new ApiError(401, 'User does not exist')
  }

  // Validate password
  const isPasswordValid = await user.matchPassword(password)

  // If password is invalid, throw unauthorized error
  if (!isPasswordValid) {
    throw new ApiError(401, 'Invalid password')
  }

  // Generate access and refresh tokens
  const {accessToken, refreshToken} = await generateAccessAndRefreshToken(user._id)

  // Fetch logged-in user without sensitive fields
  const loggedInUser = await User.findById(user._id).select(
    '-password -refreshToken'
  )

  // Set cookie options
  const options = {
    httpOnly: true,
    secure: true
  }

  // Return success response with tokens in cookies
  return res
  .status(200)
  .cookie('accessToken', accessToken, options)
  .cookie('refreshToken', refreshToken, options)
  .json(
    new ApiResponse(
      200,
      'User login successfully',
      {
        user: loggedInUser,
        accessToken,
        refreshToken
      }
    )
  )
})

export const logout = asyncHandler(async (req, res) => {
  // Remove refresh token from user document
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $unset: {
        refreshToken: 1 // Unset refreshToken field
      }
    },
    {
      new: true // Return updated user document
    }
  )

  // Set cookie options
  const options = {
    httpOnly: true,
    secure: true
  }

  // Clear cookies and return success response
  return res
  .status(200)
  .clearCookie('accessToken', options)
  .clearCookie('refreshToken', options)
  .json(
    new ApiResponse(
      200,
      'User logged out successfully',
      {}
    )
  )
})
