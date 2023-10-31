const mongoose = require("mongoose");

const ongoingSchema = new mongoose.Schema({
image:{
    type:[String]
},
name:String,
date:String
});

const ongoingModel = mongoose.model(
  "ongoing",
  ongoingSchema
);
module.exports = ongoingModel;
