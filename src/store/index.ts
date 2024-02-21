import {
  combineReducers,
  configureStore,
} from "@reduxjs/toolkit";
import imagesSlice from "./slices/imagesSlice";
import predictionsSlice from "./slices/predictionsSlice";

export const rootReducer =
  combineReducers({
    images: imagesSlice,
    predictions:
      predictionsSlice,
  });

export const store =
  configureStore({
    reducer: rootReducer,
  });

export type AppStore =
  typeof store;
export type RootState =
  ReturnType<
    AppStore["getState"]
  >;
export type AppDispatch =
  AppStore["dispatch"];
