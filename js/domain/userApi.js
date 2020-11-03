import Api from "../utils/api.js";
import State from "./state.js";
import User from "./user.js";

export const fetchUsers = () => {
  return new Api().get("/users").build();
};

export const fetchUser = (name) => {
  return new Api().get(`/users/${name}`).build();
};

export const addUser = async (name) => {
  const user = await new Api().post("/users").data({ name }).build();

  return User.of(user);
};
