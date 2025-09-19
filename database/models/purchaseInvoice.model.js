import mongoose from "mongoose";

const purchaseInvoiceItemSchema = new mongoose.Schema({
  itemName: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  unitCost: {
    type: Number,
    required: true,
  },
  totalCost: {
    type: Number,
    required: true,
  },
  inventoryItemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "inventoryItem",
  },
});

purchaseInvoiceItemSchema.set('toJSON', {
  transform: function (doc, ret) {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
  }
});

const purchaseInvoiceSchema = mongoose.Schema(
  {
    supplier: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "supplier",
      required: [true, "Supplier is required"],
    },
    date: {
      type: Date,
      required: [true, "Date is required"],
    },
    items: [purchaseInvoiceItemSchema],
    totalCost: {
      type: Number,
      required: [true, "Total cost is required"],
    },
    notes: String,
  },
  { timestamps: true }
);

purchaseInvoiceSchema.set('toJSON', {
  transform: function (doc, ret) {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
  }
});

export const purchaseInvoiceModel = mongoose.model("purchaseInvoice", purchaseInvoiceSchema);
