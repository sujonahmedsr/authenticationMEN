import { Router } from "express";
import { authController } from "./authController";
import validateRequest from "../../middlewares/validateRequest";
import { UserValidation } from "../user/userValidation";
import { AuthValidation } from "./authValidation";

const authRouter = Router()

authRouter.post('/register', validateRequest(UserValidation.userValidationSchema), authController.register)
authRouter.post('/login', validateRequest(AuthValidation.loginValidationSchema), authController.login);

export default authRouter