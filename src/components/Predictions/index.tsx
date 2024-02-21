import {
  useMemo,
  useState,
} from "react";
import CustomTable from "../CustomTable";
import { Button } from "@mui/material";
import ImageViewer from "../ImageViewer";
import { useAppSelector } from "../../store/hooks";
import { predictionsSelector } from "../../store/slices/predictionsSlice";
import { Prediction } from "../../types/dto/predictions.dto";
import styles from "./styles.module.css";

const Predictions = () => {
  const predictions =
    useAppSelector(
      predictionsSelector
    );

  const [
    selectedPrediction,
    setSelectedPrediction,
  ] = useState<{
    url: string;
    predicts: any;
  } | null>(null);
  const headers =
    useMemo(() => {
      return [
        {
          id: 0,
          data: "Title",
        },
        {
          id: 1,
          data: "Description",
        },
        {
          id: 2,
          data: "Time stamp",
        },
        {
          id: 3,
          data: "View",
        },
      ];
    }, []);
  const rows = useMemo(() => {
    return predictions.map(
      (
        prediction: Prediction,
        id
      ) => {
        return {
          id,
          data: [
            {
              data: prediction.title,
            },
            {
              data: prediction.description,
            },
            {
              data: prediction.runAt,
            },
            {
              data: (
                <Button
                  onClick={() =>
                    setSelectedPrediction(
                      {
                        url: prediction.url,
                        predicts:
                          prediction.predictions,
                      }
                    )
                  }
                  variant='contained'>
                  View
                </Button>
              ),
            },
          ],
        };
      }
    );
  }, [predictions]);
  return (
    <div
      className={
        styles.predictions_container
      }>
      <CustomTable
        headers={headers}
        rows={rows}
      />
      <ImageViewer
        onClose={() =>
          setSelectedPrediction(
            null
          )
        }
        image={
          selectedPrediction?.url as string
        }
        visible={
          !!selectedPrediction
        }
        predictions={
          selectedPrediction?.predicts
        }
      />
    </div>
  );
};

export default Predictions;
