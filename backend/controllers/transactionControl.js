import Transaction from "../models/transactionmodel.js";

const transact = async (req, res) => {
  try {
    console.log(req.body);
    const newTransaction = await Transaction.create(req.body);
    res.status(201).json({
      status: "created",
      newTransaction,
    });
    console.log(newTransaction);
  } catch (err) {
    console.log(err.message);
    res.status(400).json({
      error: err.message,
    });
  }
};

const viewTransactions = async (req, res) => {
  try {
    const allTransactions = await Transaction.find();
    res.status(200).json({
      status: "success",
      allTransactions,
    });
  } catch (err) {
    res.status(400).json({
      error: err.message,
    });
  }
};

const transactionControllers = {
  transact,
  viewTransactions,
};

export default transactionControllers;
