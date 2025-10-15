import User from '../models/user.model.js'
import ApiError from '../utils/ApiError.js'
import ApiResponse from '../utils/ApiResponse.js'
import asyncHandler from '../utils/asyncHandler.js'

const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId)
    const accessToken = user.generateAccessToken()
    const refreshToken = user.generateRefreshToken()

    user.refreshToken = refreshToken
    await user.save({ validateBeforeSave: false })

    return { accessToken, refreshToken }
  }
  catch (error) {
    throw new ApiError(500, 'Failed to generate tokens')
  }
}

export const signup = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body

  if (!username || !email || !password) {
    throw new ApiError(400, 'All fields are required')
  }

  const existingUser = await User.findOne({ email })

  if (existingUser) {
    throw new ApiError(409, 'Email already in use')
  }

  const user = await User.create({ username, email, password })

  const createdUser = await User.findById(user._id).select(
    '-password -refreshToken'
  )

  if (!createdUser) {
    throw new ApiError(500, 'User creation failed')
  }

  return res.status(201).json(
    new ApiResponse(201, 'User signup successfully', createdUser)
  )
})

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    throw new ApiError(400, 'Email and password are required')
  }

  const user = await User.findOne({ email })

  if (!user) {
    throw new ApiError(401, 'User does not exist')
  }

  const isPasswordValid = await user.matchPassword(password)

  if (!isPasswordValid) {
    throw new ApiError(401, 'Invalid password')
  }

  const {accessToken, refreshToken} = await generateAccessAndRefreshToken(user._id)

  const loggedInUser = await User.findById(user._id).select(
    '-password -refreshToken'
  )

  const options = {
    httpOnly: true,
    secure: true
  }

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
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $unset: {
        refreshToken: 1
      }
    },
    {
      new: true
    }
  )

  const options = {
    httpOnly: true,
    secure: true
  }

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
