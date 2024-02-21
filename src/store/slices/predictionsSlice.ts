import {
  createSlice,
  PayloadAction,
  Dispatch,
  createSelector,
} from "@reduxjs/toolkit";
import type { RootState } from "..";
import { Prediction } from "../../types/dto/predictions.dto";
import axios from "axios";

export interface PredictionsState {
  data: Prediction[];
  loading: boolean;
  error: boolean;
}

export const initialState: PredictionsState =
  {
    data: [],
    loading: false,
    error: false,
  };

export const PredictionsSlice =
  createSlice({
    name: "predictions",
    initialState,
    reducers: {
      setPrediction: (
        state,
        action: PayloadAction<Prediction>
      ) => {
        state.data = [
          ...state.data,
          action.payload,
        ];
      },
    },
  });

export default PredictionsSlice.reducer;

export const {
  setPrediction,
} = PredictionsSlice.actions;

const selfSelector = (
  state: RootState
) => state.predictions;

export const predictionsSelector =
  createSelector(
    selfSelector,
    (state) => state.data
  );

export const predictionsCounterSelector =
  createSelector(
    selfSelector,
    (state) =>
      state.data.length
  );

export const fetchPrediction =
  ({
    url,
    title,
    description,
    runAt,
  }: Omit<
    Prediction,
    "predictions"
  >) => {
    return async (
      dispatch: Dispatch
    ) => {
      axios
        .get(
          "http://localhost:3000/predict"
        )
        .then((response) => {
          dispatch(
            setPrediction({
              url,
              title,
              description,
              runAt,
              predictions:
                response.data,
            })
          );
        });
    };
  };
