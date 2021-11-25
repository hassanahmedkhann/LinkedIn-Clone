// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   value: 0,
//   status: "idle",
// };

// export const userSlice = createSlice({
//   name: "user",

//   initialState,

//   reducers: {
//     increment: (state) => {
//       state.value += 1;
//     },
//     decrement: (state) => {
//       state.value -= 1;
//     },
//     incrementByAmount: (state, action) => {
//       state.value += action.payload;
//     },
//   },
// });

// export const { increment, decrement, incrementByAmount } = userSlice.actions;

// export const selectUser = (state) => state.user.user;

// export default userSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
    signup: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { login, signup, logout } = userSlice.actions;
export const selectUser = (state) => state.user.user;

export default userSlice.reducer;
