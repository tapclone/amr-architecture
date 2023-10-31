const completedModel = require("../models/completedModel");
const ongoingModel = require("../models/ongoingModel");

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
    }
}