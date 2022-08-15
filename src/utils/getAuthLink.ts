export default function getAuthLink(status: string, link: string): string {
  if (status === "authenticated") {
    return link;
  }
  return `/auth/signin?callbackUrl=${encodeURIComponent(link)}`;
}
