const express = require('express');
const { getAllProducts, creatProduct, productDetails, deleteProduct, updateProduct, creatReview, getAllreviews, deleteReview } = require('../controller/productController');
const { isAuthenticated, authorizeRole } = require('../middlewere/auth');
const router = express.Router();
router.route("/products").get(getAllProducts);
router.route("/createProduct").post(isAuthenticated,authorizeRole,creatProduct);
router.route("/productDetails").get(productDetails);
router.route("/productDelandUpdate/:id").delete(deleteProduct).put(updateProduct);
router.route("/creatReview").put(isAuthenticated,creatReview);
router.route("/reviews").get(getAllreviews).delete(isAuthenticated,deleteReview);

module.exports=router;