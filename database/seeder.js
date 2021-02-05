const { Product, Reviews } = require('./index.js');
const faker = require('faker');
const { dateFaker } = require('date-faker');

let productDocs = [];
let reviewsDocs = [];

const getRating = () => {
  let ratings = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
  return ratings[Math.floor(Math.random() * 10)];
};

let imageCountOptions = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 1, 1, 1, 1];
let reviewId = 1;


const seed = async () => {
  for (let i = 0; i < 10000000; i++) {

    //create product document
    let newProduct = {
      productId: i,
      price: '7.99',
      name: faker.lorem.words(),
      description: faker.lorem.paragraph()
    };
    //create reviews document for that product
    let reviewCount = Math.floor(Math.random() * 11) + 1;
    let newReviews = {
      productId: i,
      reviews: []
    }
    for (let j = 0; j < reviewCount; j++, reviewId++) {
      let imageCount = imageCountOptions[Math.floor(Math.random() * 17)];
      let vRating = getRating();
      let qRating = getRating();
      let oRating = (vRating + qRating) / 2;
      let monthOffset = Math.floor(Math.random() * 4) * -1;
      let dayOffset = Math.floor(Math.random() * 25) * -1;
      dateFaker.addAndReset({month: monthOffset, day: dayOffset});

      newReviews.reviews.push({
        reviewId: reviewId,
        title: faker.lorem.words(),
        body: faker.lorem.paragraph(),
        helpful_count: Math.floor(Math.random() * 20),
        value_rating: vRating,
        quality_rating: qRating,
        overall_rating: oRating,
        would_recommend: Math.random() > 0.5 ? true : false,
        verified_purchaser: Math.random() > 0.7 ? true : false,
        images: [],
        createdAt: new Date()
      });

      for (let k = 0; k < imageCount; k++) {
        newReviews.reviews[newReviews.reviews.length - 1].images.push(`https://loremflickr.com/320/240?${faker.random.word()}`);
      }
    }

    reviewsDocs.push(newReviews);
    productDocs.push(newProduct);

    if (reviewsDocs.length >= 10000 || i >= 10000000 - 1) {

      await Product.collection.insertMany(productDocs);
      await Reviews.collection.insertMany(reviewsDocs);


      reviewsDocs = [];
      productDocs = [];
    }


  }
}
seed();