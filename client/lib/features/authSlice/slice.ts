import { useLocalStorage } from "@/hooks/useLocalStorage";
import { userInterface } from "@/interface/interface";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const baseURL = "http://localhost:8000";

interface authState {
  user: userInterface;
  loading: boolean;
  message: string | null;
  error: string | null;
  kanbanToken: string | null;
}

const initialState: authState = {
  user: {} as userInterface,
  loading: false,
  message: null,
  error: null,
  kanbanToken: null,
};

export const handleLogin = createAsyncThunk(
  "api/login",
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const res = await axios.post(`${baseURL}/api/login`, { email, password });
      useLocalStorage("kanbanToken").setItem(res.data.token);
      return res.data;
    } catch (error) {
      console.log(error, "try again login");
      return rejectWithValue("Login failed F");
    }
  }
);

export const handleSignup = createAsyncThunk(
  "api/register",
  async (
    {
      name,
      email,
      password,
    }: { name: string; email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const res = await axios.post(`${baseURL}/api/register`, {
        name,
        email,
        password,
      });
      return res.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue("Try again Signup");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    handleLogout: (state) => {
      localStorage.removeItem("kanbanToken");
      state.message = "Logged out successfully";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(handleLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(handleLogin.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.loading = false;
        state.kanbanToken = action.payload.kanbanToken;
        state.message = "Login successful";
      })
      .addCase(handleLogin.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      })
      .addCase(handleSignup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(handleSignup.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
        state.message = "Register successful";
      })
      .addCase(handleSignup.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      });
  },
});

export const { handleLogout } = authSlice.actions;
export default authSlice.reducer;
