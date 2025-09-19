import { AppError } from "../modules/utils/AppError.js"

export const validation = (schema)=>{
    return (req,res,next)=>{
        let inpouts = {...req.body,...req.params,...req.query}
        let {error} = schema.validate(inpouts,{abortEarly:false})
        if(error){
            let  errors = error.details.map(detail=>detail.message)
           next(new AppError(`${errors}`,400)) 
        }else{
            next()
        }
    }
} 