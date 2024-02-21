export interface PredictionBoundingBox {
  bbox: {
    x1: number;
    x2: number;
    y1: number;
    y2: number;
  };
  label: string;
  score: string;
}

export interface Prediction {
  url: string;
  runAt: string;
  title: string;
  description: string;
  predictions: PredictionBoundingBox[];
}
