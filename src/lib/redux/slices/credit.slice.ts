import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CreditState {
  credits_remaining: number | null;
  credit_total_used: number | null;
}

const initialState: CreditState = {
  credit_total_used: null,
  credits_remaining: null,
};

export const creditSlice = createSlice({
  name: "credit",
  initialState,
  reducers: {
    setCredit: (state, action: PayloadAction<CreditState>) => {
      Object.assign(state, action.payload);
    },
  },
});

export const { setCredit } = creditSlice.actions;
export default creditSlice.reducer;
