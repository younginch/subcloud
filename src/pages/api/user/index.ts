import {
  handleRoute,
  ResUser,
  RouteParams,
  SubErrorType,
} from "../../../utils/types";

async function UserRead({ req, res, prisma }: RouteParams<ResUser>) {
  if (!req.query.id) {
    return res.status(400).json({
      error: SubErrorType.Validation,
      message: "GET requests should have an ID",
    });
  }
  const user = await prisma.user.findUnique({
    where: { id: req.query.id as string },
  });
  if (!user) {
    return res
      .status(404)
      .json({ error: SubErrorType.NotFound, message: "User" });
  }
  return res.status(200).json(user);
}

async function UserDelete({ req, res, prisma, session }: RouteParams<ResUser>) {
  const { id } = req.query;
  if (!id) {
    return res
      .status(400)
      .json({ error: SubErrorType.Validation, message: "No id provided" });
  }
  const user = await prisma.user.findUnique({
    where: { id: id as string },
  });
  if (!user) {
    return res
      .status(404)
      .json({ error: SubErrorType.NotFound, message: "User" });
  }
  if (user.id !== id) {
    return res.status(403).json({
      error: SubErrorType.NotUserSpecificAuthenticated,
      message: "Not authorized",
    });
  }
  const deletedUser = await prisma.user.delete({
    where: { id: id as string },
  });
  return res.status(200).json(deletedUser);
}

export default handleRoute(
  { GET: UserRead, DELETE: UserDelete },
  { useSession: true }
);
