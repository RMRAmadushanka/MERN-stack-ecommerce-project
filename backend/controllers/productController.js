import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/productModel.js";

//@desc Fetch all products
//@route GET /api/products
//@access Public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

//@desc Fetch a products
//@route GET /api/products/:id
//@access Public
const getProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    return res.json(product);
  } else {
    res.status(404);
    throw new Error("Resource not found");
  }
});

//@desc Create a product products
//@route POST /api/product
//@access Private/admin
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: "Sample name",
    price: 0,
    user: req.body._id,
    image: "/images/sample.jpg",
    brand: "Sample category",
    category: "Sample category",
    countInStock: 0,
    numReviews: 0,
    description: "Sample description",
  });
  const createProduct = await product.save()
  res.status(201).json(createProduct)
});

//@desc Update the product
//@route PUT /api/product/:id
//@access Private
const updateProduct = asyncHandler(async (req, res) => {
  const {name,price, description, image, brand, category, countInStock } = req.body;

  const product = await Product.findById(req.params.id)

  if(product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image  = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock
    const updateProduct = await product.save();
  res.json(updateProduct)
  } else {
    res.status(404)
    throw new Error('Resourse not found')
  }

  
});



//@desc Delete the product
//@route DELETE /api/product/:id
//@access Private
const deleteProduct = asyncHandler(async (req, res) => {

  const product = await Product.findById(req.params.id)

  if(product) {
    await Product.deleteOne({_id: product._id})
    res.status(200).json({message:'Product deleted'})
  } else {
    res.status(404)
    throw new Error('Resourse not found')
  }

  
});

export { deleteProduct, getProduct, getProducts, createProduct, updateProduct };
