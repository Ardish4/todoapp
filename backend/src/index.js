import dotenv from 'dotenv'

import app from './app.js'
import connectDB from './utils/db.js'

dotenv.config(
  {
    path: './.env'
  }
)

connectDB()
.then(() => {
  app.listen(process.env.PORT || 6000, () => {
    console.log(`Server is running on port ${process.env.PORT || 6000}`)
  })
})
.catch((error) => {
  console.error('Failed to connect to the database:', error)
})
