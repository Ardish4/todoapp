// backend/src/index.js - Entry point of the backend application

// dotenv should be the first import for environment variable configuration
import dotenv from 'dotenv'

import app from './app.js'
import connectDB from './utils/db.js'

// Load environment variables from .env file
dotenv.config(
  {
    path: './.env'
  }
)

// Connect to the database and start the server
connectDB()
.then(() => { // Start the server only after a successful database connection
  app.listen(process.env.PORT || 6000, () => {
    console.log(`Server is running on port ${process.env.PORT || 6000}`)
  })
})
.catch((error) => { // Handle database connection errors
  console.error('Failed to connect to the database:', error)
})
