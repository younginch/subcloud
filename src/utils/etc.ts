import useSWR from "swr";

export function GoalExpr() {
  const { data } = useSWR("https://strapi.subcloud.app/api/goal-function");
  if (data === undefined || data.data === undefined) return undefined;
  return data.data.attributes.body;
}

export function getAuthLink(status: string, link: string): string {
  if (status === "authenticated") {
    return link;
  }
  return `/auth/signin?callbackUrl=${encodeURIComponent(link)}`;
}

export function PointBonus(
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

export function PointGoal(duration?: number, goalExpr?: any) {
  if (duration === undefined || goalExpr === undefined) return undefined;
  const goalKeys = Object.keys(goalExpr);
  const key =
    goalKeys.find((e) => duration <= Number(e)) ?? goalKeys.reverse()[0];
  const expr = goalExpr[key];
  let goal = 0;
  for (let j = 0; j < expr.length; j += 1) {
    goal += expr[j][1] * duration ** expr[j][0];
  }
  return Math.round(goal);
}
