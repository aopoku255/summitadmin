import { createSlice } from "@reduxjs/toolkit";
import {
  getTaskList,
  addNewTask,
  updateTask,
  deleteTask,
  getPrallelSession,
  addParallelSession,
  getAllUsers,
} from "./thunk";
export const initialState = {
  taskList: [],
  sessionList: [],
  allUsers: [],
};

const TasksSlice = createSlice({
  name: "TasksSlice",
  initialState,
  reducer: {},
  extraReducers: (builder) => {
    builder.addCase(getTaskList.fulfilled, (state, action) => {
      state.taskList = action.payload.data;
      state.isTaskCreated = false;
      state.isTaskSuccess = true;
    });
    builder.addCase(getPrallelSession.fulfilled, (state, action) => {
      state.sessionList = action.payload;
      state.isParallelSessionCreated = false;
      state.isParallelSessionSuccess = true;
    });
    builder.addCase(getAllUsers.fulfilled, (state, action) => {
      state.allUsers = action.payload;
      state.isAllUserCreated = false;
      state.isAllUserSuccess = true;
    });
    builder.addCase(getTaskList.rejected, (state, action) => {
      state.error = action.payload?.error || null;
      state.isTaskCreated = false;
      state.isTaskSuccess = true;
    });
    builder.addCase(addNewTask.fulfilled, (state, action) => {
      state.taskList.push(action.payload.data);
      state.isTaskCreated = true;
      state.isTaskAdd = true;
      state.isTaskAddFail = false;
    });
    builder.addCase(addParallelSession.fulfilled, (state, action) => {
      state.sessionList.push(action.payload.data);
      state.isParallelSessionCreated = true;
    });
    builder.addCase(addNewTask.rejected, (state, action) => {
      state.error = action.payload?.error || null;
      state.isTaskAdd = false;
      state.isTaskAddFail = true;
    });
    builder.addCase(updateTask.fulfilled, (state, action) => {
      state.taskList = state.taskList.map((task) =>
        task._id.toString() === action.payload.data._id.toString()
          ? { ...task, ...action.payload.data }
          : task
      );
      state.isTaskUpdate = true;
      state.isTaskUpdateFail = false;
    });
    builder.addCase(updateTask.rejected, (state, action) => {
      state.error = action.payload?.error || null;
      state.isTaskUpdate = false;
      state.isTaskUpdateFail = true;
    });
    builder.addCase(deleteTask.fulfilled, (state, action) => {
      state.taskList = state.taskList.filter(
        (task) => task._id.toString() !== action.payload.task.toString()
      );
      state.isTaskDelete = true;
      state.isTaskDeleteFail = false;
    });
    builder.addCase(deleteTask.rejected, (state, action) => {
      state.error = action.payload?.error || null;
      state.isTaskDelete = false;
      state.isTaskDeleteFail = true;
    });
  },
});

export default TasksSlice.reducer;
