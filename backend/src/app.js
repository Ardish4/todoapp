import express from 'express'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.send('API is running...')
})

// import routers
import userRouter from './routes/user.route.js'
import todoRouter from './routes/todo.route.js'

app.use('/api/users', userRouter)
app.use('/api/todos', todoRouter)

export default app
