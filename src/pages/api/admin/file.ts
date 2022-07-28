import { deleteAllObjects } from "../../../utils/aws";
import { handleRoute, RouteParams } from "../../../utils/types";

async function deleteFile({ res }: RouteParams<{}>) {
  await deleteAllObjects();
  return res.status(200).json({});
}

export default handleRoute({ DELETE: deleteFile });
