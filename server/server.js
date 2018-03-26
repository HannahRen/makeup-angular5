var express = require('express');
var app = express();
var router = express.Router();

var productData = require('./products.json');
var products = productData.products;
var commenttData = require('./comments.json');
var comments = commenttData.comments;

router.get('/', (req, res) => {
  res.send('Hello Express');
});

router.get('/products', (req, res) => {
  let result = products
  let params = req.query

  if(params.title) {
    result = result.filter((p) => p.title.indexOf(params.title) !== -1)
  }

  if(params.price && result.length > 0) {
    result = result.filter((p) => p.price <= parseInt(params.price))
  }

  if(params.category && params.category !== "All" && result.length > 0) {
    result = result.filter((p) => p.category.indexOf(params.category) !== -1)
  }

  res.json(result);
});

router.get('/products/:id', (req, res) => {
  res.json(products.find((product) => product.id == req.params.id));
});

router.get('/comments', (req, res) => {
  res.json(comments);
});

router.get('/products/:productId/comments', (req, res) => {
  res.json(comments.filter((comment) => comment.productId == req.params.productId));
});

app.use('/api', router);

app.listen(8000, 'localhost', () => {
  console.log('Listen a server at http://localhost:8000');
});
