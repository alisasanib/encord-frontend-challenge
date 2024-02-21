import {
  createSlice,
  PayloadAction,
  createSelector,
} from "@reduxjs/toolkit";
import type { RootState } from "..";
import { UploadedImage } from "../../types/dto/images.dto";

export interface ImagesState {
  data: UploadedImage[];
  loading: boolean;
  error: boolean;
}

export const initialState: ImagesState =
  {
    data: [],
    loading: false,
    error: false,
  };

export const ImagesSlice =
  createSlice({
    name: "images",
    initialState,
    reducers: {
      setImages: (
        state,
        action: PayloadAction<
          UploadedImage[]
        >
      ) => {
        state.data =
          action.payload;
      },
      setImage: (
        state,
        action: PayloadAction<UploadedImage>
      ) => {
        state.data = [
          ...state.data,
          action.payload,
        ];
      },
    },
  });

export default ImagesSlice.reducer;

export const {
  setImages,
  setImage,
} = ImagesSlice.actions;

const selfSelector = (
  state: RootState
) => state.images;

export const imagesSelector =
  createSelector(
    selfSelector,
    (state) => state.data
  );

export const fetchImages =
  () => {
    return async () => {};
  };
