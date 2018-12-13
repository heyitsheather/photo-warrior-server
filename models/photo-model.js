const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const photoSchema = new Schema(
  {
    photoOwner:{type:Schema.Types.ObjectId, ref:"User", required: true},
    gallery:{type:Schema.Types.ObjectId, ref:"Gallery"},
    isChosen:{type:Boolean, default: false},
    choosers: [{type:Schema.Types.ObjectId, ref:"User"}],
    url: {type:String, required: true},
    width: {type:Number, required: true},
    height: {type:Number, required: true},
    hasBeenSeen: {type:Boolean, default:false},

    
  
  },

  {
    // additional settings for the Schema class
    timestamps: true
  }
);

// "User" model -> "users" collection
const Photo = mongoose.model("Photo", photoSchema);

module.exports = Photo;