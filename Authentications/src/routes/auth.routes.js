import {Router} from "express"
import * as authController from"../controller/auth.controller.js"

const authRouter = Router()

/*
*POST:- api/auth/register
*/
authRouter.post("/register",authController.register)

/*
*GET:-api/auth/get-me
*/
authRouter.get("/get-me",authController.getMe)

/* 
*Get:-api/auth/refreshToken
*/
authRouter.get("/refresh-token",authController.refreshToken)


export default authRouter