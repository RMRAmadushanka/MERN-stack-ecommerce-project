import asyncHandler from "../middleware/asyncHandler.js";
import Order from "../models/orderModel.js";

//@desc Create new Order
//@route GET /api/orders
//@access Private
const addOrderItems = asyncHandler(async (req, res) => {
  console.log(req.body);
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length == 0) {
    res.status(400);
    throw new Error("No order items");
  } else {
    const { user: userIdFromOrderItem, ...restOrderItem } = orderItems[0];

    const order = new Order({
      orderItems: [
        {
          ...restOrderItem,
          product: restOrderItem._id,
          _id: undefined,
        },
      ],
      user: userIdFromOrderItem,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });
    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  }
});

//@desc Get logged in user orders
//@route GET /api/myOrders
//@access Private
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ User: req.body._id });
  res.status(200).json(orders);
});

//@desc Get order by Id
//@route GET /api/orders/:id
//@access Private
const getOrderById = asyncHandler(async (req, res) => {
  console.log(req.params.orderId);
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );
  if (order) {
    res.status(200).json(order);
  } else {
    res.status(400);
    throw new Error("Order not found");
  }
});

//@desc Update order to paid
//@route PUT /api/orders/:id/pay
//@access Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };
    const updateOrder = await order.save();
    res.status(200).json(updateOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

//@desc Update order to delivered
//@route GET /api/orders/:id/deliver
//@access Private
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if(order) {
    order.isDeliverd = true;
    order.deliveredAt = Date.now();
    
    const updateOrder = await order.save();
    console.log("idddd",updateOrder);
    res.status(200).json(updateOrder)
  } else {
    res.status(404);
    throw new Error ('Order not found')
  }
});

//@desc Get all orders
//@route GET /api/orders
//@access Private
const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate('user', 'id name')
  res.status(200).json(orders)
});

export {
  addOrderItems,
  getMyOrders,
  getOrderById,
  getOrders,
  updateOrderToDelivered,
  updateOrderToPaid,
};
