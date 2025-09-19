import { adminContactModel } from "../../../database/models/adminContact.model.js";

export const getAllAdminContacts = async (req, res, next) => {
  try {
    const contacts = await adminContactModel.find();
    res.status(200).json({ status: "success", data: contacts });
  } catch (error) {
    next(error);
  }
};

export const getAdminContact = async (req, res, next) => {
  try {
    const contact = await adminContactModel.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ status: "error", message: "Admin contact not found" });
    }
    res.status(200).json({ status: "success", data: contact });
  } catch (error) {
    next(error);
  }
};

export const createAdminContact = async (req, res, next) => {
  try {
    const newContact = await adminContactModel.create(req.body);
    res.status(201).json({ status: "success", data: newContact });
  } catch (error) {
    next(error);
  }
};

export const updateAdminContact = async (req, res, next) => {
  try {
    const updatedContact = await adminContactModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedContact) {
      return res.status(404).json({ status: "error", message: "Admin contact not found" });
    }
    res.status(200).json({ status: "success", data: updatedContact });
  } catch (error) {
    next(error);
  }
};

export const deleteAdminContact = async (req, res, next) => {
  try {
    const deletedContact = await adminContactModel.findByIdAndDelete(req.params.id);
    if (!deletedContact) {
      return res.status(404).json({ status: "error", message: "Admin contact not found" });
    }
    res.status(200).json({ status: "success", message: "Admin contact deleted" });
  } catch (error) {
    next(error);
  }
};
