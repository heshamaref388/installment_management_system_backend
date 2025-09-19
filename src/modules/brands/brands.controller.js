import { brandModel } from "../../../database/models/brand.model.js";

export const getAllBrands = async (req, res, next) => {
  try {
    const brands = await brandModel.find();
    res.status(200).json({ status: "success", data: brands });
  } catch (error) {
    next(error);
  }
};

export const createBrand = async (req, res, next) => {
  try {
    const newBrand = await brandModel.create(req.body);
    res.status(201).json({ status: "success", data: newBrand });
  } catch (error) {
    next(error);
  }
};

export const updateBrand = async (req, res, next) => {
  try {
    const updatedBrand = await brandModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedBrand) {
      return res.status(404).json({ status: "error", message: "Brand not found" });
    }
    res.status(200).json({ status: "success", data: updatedBrand });
  } catch (error) {
    next(error);
  }
};

export const deleteBrand = async (req, res, next) => {
  try {
    const deletedBrand = await brandModel.findByIdAndDelete(req.params.id);
    if (!deletedBrand) {
      return res.status(404).json({ status: "error", message: "Brand not found" });
    }
    res.status(200).json({ status: "success", message: "Brand deleted" });
  } catch (error) {
    next(error);
  }
};
