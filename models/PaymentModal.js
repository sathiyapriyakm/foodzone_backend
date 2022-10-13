import { client } from "../index.js";
import { ObjectId } from "mongodb";

export function savePaymentDetails(data) {
  return client.db("foodzone").collection("payments").insertOne(data);
}
