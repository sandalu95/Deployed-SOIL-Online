// userFollowsApiMock.js
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

const mock = new MockAdapter(axios);

// Sample data
const follows = [
  { followerEmail: "alice@example.com", followingEmail: "bob@example.com" },
  { followerEmail: "alice@example.com", followingEmail: "charlie@example.com" },
];

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
mock.onPost("http://localhost:4000/api/userfollows/unfollow").reply((config) => {
  const { followerEmail, followingEmail } = JSON.parse(config.data);
  const index = follows.findIndex(
    (follow) => follow.followerEmail === followerEmail && follow.followingEmail === followingEmail
  );
  if (index !== -1) {
    follows.splice(index, 1);
    return [200, { message: "Unfollowed successfully" }];
  }
  return [404, { error: "Follow relationship not found" }];
});

console.log("User follows API mock is initialized");
