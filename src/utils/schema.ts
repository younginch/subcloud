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

export const SubCreateSchema = joi
  .object({
    serviceId: joi.string().required(),
    videoId: joi.string().required(),
    fileId: joi.string().required(),
    lang: joi.string().required(),
  })
  .required();

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
