const express = require("express");
const Photo = require("../models/photo-model.js");
const router = express.Router();

//send recieved photo info to database

// POST /phones - Create a new phone (add to the list)
router.post("/photos", (req, res, next) => {
  const { url, width, height,} = req.body;
  const photoOwner= req.user._id;

  Photo.create({ photoOwner, url, width, height, })
    // send the query results as a JSON response to the client
    .then(photoDoc => res.json(photoDoc))
    .catch(err => next(err));


});

router.get("/photos", (req, res, next)=>{
 
    Photo.find({photoOwner: req.user._id, isChosen: false, hasBeenSeen: false})
      
      .limit(6)
      
      // send the query results as a JSON response to the client
      .then(photoResults => res.json(photoResults))
      .catch(err => next(err));
  });

  // update if photo has been selected

  router.put("/photos", (req, res, next) => {
    const { selectedIds, seenIds } = req.body;
  
    Photo.updateMany(
      { _id: selectedIds, photoOwner: req.user._id },
      { $set: { isChosen: true } },
      // "new" gets the update version of the document
      { runValidators: true, new: true },
    )
    .then(() => {
      Photo.updateMany(
        { _id: seenIds, photoOwner: req.user._id },
        { $set: { hasBeenSeen: true } },
        // "new" gets the update version of the document
        { runValidators: true, new: true },
      )
      .then(() => res.json({ result: "Culling successful." }))
      .catch(err => next(err));
    })
    .catch(err => next(err));
  });


 


module.exports = router;