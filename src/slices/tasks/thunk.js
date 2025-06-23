import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//Include Both Helper File with needed methods
import {
  getTaskList as getTaskListApi,
  getParallelSession as getPrallelSessionApi,
  addNewTask as addNewTaskApi,
  addParallelSession as addParallelSessionApi,
  updateTask as updateTaskApi,
  deleteTask as deleteTaskApi,
} from "../../helpers/fakebackend_helper";

export const getTaskList = createAsyncThunk("tasks/getTaskList", async () => {
  try {
    const response = getTaskListApi();
    return response;
  } catch (error) {
    return error;
  }
});

export const getPrallelSession = createAsyncThunk(
  "tasks/getPrallelSession",
  async () => {
    try {
      const response = await getPrallelSessionApi();
      console.log(response?.data);
      return response?.data;
    } catch (error) {
      return error;
    }
  }
);

export const addNewTask = createAsyncThunk("tasks/addNewTask", async (task) => {
  try {
    const response = addNewTaskApi(task);
    toast.success("Task Added Successfully", { autoClose: 3000 });
    return response;
  } catch (error) {
    toast.error("Task Added Failed", { autoClose: 3000 });
    return error;
  }
});
export const addParallelSession = createAsyncThunk(
  "tasks/addParallelSession",
  async (task) => {
    try {
      const response = addParallelSessionApi(task);
      toast.success("Task Added Successfully", { autoClose: 3000 });
      return response;
    } catch (error) {
      toast.error("Task Added Failed", { autoClose: 3000 });
      return error;
    }
  }
);

export const updateTask = createAsyncThunk("tasks/updateTask", async (task) => {
  try {
    const response = updateTaskApi(task);
    toast.success("Task Updated Successfully", { autoClose: 3000 });
    return response;
  } catch (error) {
    toast.error("Task Updated Failed", { autoClose: 3000 });
    return error;
  }
});

export const deleteTask = createAsyncThunk("tasks/deleteTask", async (task) => {
  try {
    const response = deleteTaskApi(task);
    toast.success("Task Updated Successfully", { autoClose: 3000 });
    return { task, ...response };
  } catch (error) {
    toast.error("Task Updated Failed", { autoClose: 3000 });
    return error;
  }
});
