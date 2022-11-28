import { ROLE } from "../utils/constant";
import { Request , Response , NextFunction } from "express"

export const permMiddleware = async (req: Request, res: Response, next: NextFunction) => {

    try {
        if(req.user?.role == ROLE.SELLER){
            next();
        } else {
            res.status(500).json({
                message: "Unauthorized",
                
             });
        }
    } catch (error) {
     res.status(500).json({
        message: "Unauthorized",
        error
     })   
    }
}  
  