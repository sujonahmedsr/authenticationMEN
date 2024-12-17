import { NextFunction, Request, Response } from "express"
import catchAsync from "../utils/catchAsync"
import jwt, { JwtPayload } from 'jsonwebtoken'
import User from "../module/user/user.model"

const auth = (...requiredRole: string[]) => {
    return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const token = req.headers.authorization
        if (!token) {
            throw new Error("You are not authorized")
        }
        const decoded = jwt.verify(token, 'secreate1254hajibi') as JwtPayload
        const { email, role } = decoded

        const user = await User.findOne({ email })
        if (!user) {
            throw new Error("This user is not found !")
        }

        const userStatus = user?.userStatus

        if (userStatus === 'inactive') {
            throw new Error('This user is blocked ! !')
        }

        if (requiredRole && !requiredRole.includes(role)) {
            throw new Error('You are not authorized');
        }

        req.user = decoded as JwtPayload;

        next();
    })
}


export default auth