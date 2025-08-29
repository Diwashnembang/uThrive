import jwt from "jsonwebtoken" 
import bcrypt from "bcrypt"

export const sec = 1 * 1000
export const min = 60 * sec
export const hour = 60 * min
export const day = 24 * hour
export const tokenExpireTime = 15 * min
export type userRole = "user" | "serviceProvider" | "admin"

export function signJWTToken(id : number , email: string,name : string, role:userRole,  time : number):string{
    let token: string = jwt.sign({
        id: id,
        exp: Math.floor(Date.now() + (time)) ,
        sub : email,
        iat: Math.floor(Date.now() ),
        name: name,
        role : role

    }, process.env.JWT_SECRET as string)
    return token
}

export async function hashPassword(password: string):Promise<string>{
    let hashPassword : string
    const salt = 10;
    try{
     hashPassword = await bcrypt.hash(password, salt)
    }catch(e){
        console.error(e)
        throw e
    }
    return hashPassword 
}

export async function comparePassword(password: string, hash: string):Promise<boolean>{
    let result: boolean
    try{
        result = await bcrypt.compare(password, hash)
    }catch(e){
        console.error(e)
        throw e
    }
    return result
}

