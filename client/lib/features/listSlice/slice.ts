import { useLocalStorage } from "@/hooks/useLocalStorage";
import { listInterface } from "@/interface/interface";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const baseURL = "https://kanban-task-management-app-jl0u.onrender.com/api/list";
interface listState {
  list: listInterface[];
  loading: boolean;
  message: string | null;
  error: string | null;
}

const initialState: listState = {
  list: [] as listInterface[],
  loading: false,
  message: null,
  error: null,
};

export const handleCreateList = createAsyncThunk(
  "createList",
  async (
    { title, boardId }: { title: string; boardId: string },
    { rejectWithValue }
  ) => {
    try {
      const token = useLocalStorage("kanbanToken").getItem();
      if (!token || undefined) throw new Error("Token not found");

      const res = await axios.post(
        `${baseURL}`,
        { title, boardId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error || "Failed to create list");
    }
  }
);
export const handleUpdateList = createAsyncThunk(
  "updateList",
  async ({ title, id }: { title: string; id: string }, { rejectWithValue }) => {
    try {
      const token = useLocalStorage("kanbanToken").getItem();
      if (!token || undefined) throw new Error("Token not found");

      const res = await axios.put(
        `${baseURL}/${id}`,
        { title },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error || "Failed to update list");
    }
  }
);
export const handleDeleteList = createAsyncThunk(
  "deleteList",
  async (id: string, { rejectWithValue }) => {
    try {
      const token = useLocalStorage("kanbanToken").getItem();
      if (!token) throw new Error("Token not found");

      await axios.delete(`${baseURL}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return id;
    } catch (error) {
      return rejectWithValue(error || "Failed to delete list");
    }
  }
);
export const handleListDragDrop = createAsyncThunk(
  "listDragDrop",
  async (
    {
      id,
      currentBoardId,
      targetBoardId,
    }: { id: string; currentBoardId: string; targetBoardId: string },
    { rejectWithValue }
  ) => {
    try {
      const token = useLocalStorage("kanbanToken").getItem();
      if (!token || undefined) throw new Error("Token not found");
      console.log("::::check api hit from redux");
      const res = await axios.post(
        `${baseURL}/drag`,
        {
          id,
          currentBoardId,
          targetBoardId,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      return res.data;
    } catch (error) {
      return rejectWithValue(error || "Failed to create list");
    }
  }
);

const listSlice = createSlice({
  name: "list",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(handleCreateList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(handleCreateList.fulfilled, (state, action) => {
        state.loading = false;
        state.list = [...(state.list || []), action.payload];
      })
      .addCase(handleCreateList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(handleUpdateList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(handleUpdateList.fulfilled, (state, action) => {
        state.loading = false;
        state.list = state.list.map((b) =>
          b._id === action.payload._id ? action.payload : b
        );
      })
      .addCase(handleUpdateList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(handleDeleteList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(handleDeleteList.fulfilled, (state, action) => {
        state.loading = false;
        state.list = state.list.filter((b) => b._id !== action.payload);
      })
      .addCase(handleDeleteList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(handleListDragDrop.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(handleListDragDrop.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.data;
      })
      .addCase(handleListDragDrop.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default listSlice.reducer;
