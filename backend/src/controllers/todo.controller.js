import Todo from '../models/todo.model.js'
import asyncHandler from '../utils/asyncHandler.js'
import ApiError from '../utils/ApiError.js'
import ApiResponse from '../utils/ApiResponse.js'

export const createTodo = asyncHandler(async (req, res) => {
  const { title } = req.body

  if (!req.user || !req.user._id) {
    throw new ApiError(401, 'Unauthorized')
  }

  if (!title) {
    throw new ApiError(400, 'Title is required')
  }

  const todo = await Todo.create({
    title,
    userId: req.user._id
  })

  return res
  .status(201)
  .json(
    new ApiResponse(
      201,
      'Todo created successfully',
      todo
    )
  )
})

export const getTodos = asyncHandler(async (req, res) => {
  if (!req.user || !req.user._id) {
    throw new ApiError(401, 'Unauthorized')
  }

  const todos = await Todo.find({ userId: req.user._id }).sort({ createdAt: -1 })

  return res
  .status(200)
  .json(
    new ApiResponse(
      200,
      'Todos fetched successfully',
      todos
    )
  )
})

export const toggleTodo = asyncHandler(async (req, res) => {
  const { id } = req.params

  if (!req.user || !req.user._id) {
    throw new ApiError(401, 'Unauthorized')
  }

  const todo = await Todo.findOneAndUpdate(
    { _id: id, userId: req.user._id },
    [{ $set: { checked: { $not: '$checked' } } }],
    { new: true }
  )

  if (!todo) {
    throw new ApiError(404, 'Todo not found')
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        'Todo toggled successfully',
        todo
      )
    )
})

export const updateTodo = asyncHandler(async (req, res) => {
  const { id } = req.params
  const { title } = req.body

  if (!req.user || !req.user._id) {
    throw new ApiError(401, 'Unauthorized')
  }

  if (!title) {
    throw new ApiError(400, 'Nothing to update')
  }

  const todo = await Todo.findOneAndUpdate(
    { _id: id, userId: req.user._id },
    { $set: { title } },
    { new: true, runValidators: true }
  )

  if (!todo) {
    throw new ApiError(404, 'Todo not found')
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        'Todo updated successfully',
        todo
      )
    )
})

export const deleteTodo = asyncHandler(async (req, res) => {
  const { id } = req.params

  if (!req.user || !req.user._id) {
    throw new ApiError(401, 'Unauthorized')
  }
  
  const todo = await Todo.findOneAndDelete({ _id: id, userId: req.user._id })

  if (!todo) {
    throw new ApiError(404, 'Todo not found')
  }

  return res
  .status(200)
  .json(
    new ApiResponse(
      200,
      'Todo deleted successfully',
      todo
    )
  )
})
