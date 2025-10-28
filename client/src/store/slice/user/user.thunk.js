import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { axiosInstance } from "../../../components/utilities/axiosInstance";

//LogIN
export const loginUserThunk = createAsyncThunk(
  "user/login",
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/user/login", {
        username,
        password,
      });
      toast.success("Login Successful")
      return response.data
    } catch (error) {
      console.error(error);
      const errorOutput = error?.response?.data?.errMessage
      toast.error(errorOutput)
      return rejectWithValue(errorOutput)
    }
  }
);

//SignUp
export const registerUserThunk = createAsyncThunk(
  "user/signup",
  async ({ fullName, username, password, gender }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/user/register", {
        fullName,
        username,
        password,
        gender
      });
      toast.success("SignUp Successful")
      return response.data
    } catch (error) {
      console.error(error);
      const errorOutput = error?.response?.data?.errMessage
      toast.error(errorOutput)
      return rejectWithValue(errorOutput)
    }
  }
);

//LogOut
export const logoutUserThunk = createAsyncThunk(
  "user/logout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/user/logout");
      toast.success("Logout Successful");
      return response.data
    } catch (error) {
      console.error(error);
      const errorOutput = error?.response?.data?.errMessage
      toast.error(errorOutput)
      return rejectWithValue(errorOutput)
    }
  }
);

//Get User Profile
export const getUserProfileThunk = createAsyncThunk(
  "user/getProfile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/user/get-profile");
      return response.data;
    } catch (error) {
      console.log(error);
      const errorOutput = error?.response?.data?.errMessage
      return rejectWithValue(errorOutput)
    }
  }
);

//Get Other User Profile
export const getOtherUsersThunk = createAsyncThunk(
  "user/getOtherUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/user/get-other-users");
      return response.data;
    } catch (error) {
      console.log(error);
      const errorOutput = error?.response?.data?.errMessage
      return rejectWithValue(errorOutput)
    }
  }
);
