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

app.get('/products/:review_id/images', (req, res) => {
  Photo.findAll({
    where: {
      reviewId: req.params.review_id
    }
  }).then(data => res.send(data));
})

app.patch('/products/:id/helpful', (req, res) => {
  Review.update(
    { helpful_count: db.literal('helpful_count + 1') },
    { where: { id: req.params.id } }
  ).then(() => { Review.findByPk(req.params.id).then(data => res.send(data)) });

})

app.patch('/products/:id/not_helpful', (req, res) => {
  Review.update(
    { helpful_count: db.literal('helpful_count - 1') },
    { where: { id: req.params.id } }
  ).then(() => { Review.findByPk(req.params.id).then(data => res.send(data)) });

})

app.listen(port, () => {
  console.log('listening on 8004');
});