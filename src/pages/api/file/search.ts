import { handleRoute, ResFileSearch, RouteParams } from "../../../utils/types";

async function FileSearch({ req, res, prisma }: RouteParams<ResFileSearch>) {
  const { userId } = req.query;
  const files = await prisma.file.findMany({
    where: { userId: userId as string },
  });
  return res.status(200).json(files);
}

export default handleRoute({ GET: FileSearch });
