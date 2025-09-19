import express from 'express'

import * as auth from './auth.controller.js'

const authRouter = express.Router()

authRouter.post('/signup', auth.signup)

authRouter.post('/login', auth.signIn)

authRouter.post('/refresh', auth.protectedRoutes, auth.refresh)

authRouter.get('/me', auth.protectedRoutes, auth.getMe);

export default authRouter
