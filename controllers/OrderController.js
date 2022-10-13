import { monitorOrdersUsingEventEmitter } from "../EventMonitors/OrderEventMonitor.js";
import {
  getCustomerOrderByUsername,
  getOrdersFromDB,
  insertOrder,
  updateOrderStatus,
} from "../models/OrderModel.js";
import { client } from "../index.js";

export const saveOrder = async (req, res) => {
  console.log("Inside saveOrder");
  const { cart, user, total, payemntId } = req.body;

  const pipeline = [
    {
      $match: {
        operationType: "insert",
        // 'fullDocument.address.market': 'Sydney'
      },
    },
  ];
  monitorOrdersUsingEventEmitter(client, 10000, "order created", pipeline);

  const added = await insertOrder({
    user: user,
    cart: cart,
    total: total,
    status: 0,
    payemntId: payemntId,
    createdOn: new Date(),
  });
  if (!added) {
    res.send({
      success: false,
      message: "Failed to add order",
    });
    res.end();
  }
  res.send({
    success: true,
    message: "order added successfully",
    product: added,
  });
};

export const getAllOrders = async (req, res) => {
  console.log("Inside getAllOrders");

  const orderlist = await getOrdersFromDB();
  if (!orderlist) {
    res.send({
      success: false,
      message: "Failed to get orders",
    });
    res.end();
  }
  res.send({
    success: true,
    message: "fetched orders successfully",
    orderlist: orderlist,
  });
};

export const updateOrder = async (req, res) => {
  console.log("Inside updateOrder");
  const { id, status } = req.body;
  console.log("Inside updateOrder", id, status);
  const pipeline = [
    {
      $match: {
        operationType: "update",
        // 'fullDocument.address.market': 'Sydney'
      },
    },
  ];
  monitorOrdersUsingEventEmitter(client, 60000, "order updated", pipeline);
  const updatedOrder = await updateOrderStatus(id, status);
  if (!updatedOrder) {
    res.send({
      success: false,
      message: "Failed to get orders",
    });
    res.end();
  }
  res.send({
    success: true,
    message: " order updated successfully",
  });
};
export const getCustomerOrder = async (req, res) => {
  console.log("Inside getCustomerOrder");
  const { user } = req.body;

  const customerOrders = await getCustomerOrderByUsername(user);
  if (!customerOrders) {
    res.send({
      success: false,
      message: "Failed to get orders",
    });
    res.end();
  }

  res.send({
    success: true,
    message: "fetched orders successfully",
    customerOrders: customerOrders,
  });
};
