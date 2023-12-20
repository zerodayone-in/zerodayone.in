import { createSlice } from "@reduxjs/toolkit";
import loaderState from "./state";

function initialState(): loaderState {
  return {
    progress: 0,
    loading: false,
    items: [],
    calls: 0,
  };
}

export const moduleName = "loader";

export const loaderSlice = createSlice({
  name: moduleName,
  initialState: initialState(),
  reducers: {
    pushContent: (state, action) => {
      state.calls++;
      if (state.items.length === 0) {
        state.items = [];
        state.items.push({
          content: action.payload.content,
          progress: action.payload.progress,
          error: null,
          height: state.calls,
        });
        state.loading = true;
      } else {
        let found = false;
        state.progress = 0;

        for (let i = 0; i < state.items.length; i++) {
          if (state.items[i].content === action.payload.content) {
            found = true;
            state.items[i].progress = action.payload.progress;
          }
          state.progress += state.items[i].progress;
        }

        state.progress = state.progress / state.items.length;

        if (!found) {
          state.items.push({
            content: action.payload.content,
            progress: action.payload.progress,
            error: null,
            height: state.calls,
          });
        }

        if (state.progress === 100) {
          state.loading = false;
        } else {
          state.loading = true;
        }
      }
      console.log("Loading state:", JSON.stringify(state));
    },
    cleanLoader: (state) => {
      state.items = [];
    },
  },
});

export const { pushContent, cleanLoader } = loaderSlice.actions;
export default loaderSlice.reducer;
