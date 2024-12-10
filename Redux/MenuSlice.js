import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { handleApiError } from "./shareApi";
import Toast from "react-native-toast-message";
import { axiosInstance, getAxiosConfig, getToken } from "./ApiConfig";

const API_BASEURL = process.env.EXPO_PUBLIC_API_URL;

const initialState = {
  CandidateDetails_data: null,
  CandidateDetails_isError: false,
  CandidateDetails_isSuccess: false,
  CandidateDetails_isLoading: false,
  CandidateDetails_message: null,

  Candidate_data: null,
  Candidate_isError: false,
  Candidate_isSuccess: false,
  Candidate_isLoading: false,
  Candidate_message: null,

  Assigned_guarantor_data: null,
  Assigned_guarantor_isError: false,
  Assigned_guarantor_isSuccess: false,
  Assigned_guarantor_isLoading: false,
  Assigned_guarantor_message: null,
};

const fetchResponsData = async (url, thunkAPI) => {
  try {
    const token = getToken(thunkAPI);

    const response = await axiosInstance.get(url, getAxiosConfig(token));

    console.log({
      ddd: response,
    });

    // return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(
        `Failed to fetch data: ${error.response.status} - ${
          error.response.data?.message || error.response.statusText
        }`
      );
    } else if (error.request) {
      throw new Error(
        "No response received from the server. Please check your network connection."
      );
    } else {
      throw new Error(`Unexpected error: ${error.message}`);
    }
  }
};

export const Get_All_Menu_Fun = createAsyncThunk(
  "CandidateSlice/Get_All_Menu_Fun",
  async (query, thunkAPI) => {
    let url = "v1/vendor/menu-items";

    try {
      const response = await fetchResponsData(url, thunkAPI);
      // console.log({
      //   uuuu: response.data,
      // });
      // return response?.data;
    } catch (error) {
      console.log({ error });
      return thunkAPI.rejectWithValue(
        error.message || "An error occurred while fetching candidate profile"
      );
    }
  }
);

export const Get_All_Assigned_guarantor__Fun = createAsyncThunk(
  "CandidateSlice/Get_All_Assigned_guarantor__Fun",
  async (query, thunkAPI) => {
    let url;
    console.log({
      sss: query,
    });
    if (query?.searchQuery) {
      url = `v1/guarantors?page=${query?.page}&perPage=${query?.perPage}&search=${query?.searchQuery}`;
    } else {
      url = `v1/guarantors?page=${query?.page}&perPage=${query?.perPage}`;
    }

    // `v1/candidates?page=${query?.page}&`;

    try {
      const response = await fetchResponsData(url, thunkAPI);

      return response?.data;
    } catch (error) {
      console.log({ error });
      return thunkAPI.rejectWithValue(
        error.message || "An error occurred while fetching candidate profile"
      );
    }
  }
);

export const CandidateDetails_Fun = createAsyncThunk(
  "CandidateSlice/CandidateDetails_Fun",
  async (query, thunkAPI) => {
    let url = `v1/candidates/details?staffId=${query?.staff_id}`;
    try {
      const response = await fetchResponsData(url, thunkAPI);
      console.log({ response });
      return response?.data;
    } catch (error) {
      console.log({ error: error?.message });
      return thunkAPI.rejectWithValue(
        error.message || "An error occurred while fetching candidate details"
      );
    }
  }
);

export const MenuSlice = createSlice({
  name: "MenuSlice",
  initialState,
  reducers: {
    reset_CandidateSlice: (state) => {
      state.Candidate_data = null;
      state.Candidate_isError = false;
      state.Candidate_isSuccess = false;
      state.Candidate_isLoading = false;
      state.Candidate_message = null;
    },
    reset_other_login: (state) => {
      state.Candidate_isError = false;
      state.Candidate_isLoading = false;
      state.Candidate_isSuccess = false;
      state.Candidate_message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(Get_All_Menu_Fun.pending, (state) => {
        state.Candidate_isLoading = true;
      })
      .addCase(Get_All_Menu_Fun.fulfilled, (state, action) => {
        state.Candidate_isLoading = false;
        state.Candidate_isError = false;
        state.Candidate_data = action.payload;
        state.Candidate_message = null;
        state.Candidate_isSuccess = true;
      })
      .addCase(Get_All_Menu_Fun.rejected, (state, action) => {
        state.Candidate_isLoading = false;
        state.Candidate_isError = true;
        state.Candidate_message = action.payload;
        state.Candidate_data = null;
        state.Candidate_isSuccess = false;
      })
      .addCase(CandidateDetails_Fun.pending, (state) => {
        state.CandidateDetails_isLoading = true;
      })
      .addCase(CandidateDetails_Fun.fulfilled, (state, action) => {
        state.CandidateDetails_isLoading = false;
        state.CandidateDetails_isError = false;
        state.CandidateDetails_data = action.payload;
        state.CandidateDetails_message = null;
        state.CandidateDetails_isSuccess = true;
      })
      .addCase(CandidateDetails_Fun.rejected, (state, action) => {
        state.CandidateDetails_isLoading = false;
        state.CandidateDetails_isError = true;
        state.CandidateDetails_message = action.payload;
        state.CandidateDetails_data = null;
        state.CandidateDetails_isSuccess = false;
      })
      .addCase(Get_All_Assigned_guarantor__Fun.pending, (state) => {
        state.Assigned_guarantor_isLoading = true;
      })
      .addCase(Get_All_Assigned_guarantor__Fun.fulfilled, (state, action) => {
        state.Assigned_guarantor_isLoading = false;
        state.Assigned_guarantor_isError = false;
        state.Assigned_guarantor_data = action.payload;
        state.Assigned_guarantor_message = null;
        state.Assigned_guarantor_isSuccess = true;
      })
      .addCase(Get_All_Assigned_guarantor__Fun.rejected, (state, action) => {
        state.Assigned_guarantor_isLoading = false;
        state.Assigned_guarantor_isError = true;
        state.Assigned_guarantor_message = action.payload;
        state.Assigned_guarantor_data = null;
        state.Assigned_guarantor_isSuccess = false;
      });

    // Assigned_guarantor_data: null,
    // Assigned_guarantor_isError: false,
    // Assigned_guarantor_isSuccess: false,
    // Assigned_guarantor_isLoading: false,
    // Assigned_guarantor_message: null,
  },
});

export const { reset_CandidateSlice } = MenuSlice.actions;

export default MenuSlice.reducer;
