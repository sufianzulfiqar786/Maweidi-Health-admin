import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const BaseURL = process.env.REACT_APP_BASE_URL;
const endpoint = process.env.REACT_APP_GET_SPECIALIZATION;
const token = "11|FJiHC6mUorgxUbttyr8WSIcX4qtLPicZCL3BOHXX";
const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
export const fetchSpecialization = createAsyncThunk(
  "specialization/fetchSpecialization",
  async () => {

    try {
      const response = await fetch(`${BaseURL}/${endpoint}`,config);
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error)
    }
  }
);






const specializationSlice = createSlice({
  name: "specialization",
  initialState: {
    specializationData: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSpecialization.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchSpecialization.fulfilled, (state, action) => {
        state.isLoading = false;
        state.specializationData = action.payload;
      })
      .addCase(fetchSpecialization.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default specializationSlice;
