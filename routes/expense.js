const express = require('express');
const router = express.Router();
const Expense = require('../models/expense');
const User = require('../models/user');

const ensureAuthenticated = require('../controllers/authController');

// Handle POST requests to add an expense
router.post('/add', ensureAuthenticated, async (req, res) => {
  try {
    const { amount, description, category } = req.body;

    // Get the authenticated user's ID from the session or token
    const userId = req.user.id;

    // Create a new expense record in the database with the user's ID
    await Expense.create({ amount, description, category, userId });

    res.status(201).send({ message: 'Expense added successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Failed to add expense' });
  }
});

// Handle DELETE requests to delete an expense by ID
router.delete('/delete/:id', ensureAuthenticated, async (req, res) => {
  try {
    const { id } = req.params;

    // Get the authenticated user's ID from the session or token
    const userId = req.user.id;

    // Find the expense by ID and user ID
    const deletedExpense = await Expense.findOne({
      where: { id, userId },
    });

    if (!deletedExpense) {
      return res.status(404).send({ message: 'Expense not found' });
    }

    await deletedExpense.destroy();

    res.status(200).send({ message: 'Expense deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Failed to delete expense' });
  }
});

module.exports = router;
