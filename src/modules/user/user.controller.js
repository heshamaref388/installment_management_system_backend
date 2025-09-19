import { AppError } from "../utils/AppError.js";
import { catchAsyncError } from "../utils/catchAsyncError.js";
import { userModel } from "../../../database/models/user.model.js";
import { deleteOne } from "../handlers/factory.handler.js";
import { ApiFeatures } from "../utils/ApiFeatures.js";

export const createUser = catchAsyncError(async (req, res, next) => {
  let user = await userModel.findOne({email:req.body.email})
  if (user) return next(new AppError("Email already exists", 400));
  let result = new userModel(req.body);
  await result.save();
  res.json({
    message: "success",
    result,
  });
});

export const getAllUsers = catchAsyncError(async (req, res, next) => {
  let apiFeatures = new ApiFeatures(userModel.find(),req.query).pagination().fields().filter().sort().search()
   //exquete Query 
     let result = await  apiFeatures.mongooseQuery
     res.json({
       message: "success",
       page:apiFeatures.page,
       result,
     });
});

// false && ali
// false
export const getUser = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const result = await userModel.findById(id); //true
  !result && next(new AppError("User not found", 404));
  result && res.json({ message: "success", result });
});
export const updateUser = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const result = await userModel.findByIdAndUpdate(
    id,
   req.body,
    { new: true }
  );
  !result && next(new AppError("User not found", 404));
  result && res.json({ message: "success", result });
});
export const changeUserPassword = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  req.body.passwordChangedAt = Date.now()
  const result = await userModel.findByIdAndUpdate(
    id,
   req.body,
    { new: true }
  );
  !result && next(new AppError("User not found", 404));
  result && res.json({ message: "success", result });
});


export const deleteUser = deleteOne(userModel);
