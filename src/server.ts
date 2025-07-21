import {createServer} from "node:http";
import {BASE_PORT, BASE_URL} from "./config/configs.ts";
import {dragRouter} from "./routers/dragRouter.ts";
import dragDataService from "./service/DragDataService.ts";
import {DragControllerImpl} from "./controllers/DragController.ts";

export const launchServer = () => {

    createServer(async (req,
                        res) => {
        // drag router
        const dragService =  dragDataService;
        const controller = new DragControllerImpl(dragService);
        await dragRouter(req, res, controller);

    }).listen(BASE_PORT,
        () => console.log(`Server runs at ${BASE_URL}:${BASE_PORT}`)
    )

}
