const mongoose = require("mongoose");

const homeSliderSchema = new mongoose.Schema({
projectImage:{
    type:[String]
},
residentialImage:{
    type:[String]
},
resortImage:{
    type:[String]
},
commercialImage:{
    type:[String]
},

});

const homeSliderModel = mongoose.model(
  "homeSliders",
  homeSliderSchema
);
module.exports = homeSliderModel;
