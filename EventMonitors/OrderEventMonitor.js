import { client, io, activeUsers } from "../index.js";
import { getOrderById } from "../models/OrderModel.js";
import { closeChangeStream } from "./EventMonitor.js";

export async function monitorOrdersUsingEventEmitter(
  client,
  timeInMs = 10000,
  emmiterName,
  pipeline = []
) {
  const collection = client.db("foodzone").collection("orders");
  const changeStream = collection.watch(pipeline);
  changeStream.on("change", async (next) => {
    console.log("products next change is ", next);
    let flag = false;
    if (emmiterName == "order updated") {
      const order = await getOrderById(next.documentKey._id);
      console.log("order in  next change is ", order);
      console.log("order in  next change is ", activeUsers);

      activeUsers.forEach((user) => {
        if (user.username === order.user) {
          console.log("inside if of  active user", user);
          io.to(user.socketId).emit(emmiterName, next);
          flag = true;
        }
      });

      if (!flag) {
        io.emit(emmiterName, next);
      }
    } else {
      io.emit(emmiterName, next);
    }
  });
  // Wait the given amount of time and then close the change stream
  await closeChangeStream(timeInMs, changeStream); //
}
