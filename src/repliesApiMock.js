// repliesApiMock.js
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

const mock = new MockAdapter(axios);

// Sample data
const replies = [
  {
    replyId: "1",
    reviewId: "101",
    userEmail: "john@example.com",
    content: "Thanks for your feedback!",
  },
  {
    replyId: "2",
    reviewId: "102",
    userEmail: "jane@example.com",
    content: "I appreciate your review.",
  },
];

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

console.log("Replies API mock is initialized");
