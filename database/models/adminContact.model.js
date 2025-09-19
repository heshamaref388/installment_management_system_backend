import mongoose from "mongoose";

const adminContactSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Contact name is required"],
      trim: true,
      minlength: [2, "Contact name must be at least 2 characters long"],
      maxlength: [50, "Contact name must be at most 50 characters long"],
    },
    whatsappNumber: {
      type: String,
      required: [true, "WhatsApp number is required"],
      validate: {
        validator: function(v) {
          return /^2\d{11}$/.test(v);
        },
        message: "WhatsApp number must start with 2 and be 12 digits long"
      }
    },
  },
  { timestamps: true }
);

export const adminContactModel = mongoose.model("adminContact", adminContactSchema);
