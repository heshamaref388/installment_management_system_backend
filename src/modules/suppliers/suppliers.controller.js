import { supplierModel } from "../../../database/models/supplier.model.js";

export const getAllSuppliers = async (req, res, next) => {
  try {
    const suppliers = await supplierModel.find();
    res.status(200).json({ status: "success", data: suppliers });
  } catch (error) {
    next(error);
  }
};

export const getSupplier = async (req, res, next) => {
  try {
    const { id } = req.params;
    const supplier = await supplierModel.findById(id);
    if (!supplier) return res.status(404).json({ status: "error", message: "Supplier not found" });
    res.status(200).json({ status: "success", data: supplier });
  } catch (error) {
    next(error);
  }
};

export const createSupplier = async (req, res, next) => {
  try {
    const newSupplier = await supplierModel.create(req.body);
    res.status(201).json({ status: "success", data: newSupplier });
  } catch (error) {
    next(error);
  }
};

export const updateSupplier = async (req, res, next) => {
  try {
    const { id } = req.params;
    const supplier = await supplierModel.findByIdAndUpdate(id, req.body, { new: true });
    if (!supplier) return res.status(404).json({ status: "error", message: "Supplier not found" });
    res.status(200).json({ status: "success", data: supplier });
  } catch (error) {
    next(error);
  }
};

export const deleteSupplier = async (req, res, next) => {
  try {
    const { id } = req.params;
    const supplier = await supplierModel.findByIdAndDelete(id);
    if (!supplier) return res.status(404).json({ status: "error", message: "Supplier not found" });
    res.status(200).json({ status: "success" });
  } catch (error) {
    next(error);
  }
};
