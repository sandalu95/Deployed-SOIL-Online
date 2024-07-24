import axios from "axios";
import MockAdapter from "axios-mock-adapter";

const mock = new MockAdapter(axios);

console.log("Product Mock is being initialized");

// Mock data
const products = [
  { id: "1", name: "Bananas Certified Organic", stock: 10, onSale: true, price: 5.95, discount: 10},
  { id: "2", name: "Strawberries Certified Organic", stock: 5, onSale: true, price: 10.25, discount: 10 },
  { id: "3", name: "Blueberries Certified Organic", stock: 20, onSale: true, price: 8.95, discount: 10 },
  { id: "4", name: "Organic Oranges", stock: 10, onSale: true, price: 5.95, discount: 10 },
  { id: "5", name: "Madelaine's Organic Dozen Eggs 600g", stock: 5, onSale: false, price: 11.95, discount: 0 },
  { id: "6", name: "Nature's Organic Mango and Banana Smoothie 300ml", stock: 20, onSale: false, price: 5.95, discount: 0 },
  { id: "7", name: "Apple and Pear Smoothie 300ml", stock: 10, onSale: false, price: 5.95, discount: 0 },
  { id: "8", name: "Green Beans Certified Organic", stock: 5, onSale: false, price: 5.95, discount: 0 },
  { id: "9", name: "Chillie Red/Green Kg Certified Organic", stock: 20, onSale: false, price: 29.95, discount: 0 },
  { id: "10", name: "Steak Certified Organic 1Kg", stock: 20, onSale: false, price: 49.95, discount: 0 },
];

// Mocking the endpoints
mock.onGet("http://localhost:4000/api/products").reply(200, products);

mock.onGet(new RegExp("http://localhost:4000/api/products/select/*")).reply((config) => {
  const id = config.url.split("/").pop();
  const product = products.find(p => p.id === id);
  if (product) {
    return [200, product];
  }
  return [404, { error: "Product not found" }];
});

mock.onPut(new RegExp("http://localhost:4000/api/products/select/*")).reply((config) => {
  const id = config.url.split("/").pop();
  const { stock } = JSON.parse(config.data);
  const product = products.find(p => p.id === id);
  if (product) {
    product.stock = stock;
    return [200, product];
  }
  return [404, { error: "Product not found" }];
});

export default mock;
