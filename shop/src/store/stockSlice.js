import { createSlice } from '@reduxjs/toolkit';
let stock = createSlice({
  name: 'stock',
  initialState: [],
  reducers: {
    IncreasCounter(state, action) {
      let index = state.findIndex((x) => {
        return x.id === action.payload;
      });
      state[index].count++;
    },
    DecreaseCounter(state, action) {
      let index = state.findIndex((x) => {
        return x.id === action.payload;
      });
      if (state[index].count > 0) {
        state[index].count--;
      }
    },
    UpdateStock(state, action) {
      let index = state.findIndex((x) => {
        return x.id === action.payload.id;
      });
      if (index > -1) {
        state[index].count += 1;
      } else {
        action.payload.count = 1;
        state.push(action.payload);
      }
    },
    DeleteStock(state, action) {
      let index = state.findIndex((x) => {
        return x.id === action.payload;
      });

      if (index > -1) {
        state.splice(index, 1);
      }
    },
  },
});
export const { IncreasCounter, UpdateStock, DeleteStock, DecreaseCounter } =
  stock.actions;

export { stock };
