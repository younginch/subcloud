import { EditorFile } from "@prisma/client";
import { handleRoute, RouteParams, SubErrorType } from "../../../utils/types";

async function createEditor({
  req,
  res,
  prisma,
  session,
}: RouteParams<EditorFile>) {
  const subId = req.query.subId as string;
  const sub = await prisma.sub.findUniqueOrThrow({
    where: { id: subId },
  });
  if (!session || session.user.id !== sub.userId) {
    return res.status(401).json({
      error: SubErrorType.NotUserSpecificAuthenticated,
      message: "Sub user is different from authenticated user",
    });
  }
  const newEditor = await prisma.editorFile.create({ data: { subId: sub.id } });
  return res.status(201).json(newEditor);
}

async function updateEditor({
  req,
  res,
  prisma,
  session,
}: RouteParams<EditorFile>) {
  const editorFileId = req.query.id as string;
  const editorFile = await prisma.editorFile.findUniqueOrThrow({
    where: { id: editorFileId },
    include: { sub: true },
  });
  if (!session || session.user.id !== editorFile.sub.userId) {
    return res.status(401).json({
      error: SubErrorType.NotUserSpecificAuthenticated,
      message: "Sub user is different from authenticated user",
    });
  }
  const updatedEditorFile = await prisma.editorFile.update({
    where: { id: editorFileId },
    data: {},
  });
  return res.status(200).json(updatedEditorFile);
}

export default handleRoute({ POST: createEditor, PATCH: updateEditor });
