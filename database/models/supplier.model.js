import mongoose from "mongoose";

const supplierSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Supplier name is required"],
      trim: true,
      unique: true,
    },
    contactInfo: {
      phone: String,
      email: String,
      address: String,
    },
  },
  { timestamps: true }
);

supplierSchema.set('toJSON', {
  transform: function (doc, ret) {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
  }
});

export const supplierModel = mongoose.model("supplier", supplierSchema);
