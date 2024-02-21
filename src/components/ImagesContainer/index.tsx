"use client";

import {
  useCallback,
  useMemo,
  useState,
} from "react";
import CustomTable from "../CustomTable";
import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import ConfirmationModal from "../ConfirmationModal";
import { useSelector } from "react-redux";
import {
  imagesSelector,
  setImage,
} from "../../store/slices/imagesSlice";
import { UploadedImage } from "../../types/dto/images.dto";
import { useAppDispatch } from "../../store/hooks";
import { fetchPrediction } from "../../store/slices/predictionsSlice";
import styles from "./styles.module.css";

const VisuallyHiddenInput =
  styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

const ImagesContainer =
  () => {
    const dispatch =
      useAppDispatch();
    const images =
      useSelector(
        imagesSelector
      );
    const [
      selectedImage,
      setSelectedImage,
    ] =
      useState<UploadedImage | null>(
        null
      );
    const [
      isConfirmationOpen,
      setIsConfirmationOpen,
    ] = useState(false);

    const headers =
      useMemo(() => {
        return [
          {
            id: 0,
            data: "Filename",
          },
          {
            id: 1,
            data: "Size of image",
          },
          {
            id: 2,
            data: "Time of Upload",
          },
          {
            id: 3,
            data: "Predict",
          },
        ];
      }, []);
    const rows =
      useMemo(() => {
        return images.map(
          (image, id) => {
            return {
              id,
              data: [
                {
                  data: image.name,
                },
                {
                  data: image.size,
                },
                {
                  data: image.uploadedAt,
                },
                {
                  data: (
                    <Button
                      data-testid='image-predict'
                      onClick={() => {
                        setIsConfirmationOpen(
                          true
                        );
                        setSelectedImage(
                          image
                        );
                      }}
                      variant='contained'>
                      Predict
                    </Button>
                  ),
                },
              ],
            };
          }
        );
      }, [images]);

    const handleCloseConfirmation =
      useCallback(() => {
        setIsConfirmationOpen(
          false
        );
        setSelectedImage(
          null
        );
      }, []);
    const handleConfirmConfirmation =
      useCallback(
        (
          title: string,
          description: string
        ) => {
          dispatch(
            fetchPrediction({
              title,
              description,
              url: selectedImage?.url as string,
              runAt:
                new Date().toLocaleString(),
            })
          );
          setIsConfirmationOpen(
            false
          );
          setSelectedImage(
            null
          );
        },
        [
          selectedImage,
          dispatch,
        ]
      );

    return (
      <div
        className={
          styles.images_container
        }>
        <Button
          sx={{
            width: "200px",
            alignSelf:
              "center",
          }}
          component='label'
          data-testid='upload-button'
          role={undefined}
          variant='contained'
          tabIndex={-1}
          startIcon={
            <CloudUploadIcon />
          }>
          Upload file
          <VisuallyHiddenInput
            onChange={(
              e: React.ChangeEvent<HTMLInputElement>
            ) => {
              if (
                e.target
                  .files?.[0]
              ) {
                const file =
                  e.target
                    .files?.[0];
                dispatch(
                  setImage({
                    url: URL.createObjectURL(
                      file
                    ),
                    name: file.name,
                    size: file.size,
                    uploadedAt:
                      new Date().toLocaleString(),
                  })
                );
              }
            }}
            type='file'
          />
        </Button>
        <CustomTable
          headers={headers}
          rows={rows}
        />
        <ConfirmationModal
          visible={
            isConfirmationOpen
          }
          onClose={
            handleCloseConfirmation
          }
          onConfirm={
            handleConfirmConfirmation
          }
        />
      </div>
    );
  };

export default ImagesContainer;
