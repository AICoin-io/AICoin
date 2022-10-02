import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

// Define a type for the slice state
interface SetAddress {
  connectWallet: string;
  isConnected: Boolean;
}

// Define the initial state using that type
const initialState: SetAddress = {
  connectWallet: "Connect Wallet",
  isConnected: false,
};

export const setAccount = createSlice({
  name: "counter",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setAddress: (state, action: PayloadAction<string>) => {
      state.connectWallet = action.payload;
    },
    isConnected: (state, action: PayloadAction<Boolean>) => {
      state.isConnected = action.payload;
    },
  },
});

export const { setAddress, isConnected } = setAccount.actions;

// Other code such as selectors can use the imported `RootState` type
export const setAddr = (state: RootState) => state.counter.connectWallet;
export const setConnected = (state: RootState) => state.counter.isConnected;

export default setAccount.reducer;
