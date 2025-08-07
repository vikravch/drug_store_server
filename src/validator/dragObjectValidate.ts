import {User} from "../model/User.js";
import {myLogger} from "../utils/logger.js";
import {HttpError} from "../errors/HttpError.js";
import {Drag} from "../model/Drag.js";
import {dragDtoSchema} from "./joiSchema/dragDtoSchema.js";

export function dragObjectValidate(
    drag: Drag | undefined,
) {
    if (!drag) {
        myLogger.log("Empty body");
        throw new HttpError (400, "Body is required");
    }
    const {error} = dragDtoSchema.validate(drag);
    if (error) {
        myLogger.log(error.message);
        throw new HttpError (400, error.message);
    }
}
