const express = require('express');

const router = express.Router();

const sellProductController = require('../controllers/sellProductController')
const getAllProductsController = require('../controllers/getAllProductsController')
const searchProductsController = require('../controllers/searchProductsController');

/*
    Routes Related To Selling A Product, Updating It, Deleting It,
 */

router.post('/sell', sellProductController)

/*
    Fetch All Products Route
 */
router.get('/', getAllProductsController)

/*
    Search Products Route
 */
router.post('/search', searchProductsController)

module.exports = router

