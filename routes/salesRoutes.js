const express = require("express");
const router = express.Router();
const connectEnsureLogin = require("connect-ensure-login");

const Sales = require("../models/sales");
// Add New Sales
router.get("/add-sales-page", (req, res) => {
  res.render("makesales");
});

router.post("/add-sales-page", async (req, res) => {
  try {
    const newProduce = Sales(req.body);
    await newProduce.save();
    res.redirect("/saleslist-page");
  } catch (err) {
    res.status(400).render("add-sales");
    console.log("Add Sales error", err);
  }
});

// all sales
router.get(
  "/saleslist-page",
  // connectEnsureLogin.ensureLoggedIn(),
  async (req, res) => {
    try {
      if (req.session.user.role === "manager") {
        // ensure that only managers access saleslist- page
        const allSales = await Sales.find().sort({ $natural: -1 });
        res.render("sales-list", {
    sales: allSales,
        });
      } else {
        res.send("Only Managers are allowed to access this page");
      }
    } catch (error) {
      res.status(400).send("Unable to find stock in your database");
    }
  }
);

// update sales
router.get("/update-sales-page/:id", async (req, res) => {
  try {
    const dbStock = await Sales.findOne({ _id: req.params.id });
    res.render("updatesales", {
      salesItem: dbSales,
    });
  } catch (err) {
    res.status(400).send("Unable to find user in the database");
  }
});

router.post("/update-sales-page", async (req, res) => {
  try {
    await Sales.findOneAndUpdate({ _id: req.query.id }, req.body);
    res.redirect("/all-sales-page");
  } catch (err) {
    res.status(404).send("Unable to update stock in the database");
  }
});

// delete stock
router.post("/delete-sales", async (req, res) => {
  try {
    await Sales.deleteOne({ _id: req.body.id });
    res.redirect("back");
  } catch (err) {
    res.status(400).send("Unable to delete sales in the database");
  }
});

module.exports = router;
