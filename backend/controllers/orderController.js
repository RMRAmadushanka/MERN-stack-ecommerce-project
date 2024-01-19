import asyncHandler from "../middleware/asyncHandler.js";
import Order from "../models/orderModel.js";

//@desc Create new Order
//@route GET /api/orders
//@access Private
const addOrderItems = asyncHandler(async (req, res) => {
  res.json("add order Items");
});

//@desc Get logged in user orders
//@route GET /api/myOrders
//@access Private
const getMyOrders = asyncHandler(async (req, res) => {
  res.json("get mu orders");
});

//@desc Get order by Id
//@route GET /api/orders/:id
//@access Private
const getOrderById = asyncHandler(async (req, res) => {
  res.json("get order by id");
});

//@desc Update order to paid
//@route GET /api/orders/:id/pay
//@access Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  res.json("update order to paid");
});

//@desc Update order to delivered
//@route GET /api/orders/:id/deliver
//@access Private
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  res.json("update order to delivered");
});

//@desc Get all orders
//@route GET /api/orders
//@access Private
const getOrders = asyncHandler(async (req, res) => {
  res.json("get all orders");
});

export {
  addOrderItems,
  getMyOrders,
  getOrderById,
  getOrders,
  updateOrderToDelivered,
  updateOrderToPaid,
};
