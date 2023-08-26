var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('admin/home')
});
router.get('/upcoming-projects', function(req, res, next) {
  res.render('admin/upcoming-projects')
});

module.exports = router;
