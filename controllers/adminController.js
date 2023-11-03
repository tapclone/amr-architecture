const completedModel = require("../models/completedModel");

require("dotenv").config();
const adminid = process.env.ADMIN_USERNAME;
const adminPassword = process.env.ADMIN_PASSWORD;
const fs = require('fs');
const path = require('path');
const ongoingModel = require("../models/interiorModel");
const interiorModel = require("../models/interiorModel");
const homeSliderModel = require("../models/HomeSliderModel");
const { homedir } = require("os");

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
          res.redirect("admin/projects");
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
      res.redirect("/admin/projects");
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
        res.redirect('/admin/projects')
      })
    })
  },
  getInteriors:(req,res)=>{
    interiorModel.find({}).lean().then((projects)=>{
      res.render("admin/interior",{projects});
    })
  },
  getAddInteriorProjects: (req, res) => {
    res.render("admin/interiorAdd");
  },
  postInteriorProjects: async (req, res) => {
    try {
      let imagesFileNames = req.files.map((file) => {
        return file.filename;
      });

      const project = await interiorModel.findOne({});

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
      project.image=imagesFileNames
      await project.save();
      res.redirect("/admin/interiors");
    } catch (err) {
      res.status(500).json({ msg: "Error Occured" });
    }
  },
  postInteriorProjectsadd: async (req, res) => {
    try {
      let imagesFileNames = req.files.map((file) => {
        return file.filename;
      });

      const project = await interiorModel.findOne({});
      project.image=project.image.concat(imagesFileNames)       
      await project.save();
      res.redirect("/admin/interiors");
    } catch (err) {
      res.status(500).json({ msg: "Error Occured" });
    }
  },
  deleteInteriorProject:(req,res)=>{
   try{
    const projectId = req.params.id;
    interiorModel.findById(projectId).then((project)=>{
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
      project.image=[]
      project.save()
        res.redirect('/admin/interiors')

      // ongoingModel.deleteOne({ _id: projectId }).then(()=>{
      // })
    })
   }catch(err){
    console.log(err);
   }
  },
  getHomeSliders:(req,res)=>{
  try{
    homeSliderModel.find({}).lean().then((projects)=>{
      const slider =projects[0]
      res.render("admin/HomeSliders",{slider});
    })
  }catch(err){
    console.log(err);
  }
  },
  deletInteriorProjectOne:async(req,res)=>{
    const image = req.params.id
    try{
      const interiorImages = await interiorModel.findOne({}) 
      interiorImages.image = interiorImages.image.filter(
        (img) => img !== image
      );
      interiorImages.save()
      const filePath = path.join(__dirname, '../public/uploads', image);
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error('Error deleting file:', err);
        }});
      res.redirect('/admin/interiors')
    }catch(err){
      console.log(err);
    }
 
  },
  postProjectSlider:async(req,res)=>{
    try{ 
      console.log(req.body);
      const field = req.body.field
      let imagesFileNames = req.files.map((file) => {
        return file.filename;
      });
      const homeSlider =await homeSliderModel.findOne({})
      if(field==='project'){
        if (homeSlider.projectImage && Array.isArray(homeSlider.projectImage)) {
          homeSlider.projectImage.forEach((fileName) => {
            const filePath = path.join(__dirname, '../public/uploads', fileName);
            fs.unlink(filePath, (err) => {
              if (err) {
                console.error('Error deleting file:', err);
              }
            });
          });
        }
        homeSlider.projectImage=imagesFileNames
      }else if(field ==='residential'){
        if (homeSlider.residentialImage && Array.isArray(homeSlider.residentialImage)) {
          homeSlider.residentialImage.forEach((fileName) => {
            const filePath = path.join(__dirname, '../public/uploads', fileName);
            fs.unlink(filePath, (err) => {
              if (err) {
                console.error('Error deleting file:', err);
              }
            });
          });
        }
        homeSlider.residentialImage=imagesFileNames
      }else if(field ==='resort'){
        if (homeSlider.resortImage && Array.isArray(homeSlider.resortImage)) {
          homeSlider.resortImage.forEach((fileName) => {
            const filePath = path.join(__dirname, '../public/uploads', fileName);
            fs.unlink(filePath, (err) => {
              if (err) {
                console.error('Error deleting file:', err);
              }
            });
          });
        }
        homeSlider.resortImage=imagesFileNames
      }else if(field ==='commercial'){
        if (homeSlider.commercialImage && Array.isArray(homeSlider.commercialImage)) {
          homeSlider.commercialImage.forEach((fileName) => {
            const filePath = path.join(__dirname, '../public/uploads', fileName);
            fs.unlink(filePath, (err) => {
              if (err) {
                console.error('Error deleting file:', err);
              }
            });
          });
        }
        homeSlider.commercialImage=imagesFileNames
      }
      await homeSlider.save()
      res.redirect('/admin/home-sliders')
    }catch(err){
      console.log(err);
    }
  },
  AddImagesSlider:async(req,res)=>{
    try{ 
      console.log(req.body);
      const field = req.body.field
      let imagesFileNames = req.files.map((file) => {
        return file.filename;
      });
      const homeSlider =await homeSliderModel.findOne({})
      if(field==='project'){
        homeSlider.projectImage= homeSlider.projectImage.concat(imagesFileNames)
        console.log(homeSlider.projectImage);
      }else if(field ==='residential'){
        homeSlider.residentialImage=  homeSlider.residentialImage.concat(imagesFileNames)
      }else if(field ==='resort'){
        homeSlider.resortImage= homeSlider.resortImage.concat(imagesFileNames)
      }else if(field ==='commercial'){
        homeSlider.commercialImage = homeSlider.commercialImage.concat(imagesFileNames)
      }
      await homeSlider.save()
      res.redirect('/admin/home-sliders')
    }catch(err){
      console.log(err);
    }
  },
  deleteSliderImage:async(req,res)=>{
    console.log(req.body);
    const {image,field} = req.body
    try{
      const homeSlider = await homeSliderModel.findOne({})
      if (field === 'project') {
        homeSlider.projectImage = homeSlider.projectImage.filter(
          (img) => img !== image
        );
      } else if (field === 'residential') {
        homeSlider.residentialImage = homeSlider.residentialImage.filter(
          (img) => img !== image
        );
      } else if (field === 'resort') {
        homeSlider.resortImage = homeSlider.resortImage.filter((img) => img !== image);
      } else if (field === 'commercial') {
        homeSlider.commercialImage = homeSlider.commercialImage.filter(
          (img) => img !== image
        );
      }
      const filePath = path.join(__dirname, '../public/uploads', image);
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error('Error deleting file:', err);
        }});
      await homeSlider.save()
      res.redirect('/admin/home-sliders')
    }catch(err){
      console.log(err);
    }
  }
};
