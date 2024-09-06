const express = require("express");
const passport = require("passport"); // Ensure you require passport
const router = express.Router();
// models
const Signup = require("../models/signup");

//Signup Routes
router.get("/register", (req, res) => {
  res.render("signup");
});

// add new user
router.post("/register", async (req, res) => {
  try {
    // check if user already exists
    const existingUser = await Signup.findOne({ email: req.body.email }); // check if the user already exist
    if (existingUser) {
      return res
        .status(400)
        .send("Not registered, a user with a similar email already exists!");
    }

    const user = new Signup(req.body);
    await Signup.register(user, req.body.password, (err) => {
      // used to register a user who will later login
      if (err) {
        throw err;
      }
      res.redirect("/login");
    });

  } catch (err) {
    res.status(400).render("signup", { tittle: "Signup" });
    console.log("Signup user error", err);
  }
});


// Login Routes
router.get("/login", (req, res) => {
    res.render("login");
  });
  
  // Route to handle login
  router.post("/login", passport.authenticate("local", { failureRedirect: "/login" }),
    (req, res) => {
      req.session.user = req.user; // Assign session to the logged-in user
  
      // Redirect based on the user's role
      if (req.user.role === "manager") {
        // res.send("Welcome to the Manager's dashboard!");
        res.redirect("/manager-dashboard-page");
      } else if (req.user.role === "sales-agent") {
        // res.send("Welcome to the Sales Agent's dashboard!");
        res.redirect("/sales-agent-dashboard-page");
      } else {
        res.send("User with that role does not exist in the system");
      }
    }
  );

// Logout route
router.get("/logout", (req, res) => {
    if (req.session) {
      req.session.destroy((err) => {
        if (err) {
          return res.status(500).send("Error logging out");
        }
        res.redirect("/");
      });
    } else {
      res.send("you donot have a session");
    }
  });

module.exports = router;