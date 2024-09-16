const express = require("express");
const router = express.Router();
const connectEnsureLogin = require("connect-ensure-login");

const Stock = require("../models/stock");

// Add New Stock
router.get("/add-stock-page", (req, res) => {
  res.render("addstock");
});

router.post("/add-stock-page", async (req, res) => {
  try {
    const newProduce = new Stock(req.body); // Use 'new Stock' instead of 'Stock'
    await newProduce.save();
    res.redirect("/all-stock-page");
  } catch (err) {
    console.error("Add Stock error:", err);
    res.status(400).render("addstock");
  }
});

// View All Stock (accessible only to managers)
router.get("/all-stock-page", 
  // connectEnsureLogin.ensureLoggedIn(), // Uncomment if login enforcement is needed
  async (req, res) => {
    try {
      if (req.session.user && req.session.user.role === "manager") {
        const stocks = await Stock.find().sort({ $natural: -1 });
        res.render("stocklist", { stock: stocks });
      } else {
        res.status(403).send("Only Managers are allowed to access this page");
      }
    } catch (error) {
      console.error("Error fetching stock:", error);
      res.status(400).send("Unable to find stock in your database");
    }
  }
);

// Update Stock
router.get("/update-stock-page/:id", async (req, res) => {
  try {
    const dbStock = await Stock.findById(req.params.id);
    if (dbStock) {
      res.render("updatestock", { stockItem: dbStock });
    } else {
      res.status(404).send("Stock item not found");
    }
  } catch (err) {
    console.error("Error fetching stock for update:");
    res.status(400).send("Unable to find stock in the database");
  }
});

router.post("/update-stock-page", async (req, res) => {
  try {
    const updatedStock = await Stock.findByIdAndUpdate(req.query.id, req.body, { new: true });
    if (updatedStock) {
      res.redirect("/all-stock-page");
    } else {
      res.status(404).send("Stock item not found for update");
    }
  } catch (err) {
    console.error("Error updating stock:");
    res.status(400).send("Unable to update stock in the database");
  }
});

// Delete Stock
router.post("/delete-stock", async (req, res) => {
  try {
    const result = await Stock.deleteOne({ _id: req.body.id });
    if (result.deletedCount > 0) {
      res.redirect("back");
    } else {
      res.status(404).send("Stock item not found for deletion");
    }
  } catch (err) {
    console.error("Error deleting stock:", err);
    res.status(400).send("Unable to delete stock in the database");
  }
});

module.exports = router;
