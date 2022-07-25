import joi from "joi";

export const VideoCreateSchema = joi
  .object({
    url: joi
      .string()
      .uri({ scheme: ["https", "http"] })
      .required(),
  })
  .required();

export const RequestCreateSchema = joi.object({
  serviceId: joi.string().required(),
  videoId: joi.string().required(),
  lang: joi.string().required(),
  point: joi.number().integer().required(),
});

export const UploadCreateSchema = joi
  .object({
    file: joi.required(),
    lang: joi.string().required(),
  })
  .required();

export const SubCreateSchema = joi
  .object({
    serviceId: joi.string().required(),
    videoId: joi.string().required(),
    fileId: joi.string().required(),
    lang: joi.string().required(),
  })
  .required();

export const SubUpdateSchema = joi.object({
  userId: joi.string(),
  fileId: joi.string(),
  serviceId: joi.string(),
  videoId: joi.string(),
  lang: joi.string(),
});

export const UserUpdateSchema = joi.object({
  role: joi.string(),
  point: joi.number().integer(),
});

export const RatingCreateSchema = joi.object({
  subId: joi.string().required(),
  score: joi.number().integer().required(),
  comment: joi.string(),
});

export const RatingUpdateSchema = joi.object({
  id: joi.string().required(),
  score: joi.number().integer().required(),
  comment: joi.string(),
});

export const ReviewCreateSchema = joi.object({
  type: joi.string().required(),
  content: joi.string().required(),
  startTime: joi.number().integer(),
  endTime: joi.number().integer(),
});

export const WithdrawCreateSchema = joi.object({
  point: joi.number().integer().required(),
  bankName: joi.string().required(),
  accountNumber: joi.string().required(),
});

export const UninstallFormSchema = joi.object({
  reason: joi.string().required().messages({
    "any.required": `불편한 점을 선택해 주세요`,
  }),
  opinion: joi.string().allow(null).allow("").optional(),
});
