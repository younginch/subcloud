import { EditorFile, Role } from "@prisma/client";
import { getS3Url } from "../../../utils/aws";
import { handleRoute, RouteParams, SubErrorType } from "../../../utils/types";

type EditorFileWithUrl = EditorFile & { fileUrl: string };

async function getEditor({
  req,
  res,
  prisma,
  session,
}: RouteParams<EditorFileWithUrl>) {
  const editorFileId = req.query.id as string;
  const editorFile = await prisma.editorFile.findUnique({
    where: { id: editorFileId },
    include: { sub: { include: { file: true } } },
  });
  if (!editorFile) {
    return res.status(404).json({
      error: SubErrorType.NotFound,
      message: "Editor file not found",
    });
  }
  const fileUrl = await getS3Url(editorFile.sub.file.key);
  if (!session || session.user.id !== editorFile.sub.userId) {
    return res.status(401).json({
      error: SubErrorType.NotUserSpecificAuthenticated,
      message: "Sub user is different from authenticated user",
    });
  }
  return res.status(200).json({ ...editorFile, fileUrl });
}

async function createEditor({
  req,
  res,
  prisma,
  session,
}: RouteParams<EditorFile>) {
  const subId = req.body.subId as string;
  const sub = await prisma.sub.findUnique({
    where: {
      id: subId,
    },
  });
  if (!sub) {
    return res.status(404).json({
      error: SubErrorType.NotFound,
      message: "Sub not found",
    });
  }
  if (!session || session.user.id !== sub.userId) {
    return res.status(401).json({
      error: SubErrorType.NotUserSpecificAuthenticated,
      message: "Sub user is different from authenticated user",
    });
  }
  const newEditor = await prisma.editorFile.create({ data: { subId: sub.id } });
  return res.status(201).json(newEditor);
}

/**
 * body로 fileId를 받아서 sub에 연결한다.
 */
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
    data: { sub: { update: { fileId: req.body.fileId } } },
  });
  return res.status(200).json(updatedEditorFile);
}

async function deleteEditor({
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
  const deletedEditorFile = await prisma.editorFile.delete({
    where: { id: editorFileId },
  });
  return res.status(200).json(deletedEditorFile);
}

export default handleRoute(
  {
    GET: getEditor,
    POST: createEditor,
    PATCH: updateEditor,
    DELETE: deleteEditor,
  },
  { role: Role.User }
);
