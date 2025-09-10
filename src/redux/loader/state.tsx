interface LoadingContent {
  error: string | null;
  progress: number;
  content: string;
  height: number;
}

export default interface LoadingState {
  calls: number;
  loading: boolean;
  progress: number;
  items: LoadingContent[];
}
