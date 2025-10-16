import { Router } from 'express'

import { signup, login, logout } from '../controllers/user.controller.js'
import verifyJWT from '../middlewares/auth.middleware.js'

const router = Router()

// Public routes
router.route('/signup').post(signup)
router.route('/login').post(login)

// Protected routes
router.route('/logout').post(verifyJWT, logout)

export default router
