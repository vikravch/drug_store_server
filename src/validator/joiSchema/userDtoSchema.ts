import Joi from "joi"
export const userDtoSchema = Joi.object({
    id: Joi.number().min(1).max(1000).required(),
    userName: Joi.string().required(),
})
