const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const GallerySchema = new Schema(
  {
    galleryOwner:{type:Schema.Types.ObjectId, ref:"User", required: true},
    galleryName:{type:String, required: true},
   //not sure if I need to have this line because photo requires gallery
    // photos:[{type:Schema.Types.ObjectId, ref:"Photo", required: true}],

    

    
  
  },

  {
    // additional settings for the Schema class
    timestamps: true
  }
);

// "User" model -> "users" collection
const Gallery = mongoose.model("Gallery", GallerySchema);

module.exports = Gallery;