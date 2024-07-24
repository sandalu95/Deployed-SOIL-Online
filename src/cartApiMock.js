import axios from "axios";
import MockAdapter from "axios-mock-adapter";

const mock = new MockAdapter(axios);

console.log("Cart Mock is being initialized");

// Mock data
const carts = [
  {
    cartId: "1",
    email: "john@example.com",
    items: [
      { productId: "101", quantity: 2 },
      { productId: "102", quantity: 1 },
    ],
  },
  {
    cartId: "2",
    email: "jane@example.com",
    items: [{ productId: "103", quantity: 5 }],
  },
];

// Mocking the endpoints
mock.onGet("http://localhost:4000/api/cart").reply((config) => {
  const { email, cartId } = config.params;
  const cart = carts.find((c) => c.cartId === cartId && c.email === email);
  if (cart) {
    return [200, cart.items];
  }
  return [404, { error: "Cart not found" }];
});

mock.onPost("http://localhost:4000/api/cart").reply((config) => {
  const { userEmail } = JSON.parse(config.data);
  let cart = carts.find((c) => c.email === userEmail);
  if (!cart) {
    cart = { cartId: String(carts.length + 1), email: userEmail, items: [] };
    carts.push(cart);
  }
  return [200, cart];
});

mock
  .onDelete(new RegExp("http://localhost:4000/api/cart/*"))
  .reply((config) => {
    const cartId = config.url.split("/").pop();
    const index = carts.findIndex((c) => c.cartId === cartId);
    if (index !== -1) {
      carts.splice(index, 1);
      return [200, { message: "Cart deleted successfully" }];
    }
    return [404, { error: "Cart not found" }];
  });

mock.onPost("http://localhost:4000/api/cart/items").reply((config) => {
  const { cartId, productId, quantity } = JSON.parse(config.data);
  const cart = carts.find((c) => c.cartId === cartId);
  if (cart) {
    const item = cart.items.find((i) => i.productId === productId);
    if (item) {
      item.quantity += quantity;
    } else {
      cart.items.push({ productId, quantity });
    }
    return [200, cart];
  }
  return [404, { error: "Cart not found" }];
});

mock
  .onDelete(new RegExp("http://localhost:4000/api/cart/items/*/*"))
  .reply((config) => {
    const [, , , cartId, productId] = config.url.split("/");
    const cart = carts.find((c) => c.cartId === cartId);
    if (cart) {
      const itemIndex = cart.items.findIndex((i) => i.productId === productId);
      if (itemIndex !== -1) {
        cart.items.splice(itemIndex, 1);
        return [200, { message: "Item removed from cart" }];
      }
      return [404, { error: "Item not found in cart" }];
    }
    return [404, { error: "Cart not found" }];
  });

mock
  .onPut(new RegExp("http://localhost:4000/api/cart/items/*/*"))
  .reply((config) => {
    const [, , , cartId, productId] = config.url.split("/");
    const { quantity } = JSON.parse(config.data);
    const cart = carts.find((c) => c.cartId === cartId);
    if (cart) {
      const item = cart.items.find((i) => i.productId === productId);
      if (item) {
        item.quantity = quantity;
        return [200, cart];
      }
      return [404, { error: "Item not found in cart" }];
    }
    return [404, { error: "Cart not found" }];
  });

export default mock;
