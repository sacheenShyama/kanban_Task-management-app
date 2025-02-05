import { taskInterface } from "./../../../interface/interface";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const baseURL = "https://kanban-task-management-app-jl0u.onrender.com/api/task";
interface taskState {
  task: taskInterface[];
  loading: boolean;
  message: string | null;
  error: string | null;
}

const initialState: taskState = {
  task: [] as taskInterface[],
  loading: false,
  message: null,
  error: null,
};

export const handleCreateTask = createAsyncThunk(
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
      if (!token) throw new Error("Token not found");
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
export const handleUpdateTask = createAsyncThunk(
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
      if (!token) throw new Error("Token not found");

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
export const handleDeleteTask = createAsyncThunk(
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
    } catch (error) {
      return rejectWithValue(error || "Failed to update task");
    }
  }
);

export const handleTaskDragDrop = createAsyncThunk(
  "taskDrag",
  async (
    {
      id,
      currentListId,
      targetListId,
    }: { id: string; currentListId: string; targetListId: string },
    { rejectWithValue }
  ) => {
    try {
      const token = useLocalStorage("kanbanToken").getItem();
      if (!token || undefined) throw new Error("Token not found");

      const res = await axios.post(
        `${baseURL}/drag`,
        {
          id,
          currentListId,
          targetListId,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      return res;
    } catch (error) {
      return rejectWithValue(error || "Failed to Drag task");
    }
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
        state.task = state.task.map((b) =>
          b._id === action.payload._id ? action.payload : b
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
        state.task = state.task.filter((b) => b._id !== action.payload);
      })
      .addCase(handleDeleteTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(handleTaskDragDrop.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(handleTaskDragDrop.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.data;
      })
      .addCase(handleTaskDragDrop.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default taskSlice.reducer;
