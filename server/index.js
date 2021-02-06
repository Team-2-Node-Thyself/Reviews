const newrelic = require('newrelic');
const express = require('express');
const app = express();
const path = require('path');
const port = 8004;
const { Reviews, Product } = require('../database');
const cors = require('cors');
const compression = require('compression');

app.use(cors());
app.use(compression())
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));
app.use('/bundle', express.static('public/dist/bundle.js'));


app.get('/products/:product_id/reviews', (req, res) => {
  console.time('query');
  Reviews.findOne({productId: req.params.product_id})
    .then((data) => {
      console.timeEnd('query');
      return data;
    })
    .then(data => res.send(data));
})

app.patch('/products/:product_id/:review_id/helpful', (req, res) => {

  Reviews.findOne({productId: req.params.product_id})
    .then(doc => {
      let item = doc.reviews.find(({ reviewId }) =>  reviewId === Number(req.params.review_id));
      item.helpful_count++;
      doc.save();
      res.status(200).end();
    })
    .catch(err => {
      res.status(500).send(err);
    });

})

app.patch('/products/:product_id/:review_id/not_helpful', (req, res) => {
  Reviews.findOne({productId: req.params.product_id})
    .then(doc => {
      let item = doc.reviews.find(({ reviewId }) =>  reviewId === Number(req.params.review_id));
      item.helpful_count--;
      doc.save();
      res.status(200).end();
    })
    .catch(err => {
      res.status(500).send(err);
    });

})

app.listen(port, () => {
  console.log('listening on 8004');
});