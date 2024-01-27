import express from "express";
import { createProduct, getProduct,getProducts, updateProduct } from "../controllers/productController.js";
const router = express.Router();


router.route('/').get(getProducts).post(createProduct);
router.route('/:id').get(getProduct).put(updateProduct);


export default router;
