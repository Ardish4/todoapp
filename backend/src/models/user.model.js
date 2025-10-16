import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    refreshToken: {
      type: String
    }
  },
  {
    timestamps: true // it will automatically add createdAt and updatedAt fields
  }
)

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next()
  }
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
  next()
})

// Method to compare entered password with hashed password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

// Method to generate Access Token
userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      id: this._id,
      username: this.username,
      email: this.email
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    }
  )
}

// Method to generate Refresh Token
userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      id: this._id
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    }
  )
}

const User = mongoose.model('User', userSchema)
export default User
