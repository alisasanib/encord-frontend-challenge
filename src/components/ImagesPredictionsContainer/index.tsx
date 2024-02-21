import TabsContainer from "../TabsContainer";
import ImagesContainer from "../ImagesContainer";
import Predictions from "../Predictions";

const ImagesPredictionsContainer =
  () => {
    return (
      <TabsContainer
        tabs={[
          {
            label: "Images",
            index: 0,
            content: (
              <ImagesContainer />
            ),
          },
          {
            label:
              "Predictions",
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
