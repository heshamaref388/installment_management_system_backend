import { purchaseInvoiceModel } from "../../../database/models/purchaseInvoice.model.js";
import { inventoryItemModel } from "../../../database/models/inventoryItem.model.js";
import mongoose from "mongoose";

export const getAllPurchaseInvoices = async (req, res, next) => {
  try {
    const invoices = await purchaseInvoiceModel.find().populate('supplier', 'name');
    const transformedInvoices = invoices.map(invoice => ({
      ...invoice.toObject(),
      supplier: invoice.supplier.name
    }));
    res.status(200).json({ status: "success", data: transformedInvoices });
  } catch (error) {
    next(error);
  }
};

export const getPurchaseInvoice = async (req, res, next) => {
  try {
    const { id } = req.params;
    const invoice = await purchaseInvoiceModel.findById(id);
    if (!invoice) return res.status(404).json({ status: "error", message: "Invoice not found" });
    res.status(200).json({ status: "success", data: invoice });
  } catch (error) {
    next(error);
  }
};

export const createPurchaseInvoice = async (req, res, next) => {
  try {
    const { supplier, date, items } = req.body;

    // Fetch item details for names
    const itemIds = items.map(item => item.itemId);
    const inventoryItems = await inventoryItemModel.find({ _id: { $in: itemIds } }).select('name');

    // Create a map for quick lookup
    const itemMap = new Map(inventoryItems.map(item => [item._id.toString(), item.name]));

    // Transform items
    const transformedItems = items.map(item => ({
      itemName: itemMap.get(item.itemId) || 'Unknown Item',
      quantity: item.quantity,
      unitCost: item.unitCost,
      totalCost: item.quantity * item.unitCost,
      inventoryItemId: new mongoose.Types.ObjectId(item.itemId)
    }));

    const invoiceData = {
      supplier: new mongoose.Types.ObjectId(supplier),
      date: new Date(date),
      items: transformedItems,
      totalCost: transformedItems.reduce((sum, item) => sum + item.totalCost, 0)
    };

    const newInvoice = await purchaseInvoiceModel.create(invoiceData);
    res.status(201).json({ status: "success", data: newInvoice });
  } catch (error) {
    next(error);
  }
};

export const updatePurchaseInvoice = async (req, res, next) => {
  try {
    const { id } = req.params;
    const invoice = await purchaseInvoiceModel.findByIdAndUpdate(id, req.body, { new: true });
    if (!invoice) return res.status(404).json({ status: "error", message: "Invoice not found" });
    res.status(200).json({ status: "success", data: invoice });
  } catch (error) {
    next(error);
  }
};

export const deletePurchaseInvoice = async (req, res, next) => {
  try {
    const { id } = req.params;
    const invoice = await purchaseInvoiceModel.findByIdAndDelete(id);
    if (!invoice) return res.status(404).json({ status: "error", message: "Invoice not found" });
    res.status(200).json({ status: "success" });
  } catch (error) {
    next(error);
  }
};
