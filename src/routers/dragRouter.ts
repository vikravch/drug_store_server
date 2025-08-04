import {IncomingMessage, ServerResponse} from "node:http";
import {sendError} from "../utils/tools.ts";
import {TYPE_DELETE, TYPE_GET, TYPE_POST, TYPE_PUT} from "../config/constants.ts";
import {DragController} from "../controllers/DragController.ts";

const PATH_DRUGS = "drugs";

export const dragRouter =
    async (
        req:IncomingMessage,
        res:ServerResponse,
        controller: DragController
    ) => {
        const {url, method} = req;
        const firstURLPathSegment = url?.split("/")[1];
        try {
            switch (firstURLPathSegment! + method){
                case PATH_DRUGS + TYPE_GET: {
                    const secondURLPathSegment = url?.split("/")[2];
                    if (secondURLPathSegment){
                        controller.getDragsById(
                            secondURLPathSegment, res);
                    } else {
                        controller.getDrags(res);
                    }
                    break;
                }
                case PATH_DRUGS + TYPE_POST:{
                        controller.postDrags(req,res)
                    break
                }
                case PATH_DRUGS + TYPE_DELETE: {
                    const secondURLPathSegment = url?.split("/")[2];
                    if (secondURLPathSegment) {
                        controller.deleteDrag(
                            secondURLPathSegment, res
                        )
                    } else {
                        sendError("Empty ID", res);
                    }
                    break
                }
                case PATH_DRUGS + TYPE_PUT: {
                        controller.putDrag(req,res)
                    break
                }
            }
        } catch (e) {
            sendError("Server error :(", res);
        }
    }
