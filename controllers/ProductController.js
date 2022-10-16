import {
  addProductToDB,
  getProductsFromDB,
  deleteProductFromDB,
  editProductFromDB,
} from "../models/ProductModel.js";

import { ObjectId } from "mongodb";

export const addProduct = async (req, res) => {
  console.log("Inside addProduct");
  const { title,image, description, price } = req.body;
  const added = await addProductToDB({
    title: title,
    image:image,
    description: description,
    price: price,
  });
  if (!added) {
    res.send({
      success: false,
      message: "Failed to add product",
    });
    res.end();
  }
  res.send({
    success: true,
    message: "product added successfully",
    product: added,
  });
};

export const editProduct = async (req, res) => {
  console.log("Inside editProduct");
  const { _id, title,image, description, price } = req.body;
  console.log(_id, title,image, description, price);
  console.log(`-${_id}-`);
  console.log(String(_id));
  const updated = await editProductFromDB(_id, title,image, description, price);
  console.log(updated);
  if (!updated) {
    res.send({
      success: false,
      message: "Failed to add product",
    });
    res.end();
  }
  res.send({
    success: true,
    message: "product added successfully",
    // product: added,
  });
};

export const getProductList = async (req, res) => {
  console.log("Inside getProductList");
  const productlist = await getProductsFromDB();
  if (!productlist) {
    res.send({ success: false, message: "Failed to add product" });
    res.end();
  }
  res.send({
    success: true,
    productlist: productlist,
    message: "product added successfully",
  });
};
export const deleteProduct = async (req, res) => {
  console.log("Inside deleteProduct");
  const { id } = req.body;
  const isDeleted = await deleteProductFromDB({ _id: ObjectId(id) });
  console.log("isDeleted", isDeleted);
  if (!isDeleted) {
    res.send({ success: false, message: "Failed to delete product" });
    res.end();
  }
  res.send({
    success: true,
    message: "product deleted successfully",
  });
};
