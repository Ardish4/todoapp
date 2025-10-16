import mongoose from 'mongoose'

const DB_NAME = "testdb"  // database name

// Function to connect to MongoDB
const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`)
    console.log('MongoDB connected successfully')
  } catch (error) {
    console.error('MongoDB connection error:', error)
    process.exit(1)
  }
}

export default connectDB
