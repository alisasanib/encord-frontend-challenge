import { DeepPartial } from "../../types/DeepPartial";
import { rootReducer } from "../../store";

export const FAKE_STORE: DeepPartial<
  ReturnType<
    typeof rootReducer
  >
> = {
  images: {
    data: [
      {
        url: "image1",
        name: "Fake Name",
        size: 123,
        uploadedAt:
          "19/02/2024",
      },
      {
        url: "image2",
        name: "Fake Name2",
        size: 456,
        uploadedAt:
          "20/02/2024",
      },
    ],
  },
};
