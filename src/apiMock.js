import axios from "axios";
import MockAdapter from "axios-mock-adapter";

// This sets the mock adapter on the default instance
const mock = new MockAdapter(axios);

console.log("Api Mock is being initialized");

// Mock data
const users = [
  { email: "john@example.com", username: "john" },
  { email: "jane@example.com", username: "jane" },
];

const products = [
    {
        id: 1,
        name: "Bananas Certified Organic",
        price: 5.95,
        discount: 40,
        stock: 50,
        available: true,
        description:
          "These bananas are certified organic, ensuring they are grown without synthetic pesticides or fertilizers. They are packed with essential nutrients such as potassium, vitamin C, and dietary fiber, making them a healthy and delicious snack. Origin: Grown in Australia, known for its strict organic farming standards.",
        onSale: true,
        imageUrl: "https://soil-product-images.s3.amazonaws.com/1.jpg",
      },
      {
        id: 2,
        name: "Strawberries Pun 250g Certified Organic",
        price: 8.95,
        discount: 0,
        stock: 50,
        available: true,
        description:
          "Enjoy the sweet and juicy taste of our certified organic strawberries. These berries are packed with antioxidants, vitamins, and minerals, making them a perfect addition to your diet. They are grown in Australia under strict organic farming practices, ensuring they are free from harmful chemicals.",
        onSale: false,
        imageUrl: "https://soil-product-images.s3.amazonaws.com/2.jpg",
      },
      {
        id: 3,
        name: "Blueberries Pun 125g Certified Organic",
        price: 8.95,
        discount: 30,
        stock: 50,
        available: true,
        description:
          "Our certified organic blueberries are a delightful treat, rich in antioxidants and vitamins, particularly vitamin C and vitamin K. They are perfect for snacking, baking, or adding to smoothies and cereals. These blueberries are grown in Australia, adhering to the highest organic standards.",
        onSale: true,
        imageUrl: "https://soil-product-images.s3.amazonaws.com/3.jpg",
      },
      {
        id: 4,
        name: "Orange Nets Valancia 3kg Certified Organic",
        price: 14.95,
        discount: 0,
        stock: 50,
        available: true,
        description:
          "Our Valencia oranges are certified organic, known for their sweet and juicy flavor. They are a great source of vitamin C, fiber, and antioxidants. Enjoy them fresh, juiced, or as part of your favorite recipes. These oranges are grown in Australia, where organic farming practices ensure they are free from synthetic chemicals.",
        onSale: false,
        imageUrl: "https://soil-product-images.s3.amazonaws.com/4.jpg",
      },
      {
        id: 5,
        name: "Madelaine’s Organic Dozen Eggs 600g",
        price: 11.95,
        discount: 30,
        stock: 50,
        available: true,
        description:
          "Madelaine’s Organic Eggs are produced by free-range hens that are raised on organic feed, ensuring the highest quality eggs. These eggs are rich in protein, vitamins, and omega-3 fatty acids. Produced in Australia, they adhere to strict organic standards, providing a healthier and more sustainable choice.",
        onSale: true,
        imageUrl: "https://soil-product-images.s3.amazonaws.com/5.jpg",
      },
      {
        id: 6,
        name: "Nature’s Organic Mango & Banana Smoothie 300ml",
        price: 5.95,
        discount: 50,
        stock: 50,
        available: true,
        description:
          "Nature’s Organic Mango & Banana Smoothie is a refreshing and nutritious blend of organic mango juice and organic banana puree. This smoothie is enriched with vitamin C and is made from reconstituted apple juice, ensuring a natural and delicious taste. It's a perfect on-the-go drink for a healthy lifestyle.",
        onSale: true,
        imageUrl: "https://soil-product-images.s3.amazonaws.com/6.jpg",
      },
      {
        id: 7,
        name: "Pure Harvest Apple and Pear Juice 1L",
        price: 5.95,
        discount: 0,
        stock: 50,
        available: true,
        description:
          "Pure Harvest Apple and Pear Juice is certified organic by ACO. This juice combines the sweet flavors of reconstituted organic apple juice (95%) and pear juice (5%). It is free from artificial additives and preservatives, offering a pure and refreshing taste. Perfect for a healthy breakfast or as a refreshing drink any time of the day.",
        onSale: false,
        imageUrl: "https://soil-product-images.s3.amazonaws.com/7.jpg",
      },
      {
        id: 8,
        name: "Beans Round Green Certified Organic",
        price: 22.95,
        discount: 0,
        stock: 50,
        available: true,
        description:
          "These round green beans are certified organic, ensuring they are grown without synthetic pesticides or fertilizers. They are a great source of vitamins A, C, and K, as well as dietary fiber. Enjoy them steamed, stir-fried, or as part of your favorite salad. Grown in Australia, these beans adhere to strict organic farming practices.",
        onSale: false,
        imageUrl: "https://soil-product-images.s3.amazonaws.com/8.jpg",
      },
      {
        id: 9,
        name: "Chilli Red Kg Certified Organic",
        price: 29.95,
        discount: 30,
        stock: 50,
        available: true,
        description:
          "Our certified organic red and green chillies are perfect for adding a spicy kick to your dishes. Rich in vitamins A and C, these chillies are grown in Australia without the use of synthetic chemicals. They are ideal for curries, stir-fries, and sauces, offering a fresh and intense flavor.",
        onSale: true,
        imageUrl: "https://soil-product-images.s3.amazonaws.com/9.jpg",
      },
      {
        id: 10,
        name: "Cherry Tree Beef Chuck Steak",
        price: 35.28,
        discount: 0,
        stock: 50,
        available: true,
        description:
          "Cherry Tree Beef Chuck Steak is certified by ACO, ensuring it meets the highest standards of organic farming. This steak is known for its rich flavor and tenderness, making it perfect for slow cooking, braising, or grilling. Produced in Australia, it is a healthy and sustainable choice for meat lovers.",
        onSale: false,
        imageUrl: "https://soil-product-images.s3.amazonaws.com/10.jpg",
      },
];

const mockCartItems = [
    {
      product: {
        id: 1,
        name: "Bananas Certified Organic",
        price: 5.95,
        discount: 40,
        stock: 50,
        available: true,
        description:
          "These bananas are certified organic, ensuring they are grown without synthetic pesticides or fertilizers. They are packed with essential nutrients such as potassium, vitamin C, and dietary fiber, making them a healthy and delicious snack. Origin: Grown in Australia, known for its strict organic farming standards.",
        onSale: true,
        imageUrl: "https://soil-product-images.s3.amazonaws.com/1.jpg",
      },
    },
    {
      product: {
        id: 2,
        name: "Strawberries Pun 250g Certified Organic",
        price: 8.95,
        discount: 0,
        stock: 50,
        available: true,
        description:
          "Enjoy the sweet and juicy taste of our certified organic strawberries. These berries are packed with antioxidants, vitamins, and minerals, making them a perfect addition to your diet. They are grown in Australia under strict organic farming practices, ensuring they are free from harmful chemicals.",
        onSale: false,
        imageUrl: "https://soil-product-images.s3.amazonaws.com/2.jpg",
      },
    },
  ];

const carts = [
  {
    cartId: "1",
    email: "john@example.com",
    shoppingCartItems: { cartId: "1", email: "john@example.com", shoppingCartItems: mockCartItems }
  },
  {
    cartId: "2",
    email: "jane@example.com",
    shoppingCartItems: { cartId: "2", email: "jane@example.com", shoppingCartItems: mockCartItems }
  },
];

const reviews = [
  {
    id: "1",
    productId: "1",
    user: {email: "john@example.com"},
    content: "Great product!",
    stars: 5,
    date: new Date().toLocaleString(),
    isFlagged: false
  },
  {
    id: "2",
    productId: "1",
    user: {email: "jane@example.com"},
    content: "Not bad.",
    stars: 3,
    date: new Date().toLocaleString(),
    isFlagged: false
  },
];

const replies = [
  {
    id: "3",
    reviewId: "1",
    user: {email: "john@example.com"},
    content: "Thanks for your feedback!",
    date: new Date().toLocaleString(),
  },
  {
    id: "4",
    reviewId: "2",
    user: {email: "jane@example.com"},
    content: "I appreciate your review.",
    date: new Date().toLocaleString(),
  },
];

const follows = [
  { followerEmail: "alice@example.com", followingEmail: "bob@example.com" },
  { followerEmail: "alice@example.com", followingEmail: "charlie@example.com" },
];

// Mocking the endpoints
mock.onGet("http://localhost:4000/api/users/login").reply((config) => {
  const { email, userInputPassword } = config.params;
  const user = users.find((u) => u.email === email);
  if (user && userInputPassword === "password123") {
    // Simulating password check
    return [200, user];
  } else if (user) {
    return [
      403,
      { error: "Your account has been blocked. Please contact support." },
    ];
  }
  return [404, { error: "User not found" }];
});

mock.onGet("http://localhost:4000/api/users/").reply(200, users);

mock
  .onGet(new RegExp("http://localhost:4000/api/users/select/*"))
  .reply((config) => {
    const email = config.url.split("/").pop();
    const user = users.find((u) => u.email === email);
    if (user) {
      return [200, user];
    }
    return [404, { error: "User not found" }];
  });

mock.onPost("http://localhost:4000/api/users").reply((config) => {
  const newUser = JSON.parse(config.data);
  if (users.find((u) => u.email === newUser.email)) {
    return [400, { message: "User already exists" }];
  }
  users.push(newUser);
  return [201, newUser];
});

mock.onPut("http://localhost:4000/api/users/update").reply((config) => {
  const updatedUser = JSON.parse(config.data);
  const index = users.findIndex((u) => u.email === updatedUser.email);
  if (index !== -1) {
    users[index] = updatedUser;
    return [200, updatedUser];
  }
  return [404, { error: "User not found" }];
});

mock.onPut("http://localhost:4000/api/users/changepw").reply((config) => {
  const { email, newPassword } = JSON.parse(config.data);
  const user = users.find((u) => u.email === email);
  if (user) {
    // Simulate password change
    return [200, { message: "Password changed successfully" }];
  }
  return [404, { error: "User not found" }];
});

mock
  .onGet(new RegExp("http://localhost:4000/api/addresses/*/addresses"))
  .reply((config) => {
    // Simulate address retrieval
    return [200, [{ type: "home", address: "123 Main St" }]];
  });

mock.onPut("http://localhost:4000/api/addresses/update").reply((config) => {
  // Simulate address update
  return [200, { message: "Address updated successfully" }];
});

mock.onPost("http://localhost:4000/api/addresses/create").reply((config) => {
  // Simulate address creation
  return [201, { message: "Address created successfully" }];
});

mock.onDelete("http://localhost:4000/api/users/delete").reply((config) => {
  const { emailToRemove } = JSON.parse(config.data);
  const index = users.findIndex((u) => u.email === emailToRemove);
  if (index !== -1) {
    users.splice(index, 1);
    return [200, { message: "User deleted successfully" }];
  }
  return [404, { error: "User not found" }];
});

// Mocking the endpoints
mock.onGet("http://localhost:4000/api/products").reply(200, products);

mock
  .onGet(new RegExp("http://localhost:4000/api/products/select/*"))
  .reply((config) => {
    const id = config.url.split("/").pop();
    const product = products.find((p) => p.id === id);
    if (product) {
      return [200, product];
    }
    return [404, { error: "Product not found" }];
  });

mock
  .onPut(new RegExp("http://localhost:4000/api/products/select/*"))
  .reply((config) => {
    const id = config.url.split("/").pop();
    const { stock } = JSON.parse(config.data);
    const product = products.find((p) => p.id === id);
    if (product) {
      product.stock = stock;
      return [200, product];
    }
    return [404, { error: "Product not found" }];
  });

// Mocking the endpoints
mock.onGet("http://localhost:4000/api/cart").reply((config) => {
  const { email, cartId } = config.params;
  const cart = carts.find((c) => c.cartId === cartId && c.email === email);
  if (cart) {
    return [200, cart.shoppingCartItems];
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
    const item = cart.shoppingCartItems.shoppingCartItems.find((i) => i.product.id === productId);
    if (item) {
      item.quantity += quantity;
    } else {
      cart.shoppingCartItems.shoppingCartItems.push({ productId, quantity });
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

// Mocking the GET request for reviews
mock.onGet(/\/api\/reviews\/\d+/).reply((config) => {
  const productId = config.url.split("/").pop();
  const productReviews = reviews.filter(
    (review) => review.productId === productId
  );
  if (productReviews.length > 0) {
    return [200, productReviews];
  }
  return [404, { error: "Reviews not found" }];
});

// Mocking the POST request to create a review
mock.onPost("http://localhost:4000/api/reviews").reply((config) => {
  const newReview = JSON.parse(config.data);
  newReview.reviewId = String(reviews.length + 1);
  reviews.push(newReview);
  return [201, newReview];
});

// Mocking the PUT request to update a review
mock.onPut(/\/api\/reviews\/\d+/).reply((config) => {
  const reviewId = config.url.split("/").pop();
  const index = reviews.findIndex((review) => review.reviewId === reviewId);
  if (index !== -1) {
    const updatedReview = { ...reviews[index], ...JSON.parse(config.data) };
    reviews[index] = updatedReview;
    return [200, updatedReview];
  }
  return [404, { error: "Review not found" }];
});

// Mocking the DELETE request to delete a review
mock.onDelete(/\/api\/reviews\/\d+/).reply((config) => {
  const reviewId = config.url.split("/").pop();
  const index = reviews.findIndex((review) => review.reviewId === reviewId);
  if (index !== -1) {
    const deletedReview = reviews.splice(index, 1);
    return [200, deletedReview];
  }
  return [404, { error: "Review not found" }];
});

// Mocking the GET request for replies
mock.onGet(/\/api\/reply\/\d+/).reply((config) => {
  const reviewId = config.url.split("/").pop();
  const reviewReplies = replies.filter((reply) => reply.reviewId === reviewId);
  if (reviewReplies.length > 0) {
    return [200, reviewReplies];
  }
  return [404, { error: "Replies not found" }];
});

// Mocking the POST request to create a reply
mock.onPost("http://localhost:4000/api/reply/create").reply((config) => {
  const newReply = JSON.parse(config.data);
  newReply.replyId = String(replies.length + 1);
  replies.push(newReply);
  return [201, newReply];
});

// Mocking the PUT request to update a reply
mock.onPut(/\/api\/reply\/\d+/).reply((config) => {
  const replyId = config.url.split("/").pop();
  const index = replies.findIndex((reply) => reply.replyId === replyId);
  if (index !== -1) {
    const updatedReply = { ...replies[index], ...JSON.parse(config.data) };
    replies[index] = updatedReply;
    return [200, updatedReply];
  }
  return [404, { error: "Reply not found" }];
});

// Mocking the DELETE request to delete a reply
mock.onDelete(/\/api\/reply\/\d+/).reply((config) => {
  const replyId = config.url.split("/").pop();
  const index = replies.findIndex((reply) => reply.replyId === replyId);
  if (index !== -1) {
    const deletedReply = replies.splice(index, 1);
    return [200, deletedReply];
  }
  return [404, { error: "Reply not found" }];
});

// Mocking the GET request to get following users
mock.onGet(/\/api\/userfollows\/.+/).reply((config) => {
  const followerEmail = config.url.split("/").pop();
  const followingUsers = follows
    .filter((follow) => follow.followerEmail === followerEmail)
    .map((follow) => follow.followingEmail);
  return [200, followingUsers];
});

// Mocking the POST request to follow a user
mock.onPost("http://localhost:4000/api/userfollows/follow").reply((config) => {
  const { followerEmail, followingEmail } = JSON.parse(config.data);
  const newFollow = { followerEmail, followingEmail };
  follows.push(newFollow);
  return [201, newFollow];
});

// Mocking the POST request to unfollow a user
mock
  .onPost("http://localhost:4000/api/userfollows/unfollow")
  .reply((config) => {
    const { followerEmail, followingEmail } = JSON.parse(config.data);
    const index = follows.findIndex(
      (follow) =>
        follow.followerEmail === followerEmail &&
        follow.followingEmail === followingEmail
    );
    if (index !== -1) {
      follows.splice(index, 1);
      return [200, { message: "Unfollowed successfully" }];
    }
    return [404, { error: "Follow relationship not found" }];
  });

export default mock;
