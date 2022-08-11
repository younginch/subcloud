import useSWR from "swr";

export default function GoalExpr() {
  const { data } = useSWR("https://strapi.subcloud.app/api/goal-function");
  if (!data || !data.data) return undefined;
  return data.data.attributes.body;
}
