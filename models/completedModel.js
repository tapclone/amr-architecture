const mongoose = require("mongoose");

const completedSchema = new mongoose.Schema({
image:{
    type:[String]
},
name:String,
date:String
});

const completedModel = mongoose.model(
  "completed",
  completedSchema
);
module.exports = completedModel;
