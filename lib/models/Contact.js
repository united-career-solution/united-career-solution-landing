import mongoose from "mongoose";

const ContactSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: false,
    trim: true,
  },
  email: {
    type: String,
    required: false,
    trim: true,
    lowercase: true,
  },
  phone: {
    type: String,
    required: false,
    trim: true,
  },
  message: {
    type: String,
    required: false,
    trim: true,
  },
  firstName: { type: String, trim: true },
  lastName: { type: String, trim: true },
  role: { type: String, required: false },
  company: { type: String, trim: true },
  linkedin: { type: String, trim: true },
  isRead: { type: Boolean, default: false },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Prevent model recompilation during hot reload
const Contact =
  mongoose.models.Contact || mongoose.model("Contact", ContactSchema);

export default Contact;
