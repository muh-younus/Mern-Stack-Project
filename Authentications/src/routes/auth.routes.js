import {Router} from "express"
import * as authController from"../controller/auth.controller.js"

const authRouter = Router()

/*
*POST:- /api/auth/register
*/
authRouter.post("/register",authController.register)

/* 
POST:-/api/auth/login
*/
authRouter.post("/login",authController.login)


/*
*GET:-/api/auth/get-me
*/
authRouter.get("/get-me",authController.getMe)

/* 
*Get:-/api/auth/refreshToken
*/
authRouter.get("/refresh-token",authController.refreshToken)

/* 
*Get:-/api/auth/logout
*/
authRouter.get("/logout",authController.logOut)

/* 
*Get:-/api/auth/verify-email
*/

authRouter.get("/verify-email",authController.verifyEmail)

authRouter.get("logout-all",authController.logoutAll)
export default authRouter