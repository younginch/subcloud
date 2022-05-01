export default interface ResError {
  error: string;
  log?: string;
}

enum ResErrorType {
  NotFound,
}
