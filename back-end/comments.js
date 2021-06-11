const mongoose = require('mongoose');
const express = require("express");
const router = express.Router();

const users = require("./users.js");
const User = users.model;
const validUser = users.valid;
const cars = require("./cars.js");
const Car = cars.model;


const commentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  car: {
	type: mongoose.Schema.ObjectId,
	ref: 'Car'
  },
  carid: String,
  name: String,
  description: String,
  created: {
    type: Date,
    default: Date.now
  },
});

const Comment = mongoose.model('Comment', commentSchema);



// upload comment
router.post("/:id", validUser, async (req, res) => {
  try {
	const comment = new Comment({
    user: req.body.user,
    car: req.body.car,
    name: req.body.name,
    carid: req.params.id,
    description: req.body.description,
  });
  console.log(comment);
    await comment.save();
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});




// get all comments    how to get them to work with specific photo?
router.get("/:id", async (req, res) => {
  console.log("in back end getting comments: " + req.params.id);
  try {
    //let tempCar = await Car.findOne({_id:req.params.id});
    let comments = await Comment.find({carid: req.params.id}).populate("user");
    console.log(comments);
    //let comments = await Comment.find({_id: req.params.id});//.populate("user");
    res.send(comments);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});



// remove comment
// router.delete("/:id", async (req, res) => {
//   // let tempCar = await Car.findOne({_id:req.params.id});
//   // let comments = await Comment.find({photo: tempPhoto}).populate("user");
//   try{
//       await Comment.deleteOne({
//         id:req.params.carid,
//       });
//       res.sendStatus(200);
//   } catch (error) {
//     console.log(error);
//     res.sendStatus(500);
//   }
// })



router.delete("/:id", validUser, async (req, res) => {
console.log("comment id is " + req.params.id);
  try{
      await Comment.deleteOne({
        _id:req.params.id
      });
      res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
})



router.put('/:id', validUser, async (req, res) => {
  try{
    let comment = await Comment.findOne({
      _id:req.params.id
    });
    comment.name = req.body.name;
    comment.description = req.body.description;
    comment.save();
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
})


module.exports = {
  model: Comment,
  routes: router,
}
