import { client } from "../index.js";
import { ObjectId } from "mongodb";

export function addProductToDB(data) {
  return client.db("foodzone").collection("products").insertOne(data);
}

export function editProductFromDB(_id, title,image, description, price) {
  return client
    .db("foodzone")
    .collection("products")
    .updateOne(
      { _id: ObjectId(_id) },
      { $set: { title: title, image:image,description: description, price: price } }
    );
}

export function getProductsFromDB() {
  return client.db("foodzone").collection("products").find().toArray();
}

export function deleteProductFromDB(data) {
  return client.db("foodzone").collection("products").deleteOne(data);
}
