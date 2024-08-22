import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface InitialStateProps {
  isCollapsed: boolean;
}

const initialState: InitialStateProps = {
  isCollapsed: false,
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setIsCollapsed: (state, action: PayloadAction<boolean>) => {
      state.isCollapsed = action.payload;
    },
  },
});

export const { setIsCollapsed } = globalSlice.actions;

export default globalSlice.reducer;
