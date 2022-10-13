import { client } from "../index.js";
import { ObjectId } from "mongodb";

export function insertOrder(data) {
  return client.db("foodzone").collection("orders").insertOne(data);
}

export function getOrdersFromDB() {
  return (
    client
      .db("foodzone")
      .collection("orders")
      // .aggregate([{ $unwind: "$cart" }])

      .find({ status: { $ne: 3 } })
      .toArray()
  );
}

export function updateOrderStatus(_id, status) {
  return client
    .db("foodzone")
    .collection("orders")
    .updateOne({ _id: ObjectId(_id) }, { $set: { status: status } });
}
export function getCustomerOrderByUsername(user) {
  return client
    .db("foodzone")
    .collection("orders")
    .find({ user: user })
    .toArray();
}

export function getOrderById(_id) {
  return client
    .db("foodzone")
    .collection("orders")
    .findOne({ _id: ObjectId(_id) });
}
