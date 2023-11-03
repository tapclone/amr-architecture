const mongoose = require("mongoose");

const interiorSchema = new mongoose.Schema({
image:{
    type:[String]
},
});

const interiorModel = mongoose.model(
  "interior",
  interiorSchema
);
module.exports = interiorModel;
