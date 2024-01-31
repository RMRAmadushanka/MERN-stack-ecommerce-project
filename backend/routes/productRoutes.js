import express from "express";
import { createProduct, createProductReview, deleteProduct, getProduct,getProducts, getTopProducts, updateProduct } from "../controllers/productController.js";
const router = express.Router();


router.route('/').get(getProducts).post(createProduct);
router.route('/top').get(getTopProducts)
router.route('/:id').get(getProduct).put(updateProduct).delete(deleteProduct);
router.route('/:id/reviews').post(createProductReview)


export default router;
