import { Request, Response } from "express"
import { authServices } from "./authServices"
import catchAsync from "../../utils/catchAsync"
import sendResponse from "../../utils/sendResponse"
import { StatusCodes } from "http-status-codes"

const register = catchAsync( async (req: Request, res: Response) => {
    const result = await authServices.registerToDB(req.body)
    sendResponse(res, {
        status: true,
        statusCode:  StatusCodes.CREATED,
        message: 'Tourist User is register successfully',
        data: result,
      })
})

const login = catchAsync( async (req: Request, res: Response) => {
    const result = await authServices.loginUser(req.body);
    sendResponse(res,{
        statusCode: StatusCodes.ACCEPTED,
        status: true,
        message: "User logged in successfully",
        token: result?.token,
        data: result?.user
    })
})
export const authController = {
    register,
    login
}

