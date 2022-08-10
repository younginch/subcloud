import { Role } from "@prisma/client";
import { deleteAllObjects } from "../../../utils/aws";
import { handleRoute, RouteParams } from "../../../utils/types";

async function getFiles({ res }: RouteParams<{}>) {
  return res.status(200).json({});
}

async function deleteFiles({ res }: RouteParams<{}>) {
  await deleteAllObjects();
  return res.status(200).json({});
}

export default handleRoute(
  { GET: getFiles, DELETE: deleteFiles },
  { role: Role.Admin }
);
