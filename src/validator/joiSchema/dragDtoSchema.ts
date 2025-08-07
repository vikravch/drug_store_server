import Joi from "joi";

export const dragDtoSchema = Joi.object({
    id: Joi.string().min(36).max(36).required(),
    dragName: Joi.string().min(3).max(100).required(),
    price: Joi.number().min(0.01).max(10000).required(),
    count: Joi.number().min(1).max(100).required(),
    storeId: Joi.string().min(36).max(36).required(),
    description: Joi.string().min(1).max(200).required(),
});
