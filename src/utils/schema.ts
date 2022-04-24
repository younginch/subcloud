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
});

export const SubCreateSchema = joi
  .object({
    serviceId: joi.string().required(),
    videoId: joi.string().required(),
    fileId: joi.string().required(),
    lang: joi.string().required(),
  })
  .required();
