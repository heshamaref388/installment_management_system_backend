import { AppError } from "../utils/AppError.js";
import { catchAsyncError } from "../utils/catchAsyncError.js";

export const deleteOne = (model) => {
  return catchAsyncError(async (req, res, next) => {
    const { id } = req.params;
    const result = await model.findByIdAndDelete(id);
    !result && next(new AppError("item not found", 404));
    result && res.json({ message: "success", result });
  });
};
