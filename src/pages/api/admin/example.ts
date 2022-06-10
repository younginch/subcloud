import { Role, ExampleVideo } from "@prisma/client";
import { handleRoute, RouteParams, SubErrorType } from "../../../utils/types";

async function ExampleGet({ res, prisma }: RouteParams<ExampleVideo[]>) {
  const examples = await prisma.exampleVideo.findMany({
    include: { video: true },
  });
  return res.json(examples);
}

async function ExampleCreate({ req, res, prisma }: RouteParams<ExampleVideo>) {
  const example = await prisma.exampleVideo.create({
    data: {
      video: {
        connect: {
          videoId: new URL(req.body.url).searchParams.get("v") as string,
        },
      },
    },
  });
  return res.status(200).json(example);
}

async function ExampleDelete({ req, res, prisma }: RouteParams<ExampleVideo>) {
  if (!req.query.id) {
    return res
      .status(400)
      .json({ error: SubErrorType.InvalidRequest, message: "id is required" });
  }
  const example = await prisma.exampleVideo.delete({
    where: { id: req.query.id as string },
  });
  return res.status(200).json(example);
}

export default handleRoute(
  {
    GET: ExampleGet,
    POST: ExampleCreate,
    DELETE: ExampleDelete,
  },
  { role: Role.Admin }
);
