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

const LetterSchema = new mongoose.Schema({
    uuid:String,
    author_id: String,
    channel :{
        type: String,
        enum: ["EMAIL","WHATSAPP","WEBSITE","POST"],
    },
    author_name: String,
    author_class_std: Number,
    author_gender: {
        type: String,
        enum:["Male","Female"]
    },
    author_dob:{
        type:Date
    },
    author_city: String,
    primary_issue:{
        type:String,
        enum:["water","Poverty"]
    },
    secondary_issue:{
        type:String,
        enum:["water","Poverty"]
    },
    language:{
        type:String,
        enum:["Hindi","English"]
    },
    status:{
        type:String,
        enum:["NEW","INPROCESS","PROCESSED","REVIEWED","PUBLISHED"],
        default:"NEW"
    },
    rework_flag:{
        type:String,
        enum:["Y","N"]
    },
    theme:{
        type:String,
        enum:["Praise","Complain"]
    },
    includes_solution:{
        type:String,
        enum:["Y","N"]
    },
    received:{
        type:String
    },
    processed:{
        type:String
    },
    reviewed:{
        type:String
    },
    published:{
        type:String
    },
    letter:{
        type:String
    }
});

const Letter = mongoose.model('Letter', LetterSchema);

module.exports = Letter;