export default function PointGoal(duration?: number, goalExpr?: any) {
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
