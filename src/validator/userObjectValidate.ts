import {User} from "../model/User.js";
import {userDtoSchema} from "./joiSchema/userDtoSchema.js";
import {myLogger} from "../utils/logger.js";
import {HttpError} from "../errors/HttpError.js";
import {isUserType} from "../utils/tools.js";

export function userObjectValidate(
    user: User | undefined,
) {
    if (!user) {
        myLogger.log("Empty body");
        throw new HttpError (400, "Body is required");
    }
    const {error} = userDtoSchema.validate(user);
    if (error) {
        myLogger.log(error.message);
        throw new HttpError (400, error.message);
    }
    if (!isUserType(user)){
        myLogger.log("Wrong body");
        throw new HttpError (400, "Invalid Body");
    }
}
