import { Router } from 'express'

import { createTodo, getTodos, toggleTodo, updateTodo, deleteTodo } from '../controllers/todo.controller.js'
import verifyJWT from '../middlewares/auth.middleware.js'

const router = Router()

router.route("/create").post(verifyJWT, createTodo)
router.route("/").get(verifyJWT, getTodos)
router.route("/toggle/:id").patch(verifyJWT, toggleTodo)
router.route("/update/:id").put(verifyJWT, updateTodo)
router.route("/delete/:id").delete(verifyJWT, deleteTodo)

export default router
