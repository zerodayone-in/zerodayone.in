import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./auth/reducer";
import { globalSlice } from "./global/reducer";
import { loaderSlice } from "./loader/reducer";

const store = configureStore({
  reducer: {
    global: globalSlice.reducer,
    auth: authSlice.reducer,
		loader: loaderSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type Store = typeof store;
export type State = ReturnType<typeof store.getState>;
export type Dispatch = typeof store.dispatch;
export default store;
