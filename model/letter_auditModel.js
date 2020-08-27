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

const Letter_AuditSchema = new mongoose.Schema({
    letter_uuid:String,
    action:
    {
        type:String,
        enum:["RECEIVED","ACK_SENT","PROCESSED","REVIEWED","APPROVED"]
    },
    wf_id:String,
    action_date:String,
    notes:String
});

const Letter_Audit = mongoose.model('Letter_Audit', Letter_AuditSchema);

module.exports = Letter_Audit;