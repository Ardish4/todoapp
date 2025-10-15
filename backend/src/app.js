import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express()

app.use(cors({
  origin: process.env.CORS,
  credentials: true
}))
app.use(express.json({ limit: '16kb' }))
app.use(express.urlencoded({ extended: true, limit: '16kb' }))
app.use(cookieParser())

// import routers
import userRouter from './routes/user.route.js'
import todoRouter from './routes/todo.route.js'

app.use('/api/v1/user', userRouter)
app.use('/api/v1/todo', todoRouter)

export default app
