import { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import styles from "./ImageViewer.module.css";
import { PredictionBoundingBox } from "../../types/dto/predictions.dto";

const style = {
  position:
    "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform:
    "translate(-50%, -50%)",
  //   width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  gap: "30px",
  width: "fit-content",
  height: "max-content",
};

interface ImageViewerProps {
  image: string;
  visible: boolean;
  predictions: any;
  onClose?: () => void;
}

export default function ImageViewer(
  props: ImageViewerProps
) {
  const [ratio, setRatio] =
    useState(0);
  const handleImageLoad = (
    event: any
  ) => {
    const img = event.target;
    setRatio(
      img.naturalWidth /
        img.clientWidth
    );
  };
  if (!props.image) {
    return;
  }
  return (
    <Modal
      open={props.visible}
      onClose={props.onClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'>
      <Box sx={style}>
        <div
          style={{
            position:
              "relative",
            display: "flex",
          }}>
          <img
            alt='bounding box'
            style={{
              maxWidth: 800,
            }}
            onLoad={
              handleImageLoad
            }
            src={props?.image}
          />
          {props.predictions.predictions?.map(
            (
              prediction: PredictionBoundingBox,
              id: number
            ) => (
              <div
                key={id}
                className={
                  styles.element_highlighter
                }
                style={{
                  left:
                    prediction
                      .bbox
                      .x1 /
                    ratio,
                  width:
                    (prediction
                      .bbox
                      .x2 -
                      prediction
                        .bbox
                        .x1) /
                    ratio,
                  top:
                    prediction
                      .bbox
                      .y1 /
                    ratio,
                  height:
                    (prediction
                      .bbox
                      .y2 -
                      prediction
                        .bbox
                        .y1) /
                    ratio,
                }}>
                <span
                  style={{
                    bottom:
                      "10px",
                    position:
                      "absolute",
                    right:
                      "10px",
                    color:
                      "black",
                  }}>
                  {
                    prediction.label
                  }
                  (
                  {
                    prediction.score
                  }
                  %)
                </span>
              </div>
            )
          )}
        </div>
      </Box>
    </Modal>
  );
}
