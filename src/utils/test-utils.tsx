import {
  render,
  queries,
} from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { rootReducer } from "../store";
import { DeepPartial } from "../types/DeepPartial";

export const renderWithProviders =
  (
    ui: any,
    state?: DeepPartial<
      ReturnType<
        typeof rootReducer
      >
    >,
    ...renderOptions: any[]
  ) => {
    const store =
      configureStore({
        reducer: rootReducer,
        preloadedState:
          state as any,
      });

    const Wrapper: React.FC<
      React.PropsWithChildren
    > = ({ children }) => {
      return (
        <Provider
          store={store}>
          {children}
        </Provider>
      );
    };

    return {
      store,
      ...render(ui, {
        wrapper: Wrapper,
        queries,
        ...renderOptions,
      }),
    };
  };
