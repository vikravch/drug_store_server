import {IncomingMessage, ServerResponse} from "node:http";
import {DragController} from "../controllers/DragController.ts";
import {TYPE_DELETE, TYPE_GET, TYPE_POST, TYPE_PUT} from "../config/constants.ts";
import {myLogger} from "../utils/logger.ts";
import {BASE_URL} from "../config/configs.ts";
import {UserController} from "../controllers/UserController.ts";

const PATH_USER = "/user";
const PATH_USERS = "/users";
const PATH_LOGGER = "/logger";

export const userRouter =
    async (
        req:IncomingMessage,
        res:ServerResponse,
        controller: UserController
    ) => {
        const {url, method} = req;
        const parsedUrl = new URL( url!, BASE_URL);

        myLogger.log(`I got request ${url} ${method}`)
        switch (parsedUrl.pathname + method) {
            case PATH_USER + TYPE_POST:{
                await controller.addUser(req, res);
                break;
            }
            case PATH_USERS + TYPE_GET:{
                await controller.getAllUsers(req, res);
                break;
            }
            case PATH_USER + TYPE_PUT:{
                await controller.updateUser(req, res);
                break;
            }
            case PATH_USER + TYPE_GET:{
                await controller.getUserById(req, res);
                break;
            }
            case PATH_USER + TYPE_DELETE:{
                await controller.removeUser(req, res);
                break;
            }
            case PATH_LOGGER + TYPE_GET:{
                const result = myLogger.getLogArray();
                res.writeHead(200, {"Content-Type":"application/json"});
                res.end(JSON.stringify(result))
                break;
            }

            default: {
                res.writeHead(404, {"Content-Type":"text/plain"})
                res.end("Page not found")
                break;
            }
        }
    }
