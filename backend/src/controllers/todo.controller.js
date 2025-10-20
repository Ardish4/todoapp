import Todo from '../models/todo.model.js'
import asyncHandler from '../utils/asyncHandler.js'
import ApiError from '../utils/ApiError.js'
import ApiResponse from '../utils/ApiResponse.js'

export const createTodo = asyncHandler(async (req, res) => {
  // Extract title from request body
  const { title } = req.body

  // Ensure user is authenticated
  if (!req.user || !req.user._id) {
    throw new ApiError(401, 'Unauthorized')
  }

  // Validate title
  if (!title) {
    throw new ApiError(400, 'Title is required')
  }

  // Create new todo item
  const todo = await Todo.create({
    title,
    userId: req.user._id
  })

  // Return success response
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
  // Ensure user is authenticated
  if (!req.user || !req.user._id) {
    throw new ApiError(401, 'Unauthorized')
  }

  // Fetch todos for the authenticated user
  const todos = await Todo.find({ userId: req.user._id }).sort({ createdAt: -1 })

  // Return success response
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
  // Extract todo ID from request parameters
  const { id } = req.params

  // Ensure user is authenticated
  if (!req.user || !req.user._id) {
    throw new ApiError(401, 'Unauthorized')
  }

  // Toggle the 'checked' status of the todo item
  const todo = await Todo.findOneAndUpdate(
    { _id: id, userId: req.user._id },
    [{ $set: { checked: { $not: '$checked' } } }],
    { new: true }
  )

  // If todo not found, throw error
  if (!todo) {
    throw new ApiError(404, 'Todo not found')
  }

  // Return success response
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
  // Extract todo ID from request parameters and title from request body
  const { id } = req.params
  const { title } = req.body

  // Ensure user is authenticated
  if (!req.user || !req.user._id) {
    throw new ApiError(401, 'Unauthorized')
  }

  // Validate title
  if (!title) {
    throw new ApiError(400, 'Nothing to update')
  }

  // Update the title of the todo item
  const todo = await Todo.findOneAndUpdate(
    { _id: id, userId: req.user._id },
    { $set: { title } },
    { new: true, runValidators: true }
  )

  // If todo not found, throw error
  if (!todo) {
    throw new ApiError(404, 'Todo not found')
  }

  // Return success response
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
  // Extract todo ID from request parameters
  const { id } = req.params

  // Ensure user is authenticated
  if (!req.user || !req.user._id) {
    throw new ApiError(401, 'Unauthorized')
  }
  
  // Delete the todo item
  const todo = await Todo.findOneAndDelete({ _id: id, userId: req.user._id })

  // If todo not found, throw error
  if (!todo) {
    throw new ApiError(404, 'Todo not found')
  }

  // Return success response
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
