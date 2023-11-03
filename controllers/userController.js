const homeSliderModel = require("../models/HomeSliderModel");
const completedModel = require("../models/completedModel");
const interiorModel = require("../models/interiorModel");
const ongoingModel = require("../models/interiorModel");

module.exports={
    getOngoing:(req,res)=>{
        ongoingModel.find({}).lean().then((projects)=>{
            res.render("user/ongoing-projects",{projects});
          })
    },
    getCompleted:(req,res)=>{
        completedModel.find({}).lean().then((projects)=>{
            res.render("user/completed-projects",{projects});
          })
    },
    getInteriors:(req,res)=>{
        interiorModel.find({}).lean().then((projects)=>{
            const interiorProjects=projects[0]
            console.log(interiorProjects);
            res.render("user/Gallery",{interiorProjects});
          })
    },
    getHomeSlider:(req,res)=>{
        try{
            homeSliderModel.find({}).lean().then((projects)=>{
              const slider =projects[0]
              res.render("user/Home",{slider});
            })
          }catch(err){
            console.log(err);
          }
    }
}