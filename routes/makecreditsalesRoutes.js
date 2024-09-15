const express = require("express");
const router = express.Router();
const connectEnsureLogin = require("connect-ensure-login");

const creditsales= require("../models/creditsales");

// Add New creditsales
router.get("/add-creditsales-page", (req, res) => {
  res.render("makecreditsales");
});

router.post("/add-creditsales-page", async (req, res) => {
  try {
    const newProduce = creditsales(req.body);
    await newProduce.save();
    res.redirect("/all-stock-page");
  } catch (err) {
    res.status(400).render("add-stock");
    console.log("Add creditsales error", err);
  }
});

// all creditsales
router.get(
  "/all-stock-page",
  connectEnsureLogin.ensureLoggedIn(),
  async (req, res) => {
    try {
      if (req.session.user.role === "manager") {
        // ensure that only managers access all-users page
        const allcreditsales = await Creditsales.find().sort({ $natural: -1 });
        res.render("stock-list", {
          creditsales: allcreditsales,
        });
      } else {
        res.send("Only Managers are allowed to access this page");
      }
    } catch (error) {
      res.status(400).send("Unable to find stock in your database");
    }
  }
);

// update stock
router.get("/update-creditsales-page/:id", async (req, res) => {
  try {
    const dbStock = await creditsales.findOne({ _id: req.params.id });
    res.render("update-creditsales", {
      creditsalesItem: dbcreditsales,
    });
  } catch (err) {
    res.status(400).send("Unable to find user in the database");
  }
});

router.post("/update-creditsales-page", async (req, res) => {
  try {
    await Stock.findOneAndUpdate({ _id: req.query.id }, req.body);
    res.redirect("/creditsales-page");
  } catch (err) {
    res.status(404).send("Unable to update creditsales in the database");
  }
});

// delete creditsales
router.post("/delete-creditsales", async (req, res) => {
  try {
    await creditsales.deleteOne({ _id: req.body.id });
    res.redirect("back");
  } catch (err) {
    res.status(400).send("Unable to delete creditsales in the database");
  }
});

module.exports = router;
