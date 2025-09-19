import { inventoryItemModel } from "../../../database/models/inventoryItem.model.js";
import { categoryModel } from "../../../database/models/category.model.js";
import { retryOperation } from "../utils/retryOperation.js";

export const getAllInventoryItems = async (req, res, next) => {
  try {
    const items = await inventoryItemModel.find().populate("categoryId");
    res.status(200).json({ status: "success", data: items });
  } catch (error) {
    next(error);
  }
};

export const getTotalRealizedProfit = async (req, res, next) => {
  try {
    const items = await inventoryItemModel.find();
    let totalProfit = 0;
    items.forEach(item => {
      if (typeof item.totalProfit === 'number') {
        totalProfit += item.totalProfit;
      }
    });
    res.status(200).json({ status: "success", totalProfit });
  } catch (error) {
    next(error);
  }
};

export const createInventoryItem = async (req, res, next) => {
  try {
    console.log("Received req.body in createInventoryItem:", req.body);
    // Check if req.body is defined
    if (!req.body) {
      return res.status(400).json({
        status: "error",
        message: "Request body is required and must be JSON"
      });
    }
    // Validate required fields
    const { name, categoryId, date } = req.body;
    if (!name || !categoryId || !date) {
      return res.status(400).json({
        status: "error",
        message: "Missing required fields: name, categoryId, and date are required"
      });
    }

    // if (req.file) {
    //   req.body.image = req.file.path.replace(/^uploads\//, '');
    // }
    const newItem = await retryOperation(() => inventoryItemModel.create(req.body));
    res.status(201).json({ status: "success", data: newItem });
  } catch (error) {
    console.error("Error creating inventory item:", error);
    next(error);
  }
};

// Additional controllers for update, delete can be added similarly

export const updateInventoryItem = async (req, res, next) => {
  try {
    // if (req.file) {
    //   req.body.image = req.file.path.replace(/^uploads\//, '');
    // }
    const updatedItem = await inventoryItemModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedItem) {
      return res.status(404).json({ status: "error", message: "Inventory item not found" });
    }
    res.status(200).json({ status: "success", data: updatedItem });
  } catch (error) {
    next(error);
  }
};

export const deleteInventoryItem = async (req, res, next) => {
  try {
    const deletedItem = await inventoryItemModel.findByIdAndDelete(req.params.id);
    if (!deletedItem) {
      return res.status(404).json({ status: "error", message: "Inventory item not found" });
    }
    res.status(200).json({ status: "success", message: "Inventory item deleted" });
  } catch (error) {
    next(error);
  }
};



// Inventory Entries Controllers
export const addInventoryEntry = async (req, res, next) => {
  try {
    const { id } = req.params;
    const entryData = req.body;
    // Calculate totalCost for the entry
    entryData.totalCost = (entryData.quantity || 0) * (entryData.unitCost || 0);
    const item = await inventoryItemModel.findById(id);
    if (!item) {
      return res.status(404).json({ status: "error", message: "Inventory item not found" });
    }
    item.entries.push(entryData);

    // Recalculate unitCost and totalCost
    const totalIn = item.entries.reduce((sum, entry) => sum + (typeof entry.quantity === 'number' ? entry.quantity : 0), 0);
    const totalCost = item.entries.reduce((sum, entry) => sum + (typeof entry.totalCost === 'number' ? entry.totalCost : 0), 0);
    item.unitCost = totalIn > 0 ? totalCost / totalIn : 0;
    item.totalCost = totalCost;

    await item.save();
    res.status(200).json({ status: "success", data: item });
  } catch (error) {
    next(error);
  }
};
export const updateInventoryEntry = async (req, res, next) => {
  try {
    const { id, entryId } = req.params;
    const updateData = req.body;
    // Calculate totalCost for the updated entry
    updateData.totalCost = (updateData.quantity || 0) * (updateData.unitCost || 0);
    const item = await inventoryItemModel.findById(id);
    if (!item) {
      return res.status(404).json({ status: "error", message: "Inventory item not found" });
    }
    const entry = item.entries.id(entryId);
    if (!entry) {
      return res.status(404).json({ status: "error", message: "Entry not found" });
    }
    Object.assign(entry, updateData);

    // Recalculate unitCost and totalCost after update
    const totalIn = item.entries.reduce((sum, entry) => sum + (typeof entry.quantity === 'number' ? entry.quantity : 0), 0);
    const totalCost = item.entries.reduce((sum, entry) => sum + (typeof entry.totalCost === 'number' ? entry.totalCost : 0), 0);
    item.unitCost = totalIn > 0 ? totalCost / totalIn : 0;
    item.totalCost = totalCost;

    await item.save();
    res.status(200).json({ status: "success", data: item });
  } catch (error) {
    next(error);
  }
};

export const deleteInventoryEntry = async (req, res, next) => {
  try {
    const { id, entryId } = req.params;
    const item = await inventoryItemModel.findById(id);
    if (!item) {
      return res.status(404).json({ status: "error", message: "Inventory item not found" });
    }
    item.entries.pull(entryId);
    await item.save();
    res.status(200).json({ status: "success", data: item });
  } catch (error) {
    next(error);
  }
};

// Inventory Sales Controllers
export const addSaleRecord = async (req, res, next) => {
  try {
    const { id } = req.params;
    const saleData = req.body;
    const item = await inventoryItemModel.findById(id);
    if (!item) {
      return res.status(404).json({ status: "error", message: "Inventory item not found" });
    }
    item.sales.push(saleData);

    // Recalculate totalProfit
    item.totalProfit = item.sales.reduce((sum, sale) => sum + (typeof sale.profit === 'number' ? sale.profit : 0), 0);

    await item.save();
    res.status(200).json({ status: "success", data: item });
  } catch (error) {
    next(error);
  }
};

export const updateSaleRecord = async (req, res, next) => {
  try {
    const { id, saleId } = req.params;
    const updateData = req.body;
    const item = await inventoryItemModel.findById(id);
    if (!item) {
      return res.status(404).json({ status: "error", message: "Inventory item not found" });
    }
    const sale = item.sales.id(saleId);
    if (!sale) {
      return res.status(404).json({ status: "error", message: "Sale record not found" });
    }
    Object.assign(sale, updateData);

    // Recalculate totalProfit
    item.totalProfit = item.sales.reduce((sum, sale) => sum + (typeof sale.profit === 'number' ? sale.profit : 0), 0);

    await item.save();
    res.status(200).json({ status: "success", data: item });
  } catch (error) {
    next(error);
  }
};

export const deleteSaleRecord = async (req, res, next) => {
  try {
    const { id, saleId } = req.params;
    const item = await inventoryItemModel.findById(id);
    if (!item) {
      return res.status(404).json({ status: "error", message: "Inventory item not found" });
    }
    item.sales.pull(saleId);

    // Recalculate totalProfit
    item.totalProfit = item.sales.reduce((sum, sale) => sum + (typeof sale.profit === 'number' ? sale.profit : 0), 0);

    await item.save();
    res.status(200).json({ status: "success", data: item });
  } catch (error) {
    next(error);
  }
};

export const getFilteredInventoryItems = async (req, res, next) => {
  try {
    const items = await inventoryItemModel.find().populate("categoryId");
    const availableItems = [];
    const exhaustedItems = [];

    items.forEach(item => {
      const totalIn = item.entries.reduce((sum, entry) => sum + (typeof entry.quantity === 'number' ? entry.quantity : 0), 0);
      const totalOut = item.sales.reduce((sum, sale) => sum + (typeof sale.quantity === 'number' ? sale.quantity : 0), 0);
      const stock = totalIn - totalOut;

      console.log(`Item: ${item.name}, totalIn: ${totalIn}, totalOut: ${totalOut}, stock: ${stock}`);

      if (stock > 0) {
        availableItems.push(item);
      } else {
        exhaustedItems.push(item);
      }
    });

    res.status(200).json({
      status: "success",
      data: {
        available: availableItems,
        exhausted: exhaustedItems
      }
    });
  } catch (error) {
    next(error);
  }
};