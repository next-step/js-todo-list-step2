import axios from "axios";
import { API } from "@constants/url";

export const getUsers = () => axios(API.GET_USERS);
export const addUser = (name) => axios.post(API.ADD_USER, { name });
