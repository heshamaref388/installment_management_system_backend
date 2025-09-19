import mongoose from "mongoose";

const inventoryEntrySchema = new mongoose.Schema({
  date: {
    type: String, // ISO string format
    // required: true,
  },
  quantity: {
    type: Number,
    default: 0,
    required: true,
  },
  unitCost: {
    type: Number,
    default: 0,
    required: true,
  },
  totalCost: {
    type: Number,
    default: 0,
    required: true,
  },
  supplier: {
    type: String, // String instead of ObjectId to match frontend
  },
  notes: String,
});

inventoryEntrySchema.set("toJSON", {
  transform: function (doc, ret) {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
  },
});

const saleRecordSchema = new mongoose.Schema({
  date: {
    type: String, // ISO string format
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  unitPrice: {
    type: Number,
  },
  totalPrice: {
    type: Number,
  },
  costAtTimeOfSale: {
    type: Number,
    // required: true,
  },
  profit: {
    type: Number,
    // required: true,
  },
  notes: String,
});

saleRecordSchema.set("toJSON", {
  transform: function (doc, ret) {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
  },
});

const inventoryItemSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Item name is required"],
      trim: true,
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "category",
      required: [true, "Category is required"],
    },
    quantity: {
      type: Number,
      default: 0,
      // required: true,
    },
    unitCost: {
      type: Number,
      default: 0,
      // required: true,
    },
    totalCost: {
      type: Number,
      default: 0,
      // required: true,
    },
    totalProfit: {
      type: Number,
      default: 0,
    },
    date: {
      type: String, // ISO string format
      required: [true, "Date is required"],
    },
    brandId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "brand",
    },
    image: {
      type: String, // URL or path to image
    },
    entries: [inventoryEntrySchema],
    sales: [saleRecordSchema],
  },
  { timestamps: true }
);

inventoryItemSchema.set("toJSON", {
  transform: function (doc, ret) {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
  },
});

export const inventoryItemModel = mongoose.model(
  "inventoryItem",
  inventoryItemSchema
);
