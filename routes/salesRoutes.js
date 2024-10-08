const express = require("express");
const router = express.Router();
const connectEnsureLogin = require("connect-ensure-login");

const Sale = require('../models/sale.js')
// Add New Sales
router.get("/add-sales-page", async (req, res) => {
  res.render("makesales");
});

router.post("/add-sales-page", async (req, res) => {
  try {
    const newProduce = Sale(req.body);
    await newProduce.save();
    res.redirect("/saleslist-page");
  } catch (err) {
    res.status(400).render("saleslist");
    console.log("Add Sales error", err);
  }
});

// Route to display the list of sales
router.get("/saleslist-page", async (req, res) => {
  try {
    const sales = await Sale.find().sort({ createdAt: -1 });
    
    res.render("saleslist", {
      title: "Sales List",
      sales: sales
    });
  } catch (error) {
    console.error("Error fetching sales:", error.message);
    res.status(500).send("Unable to find sales data");
  }
});


// update sales
router.get("/update-sales-page/:id", async (req, res) => {
  try {
    const dbSales = await Sale.findOne({ _id: req.params.id });
    res.render("updatesales", {
      salesItem: dbSales,
    });
  } catch (err) {
    res.status(400).send("Unable to find stock in the database");
  }
});

router.post("/update-sales-page", async (req, res) => {
  try {
    await Sale.findOneAndUpdate({ _id: req.query.id }, req.body);
    res.redirect("/saleslist-page");
  } catch (err) {
    res.status(404).send("Unable to update stock in the database");
  }
});

// delete stock
router.post("/delete-sales", async (req, res) => {
  try {
    await Sale.deleteOne({ _id: req.body.id });
    res.redirect("/saleslist-page");
  } catch (err) {
    res.status(400).send("Unable to delete sales in the database");
  }
});


// router.get("/receipt",(req,res)=>res.render('receipt'))
// Route to display the receipt
router.get('/receipt/:id', async (req, res) => {
  try {
    // Fetch the sale by ID
    const sale = await Sale.findById(req.params.id);

    // Check if sale exists
    if (!sale) {
      return res.status(404).send('Sale not found');
    }

    // Render the receipt template with sale data
    res.render('receipt', { sale });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// Route to generate the report
router.get('/report', async (req, res) => {
  try {
    // Fetch data from your database
    const sales = await Sale.find({}).exec(); // Adjust query as needed

    // Calculate totals
    const totalSales = sales.reduce((sum, sale) => sum + sale.total, 0);

    // Render the report
    res.render('report', {
      sales: sales,
      totalSales: totalSales
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

module.exports = router;
