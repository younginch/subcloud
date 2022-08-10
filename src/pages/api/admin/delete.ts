import { Role } from "@prisma/client";
import { handleRoute, RouteParams } from "../../../utils/types";

function getAllPropertyNames(obj: any) {
  // eslint-disable-next-line prefer-const
  let names: string[] = [];
  do {
    // eslint-disable-next-line prefer-spread
    names.push.apply(names, Object.getOwnPropertyNames(obj));
    // eslint-disable-next-line no-param-reassign
    obj = Object.getPrototypeOf(obj);
  } while (obj !== Object.prototype);
  return names.filter(
    (name) =>
      name !== "constructor" &&
      !name.startsWith("_") &&
      !name.startsWith("$") &&
      name !== "getEngine"
  );
}

async function AdminDelete({ res, prisma }: RouteParams<{}>) {
  const tables = getAllPropertyNames(prisma);
  tables.forEach((table) => {
    // @ts-ignore:next-line
    prisma[table].deleteMany({});
  });
  return res.status(200).json({});
}

export default handleRoute(
  {
    GET: AdminDelete,
  },
  { role: Role.Admin, debugOnly: true }
);
