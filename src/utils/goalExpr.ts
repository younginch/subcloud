import useSWR from "swr";

export default function GoalExpr() {
  const { data } = useSWR("https://strapi.subcloud.app/api/goal-function");
  if (data === undefined || data.data === undefined) return undefined;
  return data.data.attributes.body;
}
