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
  getInteriors,
  getAddInteriorProjects,
  postInteriorProjects,
  deleteInteriorProject,
  getHomeSliders,
  postProjectSlider,
  AddImagesSlider,
  deleteSliderImage,
  deletInteriorProjectOne,
  postInteriorProjectsadd,
} = require("../controllers/adminController");
const {
  verifyAdminLoggedOut,
  verifyAdminLoggedIn,
} = require("../middlewares/Sessionhandle");
const upload = require("../middlewares/multer");
var router = express.Router();

/* GET users listing. */
router.route("/").get(verifyAdminLoggedIn, getLogin).post(postLogin);
 
router.route("/projects").get(verifyAdminLoggedOut,getHome)
router.route('/add-project').get(verifyAdminLoggedOut,getAddCompletedProjects).post(upload.array('Image',5),verifyAdminLoggedOut,postCompletedProjects);
router.route("/deleteCompletedProject/:id").get(verifyAdminLoggedOut,deleteCompletedProject)

router.route('/interiors').get(getInteriors)
router.route('/add-interior-project-all').post(upload.array('Image',20),verifyAdminLoggedOut,postInteriorProjects);
router.route('/add-interior-project-add').post(upload.array('Image',20),verifyAdminLoggedOut,postInteriorProjectsadd);
router.route("/deleteInteriorProject/:id").get(verifyAdminLoggedOut,deleteInteriorProject)
router.route("/deleteInteriorProjectOne/:id").get(verifyAdminLoggedOut,deletInteriorProjectOne)

router.route('/home-sliders').get(verifyAdminLoggedOut,getHomeSliders)
router.route('/add-slider-images-replace-all').post(verifyAdminLoggedOut,upload.array('Image',20),postProjectSlider)
router.route('/add-slider-images-add').post(verifyAdminLoggedOut,upload.array('Image',20),AddImagesSlider)

router.post('/deleteSliderImage',deleteSliderImage)

router
.route('/logout')
.get(logout)
module.exports = router;
  