import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//Include Both Helper File with needed methods
import {
  getTeamData as getTeamDataApi,
  getSpeakers as getSpeakersApi,
  addSpeakers as addSpeakersApi,
  addTeamData as addTeamDataApi,
  updateTeamData as updateTeamDataApi,
  deleteTeamData as deleteTeamDataApi,
} from "../../helpers/fakebackend_helper";

export const getTeamData = createAsyncThunk("team/getTeamData", async () => {
  try {
    const response = await getTeamDataApi();

    return response;
  } catch (error) {
    return error;
  }
});

export const getSpeakers = createAsyncThunk("team/getSpeakers", async () => {
  try {
    const response = await getSpeakersApi();

    return response?.data;
  } catch (error) {
    return error;
  }
});

export const addTeamData = createAsyncThunk(
  "team/addTeamData",
  async (team) => {
    try {
      const response = await addTeamDataApi(team);
      toast.success("Team Data Added Successfully", { autoClose: 3000 });
      return response;
    } catch (error) {
      toast.error("Team Data Added Failed", { autoClose: 3000 });
      return error;
    }
  }
);

export const addSpeakers = createAsyncThunk(
  "team/addSpeakers",
  async (speakers) => {
    try {
      const response = addSpeakersApi(speakers);
      toast.success("Speaker Added Successfully", { autoClose: 3000 });
      return response;
    } catch (error) {
      toast.error("Speaker Added Failed", { autoClose: 3000 });
      return error;
    }
  }
);

export const updateTeamData = createAsyncThunk(
  "team/updateTeamData",
  async (project) => {
    try {
      const response = updateTeamDataApi(project);
      toast.success("Team Data Updated Successfully", { autoClose: 3000 });
      return response;
    } catch (error) {
      toast.error("Team Data Updated Failed", { autoClose: 3000 });
      return error;
    }
  }
);

export const deleteTeamData = createAsyncThunk(
  "team/deleteTeamData",
  async (project) => {
    try {
      const response = deleteTeamDataApi(project);
      toast.success("Team Data Delete Successfully", { autoClose: 3000 });
      return response;
    } catch (error) {
      toast.error("Team Data Delete Failed", { autoClose: 3000 });
      return error;
    }
  }
);
