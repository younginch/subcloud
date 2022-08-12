import useSWR from "swr";

export default function PointBouns(
  goalPoint?: number,
  requestCount?: number,
  isBonus?: boolean
) {
  const { data } = useSWR("https://strapi.subcloud.app/api/bonus-function");
  if (!isBonus) return 0;
  if (goalPoint === undefined || requestCount === undefined) return undefined;
  if (data === undefined || data.data === undefined) return undefined;
  const bonusArray = data.data.attributes.body;
  if (bonusArray.length <= requestCount) return 0;
  return Math.round(bonusArray[requestCount] * goalPoint);
}
