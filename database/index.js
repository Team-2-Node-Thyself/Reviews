const mongo_URI = require('./config.js').mongo_URI;
const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);

mongoose.connect( mongo_URI || 'mongodb://localhost/sdc', {poolSize: 10, useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;

db.on('error', (err) => {
  console.log('error connecting to database');
});

db.once('open', () => {
  console.log('connected to database');
});

const productSchema = new mongoose.Schema({
  productId: {type: Number, unique: true},
  name: String,
  price: String,
  description: String
});

const reviewsSchema = new mongoose.Schema({
  productId: {type: Number, unique: true},
  reviews: [
    {
      reviewId: Number,
      title: String,
      body: String,
      helpful_count: Number,
      username: String,
      overall_rating: Number,
      value_rating: Number,
      quality_rating: Number,
      would_recommend: Boolean,
      verified_purchaser: Boolean,
      images: [String],
      createdAt: String
    }
  ]
});


const Product = mongoose.model('product', productSchema);
const Reviews = mongoose.model('reviews', reviewsSchema);

module.exports = {
  Product: Product,
  Reviews: Reviews
}
