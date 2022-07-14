export function youtubeDurationToSeconds(duration: string): number {
  const regex = /PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/;
  const regex_result = regex.exec(duration);
  if (!regex_result) {
    return 0;
  }
  const hours = parseInt(regex_result[1] || "0");
  const minutes = parseInt(regex_result[2] || "0");
  const seconds = parseInt(regex_result[3] || "0");
  return hours * 60 * 60 + minutes * 60 + seconds;
}
