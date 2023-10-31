var express = require("express");
const {
  getLogin,
  postLogin,
  getHome,
  logout,
  postCompletedProjects,
  getAddCompletedProjects,
  deleteCompletedProject,
  deleteOngoingProject,
  getOngoing,
  getAddOngoingProjects,
  postOngoingProjects,
} = require("../controllers/adminController");
const {
  verifyAdminLoggedOut,
  verifyAdminLoggedIn,
} = require("../middlewares/Sessionhandle");
const upload = require("../middlewares/multer");
var router = express.Router();

/* GET users listing. */
router.route("/").get(verifyAdminLoggedIn, getLogin).post(postLogin);
 
router.route("/completed-projects").get(verifyAdminLoggedOut,getHome)
router.route('/add-completed-project').get(verifyAdminLoggedOut,getAddCompletedProjects).post(upload.array('Image',5),verifyAdminLoggedOut,postCompletedProjects);
router.route("/deleteCompletedProject/:id").get(verifyAdminLoggedOut,deleteCompletedProject)

router.route("/ongoing-projects").get(verifyAdminLoggedOut,getOngoing)
router.route('/add-ongoing-project').get(verifyAdminLoggedOut,getAddOngoingProjects).post(upload.array('Image',5),verifyAdminLoggedOut,postOngoingProjects);
router.route("/deleteOngoingProject/:id").get(verifyAdminLoggedOut,deleteOngoingProject)


router
.route('/logout')
.get(logout)
module.exports = router;
  