const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/sdc', {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;

db.on('error', (err) => {
  console.log('error connecting to database');
});

db.once('open', () => {
  console.log('connected to database');
});

const productSchema = new mongoose.Schema({
  productId: Number,
  name: String,
  price: String,
  description: String
});

const reviewsSchema = new mongoose.Schema({
  productId: Number,
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
      images: [String]
    }
  ]
});


const Product = mongoose.model('product', productSchema);
const Reviews = mongoose.model('reviews', reviewsSchema);

module.exports = {
  Product: Product,
  Reviews: Reviews
}
