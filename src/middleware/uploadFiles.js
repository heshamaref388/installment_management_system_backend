import multer from "multer"
import { AppError } from "../modules/utils/AppError.js"



let option = (folderName)=>{
     const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `uploads/${folderName}`)
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, uniqueSuffix + '-' + file.originalname)
  }
})
function fileFilter (req, file, cb) {
if(file.mimetype.startsWith("image")){

  cb(null, true)
}else{

  cb(new AppError("images only",400), false)
}
}
return multer({ storage ,fileFilter})
}

export const uploadSingleFile = (fildName,folderName)=> option(folderName).single(fildName)

export const uploadMixOfFiles = (MixOfFilds,folderName)=> option(folderName).fields(MixOfFilds)