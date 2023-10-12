import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./auth/reducer";
import { globalSlice } from "./global/reducer";

const publicStore = configureStore({
  reducer: {
    global: globalSlice.reducer,
    auth: authSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type PublicStore = typeof publicStore;
export type PublicState = ReturnType<typeof publicStore.getState>;
export type PublicDispatch = typeof publicStore.dispatch;
export default publicStore;
