import TabsContainer from "../TabsContainer";
import ImagesContainer from "../ImagesContainer";
import Predictions from "../Predictions";
import { useAppSelector } from "../../store/hooks";
import { imagesCounterSelector } from "../../store/slices/imagesSlice";
import styles from "./styles.module.css";
import { predictionsCounterSelector } from "../../store/slices/predictionsSlice";

const ImagesPredictionsContainer =
  () => {
    const imagesCounter =
      useAppSelector(
        imagesCounterSelector
      );
    const predictionsCounter =
      useAppSelector(
        predictionsCounterSelector
      );
    return (
      <TabsContainer
        tabs={[
          {
            label: (
              <div>
                Images{" "}
                <span
                  className={
                    styles.tab_counter
                  }>
                  {
                    imagesCounter
                  }
                </span>
              </div>
            ),
            index: 0,
            content: (
              <ImagesContainer />
            ),
          },
          {
            label: (
              <div>
                Predictions{" "}
                <span
                  className={
                    styles.tab_counter
                  }>
                  {
                    predictionsCounter
                  }
                </span>
              </div>
            ),
            index: 1,
            content: (
              <Predictions />
            ),
          },
        ]}
      />
    );
  };

export default ImagesPredictionsContainer;
