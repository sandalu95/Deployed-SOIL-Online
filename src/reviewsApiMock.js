// reviewsApiMock.js
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

const mock = new MockAdapter(axios);

// Sample data
const reviews = [
  {
    reviewId: "1",
    productId: "101",
    userEmail: "john@example.com",
    feedback: "Great product!",
    rating: 5,
  },
  {
    reviewId: "2",
    productId: "102",
    userEmail: "jane@example.com",
    feedback: "Not bad.",
    rating: 3,
  },
];

// Mocking the GET request for reviews
mock.onGet(/\/api\/reviews\/\d+/).reply((config) => {
  const productId = config.url.split("/").pop();
  const productReviews = reviews.filter((review) => review.productId === productId);
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

console.log("Reviews API mock is initialized");
