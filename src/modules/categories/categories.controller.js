import { categoryModel } from "../../../database/models/category.model.js";

export const getAllCategories = async (req, res, next) => {
  try {
    const categories = await categoryModel.find();
    res.status(200).json({ status: "success", data: categories });
  } catch (error) {
    next(error);
  }
};

export const getCategory = async (req, res, next) => {
  try {
    const category = await categoryModel.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ status: "error", message: "Category not found" });
    }
    res.status(200).json({ status: "success", data: category });
  } catch (error) {
    next(error);
  }
};

export const createCategory = async (req, res, next) => {
  try {
    const newCategory = await categoryModel.create(req.body);
    res.status(201).json({ status: "success", data: newCategory });
  } catch (error) {
    console.error('Error creating category:', error);
    if (error.code === 11000) {
      return res.status(400).json({ status: "error", message: "Category name must be unique" });
    }
    next(error);
  }
};

export const updateCategory = async (req, res, next) => {
  try {
    const updatedCategory = await categoryModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedCategory) {
      return res.status(404).json({ status: "error", message: "Category not found" });
    }
    res.status(200).json({ status: "success", data: updatedCategory });
  } catch (error) {
    next(error);
  }
};

export const deleteCategory = async (req, res, next) => {
  try {
    const deletedCategory = await categoryModel.findByIdAndDelete(req.params.id);
    if (!deletedCategory) {
      return res.status(404).json({ status: "error", message: "Category not found" });
    }
    res.status(200).json({ status: "success", message: "Category deleted" });
  } catch (error) {
    next(error);
  }
};
