import useSWR from "swr";

export default function PointBouns(goalPoint?: number, requestCount?: number) {
  const { data } = useSWR("https://strapi.subcloud.app/api/bonus-function");
  if (!goalPoint || !requestCount) return undefined;
  if (!data || !data.data) return undefined;
  const bonusArray = data.data.attributes.body;
  if (bonusArray.length <= requestCount) return 0;
  return bonusArray[requestCount] * goalPoint;
}
