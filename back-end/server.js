const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

const mongoose = require('mongoose');

// connect to the database
mongoose.connect('mongodb://localhost:27017/cp3', {
  useNewUrlParser: true
});


// Create a scheme for items in the museum: a title and a path to an image.
// const carSchema = new mongoose.Schema({
//   make: String,
//   price: String,
//   model: String,
//   status: String,
//   color: String,
// });
//
// const Car = mongoose.model('Car', carSchema);

// const commentSchema = new mongoose.Schema({
//   name: String,
//   text: String,
//   car: {type: mongoose.Schema.ObjectId, ref: "Car"}
// });



app.get('/api/cars/', async (req, res) => {
  console.log("getting comments");
  try {
    let cars = await Item.find();
    res.send(cars);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});


app.get('/api/cars/:id', async (req, res) => {
  console.log("getting comments");
  try {
    let car = await Item.findOne({_id: req.params.id});
    res.send(car);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});





// Create a model for items in the museum.

// Create a new item in the museum: takes a title and a path to an image.
/*app.post('/api/items', async (req, res) => {
  const item = new Item({
    id: req.body.id,
    comments: [], //how to add to comments not replace with one value
  });
  try {
    await item.save();
    res.send(item);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});*/

// Create a new item in the museum: takes a title and a path to an image.
/*app.put('/api/items/comment', async (req, res) => {
  console.log("new comment");
  var item = await Item.findOne({id:req.body.id});
  if(item == null){
    var item = new Item({
      id: req.body.id,
      comments: [],
    });
    await item.save();
    var item = await Item.findOne({id:req.body.id});
  }
  item.comments.push({name: req.body.name, text: req.body.comments, id: req.body.commentid});
  try {
    await item.save();
    res.send(item);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});
*/



// app.get('/api/items/comment/:id', async (req, res) => {
//   console.log("getting comments");
//   var item = await Item.findOne({id:req.params.id});
//   if(item == null){
//     var item = new Item({
//       id: req.params.id,
//       comments: [],
//     });
//     await item.save();
//     var item = await Item.findOne({id:req.params.id});
//   }
//   try {
//     res.send(item);
//   } catch (error) {
//     console.log(error);
//     res.sendStatus(500);
//   }
// });


// app.put('/api/items/comment/:id/:commentid', async (req, res) => {
//   try{
//     console.log("deleting comments");
//     //Item.update({ id: req.params.id }, { "$pull": { "comments": { "id": req.params.commentid } }})//,{ safe: true, multi:true }, function(err, obj) {});
//     var item = await Item.findOne({id:req.params.id});
//     item.comments.splice(item.comments.indexOf(req.body.comment),1);
//     await item.save();
//     //loop through and find matching id and delete comment like in grocery cart delete
//     //also call item.save
//
//
//     //console.log(item);
//     //item.comments.filter(comment => comment.id == req.body.id);
//
//
//     //let carindex = req.params.id;
//     //let commentindex = this.$root.$data.products[carindex].comments.findIndex(car=>car.id == commentid)
//     //this.$root.$data.products[carindex].comments.splice(commentindex, 1)
//       res.sendStatus(200);
//   } catch (error) {
//     console.log(error);
//     res.sendStatus(500);
//   }
// })




// app.put('/api/items/comment/edit/:id/:commentid', async (req, res) => {
//   try{
//     console.log("editing comments");
//     //Item.update({ id: req.params.id }, { "$pull": { "comments": { "id": req.params.commentid } }})//,{ safe: true, multi:true }, function(err, obj) {});
//     var item = await Item.findOne({id:req.params.id});
//
//
//     //item.comments.splice(item.comments.indexOf(req.body.comment),1);
//     await item.save();
//     //loop through and find matching id and delete comment like in grocery cart delete
//     //also call item.save
//
//
//     //console.log(item);
//     //item.comments.filter(comment => comment.id == req.body.id);
//
//
//     //let carindex = req.params.id;
//     //let commentindex = this.$root.$data.products[carindex].comments.findIndex(car=>car.id == commentid)
//     //this.$root.$data.products[carindex].comments.splice(commentindex, 1)
//       res.sendStatus(200);
//   } catch (error) {
//     console.log(error);
//     res.sendStatus(500);
//   }
// })


const cookieParser = require("cookie-parser");
app.use(cookieParser());

const cookieSession = require('cookie-session');
app.use(cookieSession({
  name: 'session',
  keys: [
    'secretValue'
  ],
  cookie: {
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));



const users = require("./users.js");

app.use("/api/users", users.routes);
const cars = require("./cars.js");

app.use("/api/cars", cars.routes);

const comments = require("./comments.js");
app.use("/api/comments", comments.routes);


app.listen(3000, () => console.log('Server listening on port 3000!'));
