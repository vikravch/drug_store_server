var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { sendError } from "../utils/tools.js";
import { TYPE_DELETE, TYPE_GET, TYPE_POST, TYPE_PUT } from "../config/constants.js";
const PATH_DRUGS = "drugs";
export const dragRouter = (req, res, controller) => __awaiter(void 0, void 0, void 0, function* () {
    const { url, method } = req;
    const firstURLPathSegment = url === null || url === void 0 ? void 0 : url.split("/")[1];
    try {
        switch (firstURLPathSegment + method) {
            case PATH_DRUGS + TYPE_GET: {
                const secondURLPathSegment = url === null || url === void 0 ? void 0 : url.split("/")[2];
                if (secondURLPathSegment) {
                    controller.getDragsById(secondURLPathSegment, res);
                }
                else {
                    controller.getDrags(res);
                }
                break;
            }
            case PATH_DRUGS + TYPE_POST: {
                controller.postDrags(req, res);
                break;
            }
            case PATH_DRUGS + TYPE_DELETE: {
                const secondURLPathSegment = url === null || url === void 0 ? void 0 : url.split("/")[2];
                if (secondURLPathSegment) {
                    controller.deleteDrag(secondURLPathSegment, res);
                }
                else {
                    sendError("Empty ID", res);
                }
                break;
            }
            case PATH_DRUGS + TYPE_PUT: {
                controller.putDrag(req, res);
                break;
            }
        }
    }
    catch (e) {
        sendError("Server error :(", res);
    }
});
