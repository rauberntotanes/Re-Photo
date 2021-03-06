const mongoose = require('mongoose');
require('dotenv').config();

const MONGO_URI = "";

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopolog: true,
    dbName: 'uploads'
  })
  .then(() => console.log('Connected to Mongo DB.'))
  .catch((err) => console.log(err));

const Schema = mongoose.Schema;

const uploadSchema = new Schema({
  name: String,
  date: String,
  genre: String,
  aperture: String,
  shutterSpeed: String,
  iso: String,
  lighting: String,
  notes: String,
});

const Uploads = mongoose.model('uploads', uploadSchema);

module.exports = Uploads;
