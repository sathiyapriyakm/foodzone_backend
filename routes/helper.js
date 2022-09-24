
import { client } from "../index.js";
import { ObjectId } from "mongodb";

//----------------------USERS------------------------------

export async function getUserByName(Email) {
    //db.users.findOne({username: username });
  return await client.db("foodZone").collection("users").findOne({ Email: Email });
}
export async function getUserById(id) {
  //db.users.findOne({_id: id });
  return await client.db("foodZone").collection("users").findOne({ _id:ObjectId(id)});
}

export async function createUser(data) {
    //db.users.insertOne(data);
  return await client.db("foodZone").collection("users").insertOne(data);
}


export async function getUserByEmail(Email) {
    //db.users.findOne({username: username });
  return await client.db("foodZone").collection("users").findOne({Email: Email});
  
}
//----------------------ADMIN--------------------------

export async function createAdmin(data) {
  //db.users.insertOne(data);
return await client.db("foodZone").collection("admin").insertOne(data);
}
export async function getUserByAdminEmail(Email) {
  //db.users.findOne({username: username });
return await client.db("foodZone").collection("admin").findOne({ Email: Email });
}


//----------------------PRODUCTS-------------------------

export async function getAllProducts() {
    return await client.db("foodZone").collection("products").find({}).toArray();
  }
