export default function getInfoFromUrl(urlString: string): {
  id: string;
  type: string;
} {
  const url = new URL(urlString);
  if (url.hostname === "www.youtube.com") {
    const videoId = url.searchParams.get("v");
    return { id: `youtube-${videoId}`, type: "youtube" };
  }
  return { id: `${url.hostname}-${url.search}`, type: "unknown" };
}
