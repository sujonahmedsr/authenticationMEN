import { IUser } from "../user/user.interface"
import User from "../user/user.model"
import { IUserLogin } from "./authInterface"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const registerToDB = async (payload: IUser) => {
    const result = await User.create(payload)
    return result
}

const loginUser = async (payload: IUserLogin) => {
    const user = await User.findOne({ email: payload?.email }).select("+password")

    if (!user) {
        throw new Error('This user is not found !')
    }

    const userStatus = user?.userStatus
    if (userStatus === 'inactive') {
        throw new Error('User is not active now!')
    }

    const isPassMatched = await bcrypt.compare(payload?.password, user?.password)
    if (!isPassMatched) {
        throw new Error('Wrong Password!!! Tell me who are you? 😈')
    }

    const jwtPayload = {
        email: user?.email,
        role: user?.role,
    }
    const token = jwt.sign(jwtPayload, "secreate1254hajibi", { expiresIn: '1d' })


    return { token, user };
}
export const authServices = {
    registerToDB,
    loginUser
}