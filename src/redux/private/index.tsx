import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./auth/reducer";
import { globalSlice } from "./global/reducer";

const privateStore= configureStore({
  reducer: {
    global: globalSlice.reducer,
    auth: authSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type PrivateStore = typeof privateStore;
export type PrivateState = ReturnType<typeof privateStore.getState>;
export type PrivateDispatch = typeof privateStore.dispatch;
export default privateStore;
