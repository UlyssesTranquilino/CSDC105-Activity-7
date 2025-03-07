let products = require("../data/products");
const { writeDataToFile } = require("../utils");

function findAll() {
  return new Promise((resolve, reject) => {
    resolve(products);
  });
}

function findById(id) {
  return new Promise((resolve, reject) => {
    const product = products.find((p) => p.id === id);
    resolve(product);
  });
}

function generateId() {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let id = "";

  for (let i = 0; i < 10; i++) {
    id += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return id;
}

function create(product) {
  return new Promise((resolve, reject) => {
    const newProduct = { id: generateId(), ...product };
    products.push(newProduct);
    writeDataToFile("./data/products.json", products);
    resolve(newProduct);
  });
}

function update(id, product) {
  return new Promise((resolve, reject) => {
    const index = products.findIndex((p) => p.id === id);
    products[index] = { id, ...product };

    writeDataToFile("./data/products.json", products);
    resolve(products[index]);
  });
}

function remove(id) {
  return new Promise((resolve, reject) => {
    products = products.filter((p) => p.id !== id);

    writeDataToFile("./data/products.json", products);
    resolve();
  });
}

module.exports = {
  findAll,
  findById,
  create,
  update,
  remove,
};
