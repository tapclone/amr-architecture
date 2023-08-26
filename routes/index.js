var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("user/Home");
});

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

// route to fetch the upcoming and ongoing projects
router.get('/upcoming-projects',(req,res)=>{
  res.render('user/ongoing-projects')
})


//get gallery page
router.get('/gallery',(req,res)=>{
  res.render('user/Gallery')
})

// route to fetch the completed projects
router.get('/completed-projects',(req,res)=>{
  res.render('user/completed-projects')
})
module.exports = router;
