import { Role, User } from "@prisma/client";
import { handleRoute, RouteParams, SubErrorType } from "../../../utils/types";

type Langs = {
  baseLangs: string[];
  requestLangs: string[];
};

async function getLangs({ res, prisma, session }: RouteParams<Langs>) {
  const user = await prisma.user.findUnique({
    where: {
      id: session?.user.id!,
    },
  });
  if (!user) {
    return res
      .status(404)
      .json({ error: SubErrorType.NotFound, message: "User not found" });
  }
  return res.status(200).json({
    baseLangs: user.baseLangs,
    requestLangs: user.requestLangs,
  });
}

async function updateLangs({ req, res, prisma, session }: RouteParams<Langs>) {
  const { baseLang, requestLang } = req.body;
  const user = await prisma.user.findUnique({
    where: { id: session?.user.id! },
  });
  if (!user) {
    return res
      .status(404)
      .json({ error: SubErrorType.NotFound, message: "User not found" });
  }
  let data: any = {};
  if (baseLang) {
    data.baseLangs = [baseLang];
  }
  if (requestLang) {
    data.requestLangs = [requestLang];
  }
  const updatedUser = await prisma.user.update({
    where: { id: session?.user.id! },
    data,
  });
  return res.status(201).json({
    baseLangs: updatedUser.baseLangs,
    requestLangs: updatedUser.requestLangs,
  });
}

export default handleRoute(
  {
    GET: getLangs,
    PATCH: updateLangs,
  },
  { role: Role.User }
);
