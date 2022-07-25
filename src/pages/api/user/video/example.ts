import { Role, ExampleVideo } from "@prisma/client";
import { handleRoute, RouteParams } from "../../../../utils/types";

async function getExampleVideo({ res, prisma }: RouteParams<ExampleVideo>) {
  const videos = await prisma.exampleVideo.findMany({
    include: { video: true },
  });
  const randomIndex = Math.floor(Math.random() * videos.length);
  return res.status(200).json(videos[randomIndex]);
}

export default handleRoute({ GET: getExampleVideo }, { role: Role.User });
