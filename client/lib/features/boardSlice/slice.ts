import { useLocalStorage } from "@/hooks/useLocalStorage";
import { RootState } from "@/lib/store";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { headers } from "next/headers";
const baseURL = "http://localhost:8000/api/board";
interface boardState {
  board: any;
  loading: boolean;
  message: string | null;
  error: string | null;
}

const initialState: boardState = {
  board: null,
  loading: false,
  message: null,
  error: null,
};

export const handleGetBoard = createAsyncThunk(
  "getBoard",
  async (_, { rejectWithValue }) => {
    try {
      const token = useLocalStorage("kanbanToken").getItem();
      if (!token || undefined) throw new Error("Token not found");

      const res = await axios.get(`${baseURL}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(error || "Failed to fetch board");
    }
  }
);
export const handleCreateBoard = createAsyncThunk(
  "createBoard",
  async (title: string, { rejectWithValue }) => {
    try {
      const token = useLocalStorage("kanbanToken").getItem();
      if (!token || undefined) throw new Error("Token not found");

      const res = await axios.post(
        `${baseURL}`,
        { title },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error || "Failed to fetch board");
    }
  }
);

export const handleUpdateBoard = createAsyncThunk(
  "updateBoard",
  async ({ id, title }: { id: string; title: string }, { rejectWithValue }) => {
    try {
      const token = useLocalStorage("kanbanToken").getItem();
      if (!token || undefined) throw new Error("Token not found");

      const res = await axios.put(
        `${baseURL}/${id}`,
        { title },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error || "Failed to fetch board");
    }
  }
);
export const handleDeleteBoard=createAsyncThunk("deleteBoard",async()=>{
  
});

const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(handleGetBoard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(handleGetBoard.fulfilled, (state, action) => {
        state.loading = false;
        state.board = action.payload;
      })
      .addCase(handleGetBoard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default boardSlice.reducer;
