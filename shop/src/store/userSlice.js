import { createSlice } from '@reduxjs/toolkit';

let user = createSlice({
  name: 'user',
  initialState: { name: 'kim', age: 20 },
  reducers: {
    ChangeName(state) {
      state.name = 'john';
    },
    ChangeAge(state) {
      state.age = state.age + 1;
    },
  },
});
export const { ChangeName, ChangeAge } = user.actions;

export { user };
