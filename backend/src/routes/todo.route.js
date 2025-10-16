import { Router } from 'express'

import { createTodo, getTodos, toggleTodo, updateTodo, deleteTodo } from '../controllers/todo.controller.js'
import verifyJWT from '../middlewares/auth.middleware.js'

const router = Router()

// All routes are protected and require JWT verification
router.route("/create").post(verifyJWT, createTodo)
router.route("/").get(verifyJWT, getTodos)
router.route("/toggle/:id").patch(verifyJWT, toggleTodo)  // :id is the todo ID
router.route("/update/:id").put(verifyJWT, updateTodo)  // :id is the todo ID
router.route("/delete/:id").delete(verifyJWT, deleteTodo) // :id is the todo ID

export default router
