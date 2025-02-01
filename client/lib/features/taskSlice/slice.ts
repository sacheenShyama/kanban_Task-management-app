import { useLocalStorage } from "@/hooks/useLocalStorage";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const baseURL = "http://localhost:8000/api/task";

interface taskState {
  task: any;
  loading: boolean;
  message: string | null;
  error: string | null;
}

const initialState: taskState = {
  task: null,
  loading: false,
  message: null,
  error: null,
};

const handleCreateTask = createAsyncThunk(
  "createTask",
  async (
    {
      title,
      description,
      dueDate,
      priority,
      status,
      listId,
    }: {
      title: string;
      description: string;
      dueDate: string;
      priority: string;
      status: string;
      listId: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const token = useLocalStorage("kanbanToken").getItem();
      if (!token || undefined) throw new Error("Token not found");
      const res = await axios.post(
        `${baseURL}`,
        { title, description, dueDate, priority, status, listId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error || "Failed to create task");
    }
  }
);
const handleUpdateTask = createAsyncThunk(
  "updateTask",
  async (
    {
      title,
      description,
      dueDate,
      priority,
      status,
      listId,
      id,
    }: {
      title: string;
      description: string;
      dueDate: string;
      priority: string;
      status: string;
      listId: string;
      id: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const token = useLocalStorage("kanbanToken").getItem();
      if (!token || undefined) throw new Error("Token not found");

      const res = await axios.put(
        `${baseURL}/${id}`,
        {
          title,
          description,
          dueDate,
          priority,
          status,
          listId,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      return res.data;
    } catch (error) {
      return rejectWithValue(error || "Failed to update task");
    }
  }
);
const handleDeleteTask = createAsyncThunk(
  "deleteTask",
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
    } catch (error) {}
  }
);

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(handleCreateTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(handleCreateTask.fulfilled, (state, action) => {
        state.loading = false;
        state.task = [...(state.task || []), action.payload];
      })
      .addCase(handleCreateTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(handleUpdateTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(handleUpdateTask.fulfilled, (state, action) => {
        state.loading = false;
        state.task = state.task.map((b: any) =>
          b.id === action.payload.id ? action.payload : b
        );
      })
      .addCase(handleUpdateTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(handleDeleteTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(handleDeleteTask.fulfilled, (state, action) => {
        state.loading = false;
        state.task = state.task.filter((b: any) => b.id !== action.payload);
      })
      .addCase(handleDeleteTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default taskSlice.reducer;
