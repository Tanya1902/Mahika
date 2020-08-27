const mongoose = require("mongoose");
const cryto = require("crypto");

mongoose
.connect("mongodb://localhost:27017/mahika", {
useNewUrlParser: true,
useCreateIndex: true,
useUnifiedTopology: true,
})
.then(function (db) {
// console.log(db);
console.log("Customer connected");
})
.catch(function (err) {
console.log(err);
});

const AuthorSchema = new mongoose.Schema({
    author_id:String,
    author_name:String,
    author_dob:Date,
    author_class_std: Number,
    author_gender: {
        type: String,
        enum:["Male","Female"]
    },
    email:String,
    phone:Number,
    institution:String,
    address1:String,
    address2:String,
    city:String,
    state:String,
    country:String,
    pincode:Number

})

const Author = mongoose.model('Author', AuthorSchema);

module.exports = Author;