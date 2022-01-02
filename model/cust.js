const mongoose = require("mongoose");

const custSchema = new mongoose.Schema({
  name: {
    type: String  
   
  },
  email: {
    type: String  
    
  },
  company: {
    type: String    
    
  },
  place: {
    type: String    
    
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Customer", custSchema);
