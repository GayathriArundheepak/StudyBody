import  AuthService from "../interface/authService";
import jwt from "jsonwebtoken";


export default class JwtAuthService{
    constructor(private secretKey:string){

    }
     generateToken(payload:any):string{

        return jwt.sign(payload,this.secretKey)
    }
   varifyToken(token:string):any{
        return jwt.verify(token,this.secretKey);
    }
}
