var express = require("express");
const {  getCompleted, getInteriors, getHomeSlider } = require("../controllers/userController");
var router = express.Router();

/* GET home page. */
router.get("/",getHomeSlider);

// get contact page
router.get("/contact", (req, res) => {
  res.render("user/Contact");
});

// get contact page
router.get("/about", (req, res) => {
  res.render("user/About");
});

// get service page
router.get("/services", (req, res) => {
  res.render("user/Services");
});


//get gallery page
router.get('/gallery',getInteriors)

// route to fetch the completed projects
router.get('/projects',getCompleted)
module.exports = router;
