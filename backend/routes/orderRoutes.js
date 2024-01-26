import express from "express";
const router = express.Router();

import {
  addOrderItems,
  getMyOrders,
  getOrderById,
  getOrders,
  updateOrderToDelivered,
  updateOrderToPaid,
} from "../controllers/orderController.js";

import { admin, protect } from "../middleware/authmiddleware.js";

router.route("/").post( addOrderItems).get( getOrders);
router.route("/mine").get( getMyOrders);
router.route("/:id").get( getOrderById);
router.route("/:id/pay").put( updateOrderToPaid);
router.route("/:id/deliver").put(updateOrderToDelivered);

export default router;
