const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const uploadSchema = new Schema ({
  subjectname:String,
  name: String,
  teachername:String,
  videoPath: String,
  insertgrade:String
})
module.exports = mongoose.model('Upload', uploadSchema,'uploads');


