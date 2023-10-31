const completedModel = require("../models/completedModel");

require("dotenv").config();
const adminid = process.env.ADMIN_USERNAME;
const adminPassword = process.env.ADMIN_PASSWORD;
const fs = require('fs');
const path = require('path');
const ongoingModel = require("../models/ongoingModel");

module.exports = {
  getLogin: (req, res) => {
    res.render("admin/login");
  },
  postLogin: (req, res) => {
    const { email, password } = req.body;
    try {
      if (!email || !password) {
        res.status(200).send({ msg: "enter all fields", succes: false });
      }
      if (email === adminid) {
        if (password === adminPassword) {
          req.session.login = true;
          res.redirect("admin/completed-projects");
        } else {
          res
            .status(200)
            .send({ msg: "Invalid email or password ", succes: false });
        }
      } else {
        res
          .status(200)
          .send({ msg: "Invalid email or password ", succes: false });
      }
    } catch (err) {
      res
        .status(500)
        .send({ msg: "error occurred at admin login", succes: false });
    }
  },
  getHome: (req, res) => {
    completedModel.find({}).lean().then((projects)=>{
      res.render("admin/CompletedProjects",{projects});
    })
  },
  getOngoing: (req, res) => {
    ongoingModel.find({}).lean().then((projects)=>{
      res.render("admin/ongoingProjects",{projects});
    })
  },
  getAddCompletedProjects: (req, res) => {
    res.render("admin/completedProjectsAdd");
  },
  getAddOngoingProjects: (req, res) => {
    res.render("admin/ongoingProjectsAdd");
  },
  postCompletedProjects: async (req, res) => {
    const { name, date } = req.body;
    try {
      let imagesFileNames = req.files.map((file) => {
        return file.filename;
      });
      const data = {
        name,
        date,
        image: imagesFileNames,
      };
      const newProject = new completedModel(data);
      await newProject.save();
      res.redirect("/admin/completed-projects");
    } catch (err) {
      res.status(500).json({ msg: "Error Occured" });
    }
    // console.log(req.files);
  },
  postOngoingProjects: async (req, res) => {
    const { name, date } = req.body;
    try {
      let imagesFileNames = req.files.map((file) => {
        return file.filename;
      });
      const data = {
        name,
        date,
        image: imagesFileNames,
      };
      const newProject = new ongoingModel(data);
      await newProject.save();
      res.redirect("/admin/ongoing-projects");
    } catch (err) {
      res.status(500).json({ msg: "Error Occured" });
    }
    // console.log(req.files);
  },
  logout: (req, res) => {
    req.session.login = null;
    res.redirect("/admin");
  },
  deleteCompletedProject:(req,res)=>{
    const projectId = req.params.id;
    completedModel.findById(projectId).then((project)=>{
      console.log(project);
      if (project.image && Array.isArray(project.image)) {
        project.image.forEach((fileName) => {
          const filePath = path.join(__dirname, '../public/uploads', fileName);
          fs.unlink(filePath, (err) => {
            if (err) {
              console.error('Error deleting file:', err);
            }
          });
        });
      }
      completedModel.deleteOne({ _id: projectId }).then(()=>{
        res.redirect('/admin/completed-projects')
      })
    })
  },
  deleteOngoingProject:(req,res)=>{
    const projectId = req.params.id;
    ongoingModel.findById(projectId).then((project)=>{
      console.log(project);
      if (project.image && Array.isArray(project.image)) {
        project.image.forEach((fileName) => {
          const filePath = path.join(__dirname, '../public/uploads', fileName);
          fs.unlink(filePath, (err) => {
            if (err) {
              console.error('Error deleting file:', err);
            }
          });
        });
      }
      ongoingModel.deleteOne({ _id: projectId }).then(()=>{
        res.redirect('/admin/ongoing-projects')
      })
    })
  },
};
