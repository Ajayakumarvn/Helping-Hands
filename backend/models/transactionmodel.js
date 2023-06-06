import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  c_event: {
    type: String,
    required: [true, "Event Name is Required"],
  },
  amount: {
    type: Number,
    required: [true, "Amount is Required"],
  },
  accountHolderName: {
    type: String,
    trim: true,
    required: [true, "Account holder Name is Required"],
  },
  cardNumber: {
    type: Number,
    trim: true,
    required: [true, "Card Number is Required"],
    validate: {
      validator: function (cardNumber) {
        return cardNumber.toString().length === 16;
      },
      message: "Card number should be 16 digits",
    },
  },
  cvv: {
    type: Number,
    required: [true, "CVV is Required"],
    validate: {
      validator: function (cvv) {
        return cvv.toString().length === 3;
      },
      message: "Card number should be 3 digits",
    },
  },
  expDate: {
    type: Date,
    required: [true, "Expiry Date is Required"],
  },
});

const Transaction = mongoose.model("Transaction", transactionSchema);

export default Transaction;
