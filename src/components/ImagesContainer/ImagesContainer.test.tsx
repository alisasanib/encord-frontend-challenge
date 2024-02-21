import "@testing-library/jest-dom";
import { renderWithProviders } from "../../utils/test-utils";
import ImagesContainer from ".";
import { FAKE_STORE } from "./ImagesContainer.mock";
import { fireEvent } from "@testing-library/react";
import axios from "axios";

jest.mock("axios");

describe("<ImageContainer />", () => {
  let getSpy: jest.SpyInstance;
  beforeEach(() => {
    getSpy = jest
      .spyOn(axios, "get")
      .mockImplementation(
        () => {
          return Promise.resolve(
            {
              data: {},
            } as any
          );
        }
      );
  });
  test("should display number of rows and data properly", () => {
    const wrapper =
      renderWithProviders(
        <ImagesContainer />,
        FAKE_STORE
      );

    const rows =
      wrapper.queryAllByTestId(
        "table-row"
      );
    expect(rows).toHaveLength(
      2
    );
    expect(
      rows[0]
    ).toHaveTextContent(
      "Fake Name"
    );
    expect(
      rows[1]
    ).toHaveTextContent(
      "Fake Name2"
    );
  });
  test("should display modal when users click on Predict button", async () => {
    const wrapper =
      renderWithProviders(
        <ImagesContainer />,
        FAKE_STORE
      );

    const predictButtons =
      wrapper.queryAllByTestId(
        "image-predict"
      );
    fireEvent.click(
      predictButtons[0]
    );
    const modal =
      wrapper.queryByTestId(
        "confirmation-modal"
      );
    expect(
      modal
    ).toBeInTheDocument();
    const titleField =
      wrapper.queryByTestId(
        "confirmation-modal-title"
      );
    const descriptionField =
      wrapper.queryByTestId(
        "confirmation-modal-description"
      );
    expect(
      titleField
    ).toBeInTheDocument();
    const confirmButton =
      wrapper.queryByTestId(
        "confirmation-modal-confirm-button"
      );
    expect(
      confirmButton
    ).toBeDisabled();

    fireEvent.change(
      titleField as any,
      {
        target: {
          value: "Test title",
        },
      }
    );
    fireEvent.change(
      descriptionField as any,
      {
        target: {
          value:
            "Test description",
        },
      }
    );

    expect(
      confirmButton
    ).toBeEnabled();

    fireEvent.click(
      confirmButton as HTMLButtonElement
    );

    expect(
      getSpy
    ).toHaveBeenCalledWith(
      "http://localhost:3000/predict"
    );
  });
});
