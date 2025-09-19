import jwt from "jsonwebtoken";
import { userModel } from "../../../database/models/user.model.js";
import bcrypt from "bcrypt";
import { catchAsyncError } from "../utils/catchAsyncError.js";
import { AppError } from "../utils/AppError.js";

export const signup = catchAsyncError(async (req, res, next) => {
  let isFound = await userModel.findOne({ email: req.body.email });
  if (isFound) return next(new AppError("email already exists", 409));
  let { password_confirmation, ...userData } = req.body;
  let user = new userModel(userData);
  await user.save();
  let token = jwt.sign({ name: user.name, userId: user._id, role: user.role}, 'mynameisHesham')
  res.json({ status: "success", data: { user, token } });
});

export const signIn = catchAsyncError (async (req, res, next) => {
const { email, password} = req.body
let isFound = await userModel.findOne({ email })
if(!isFound) return next(new AppError('incorrect email or password', 401))
const match = await bcrypt.compare(password, isFound.password);
if (isFound && match) {
let token = jwt.sign({ name: isFound.name, userId: isFound._id, role: isFound.role}, 'mynameisHesham')
return res.json({ status: "success", data: { user: isFound, token } })
}
next(new AppError('incorrect email or password', 401))
})


export const protectedRoutes = catchAsyncError (async (req,res,next)=>{
  let token = req.headers.authorization?.split(' ')[1] || req.headers.token
  if(!token || token === 'null') return next(new AppError('you are not authorized, please login',401))

  let decoded;
  try {
    decoded = jwt.verify(token,'mynameisHesham')
  } catch (error) {
    return next(new AppError('invalid token',401))
  }

    let user = await userModel.findById(decoded.userId)
    if(!user) return next(new AppError('the user for this token is not found',401))
    if (user.passwordChangedAt){
 let changePasswordDate = parseInt(user.passwordChangedAt.getTime() / 1000)
     if(changePasswordDate>decoded.iat) return next(new AppError('user recently changed password, please login again',401))
  }
req.user = user
next()
})


export const allowedTo = (...roles)=>{
return catchAsyncError(async(req,res,next)=>{
  if(!roles.includes(req.user.role)) return next(new AppError('you are not allowed to access this route',403))
  next()
})
}

export const refresh = catchAsyncError(async (req, res, next) => {
  let token = jwt.sign({ name: req.user.name, userId: req.user._id, role: req.user.role}, 'mynameisHesham')
  res.json({ status: "success", data: { user: req.user, token } });
});

export const getMe = catchAsyncError(async (req, res, next) => {
  res.json({ status: "success", data: req.user });
});

