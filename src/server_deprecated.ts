import {createServer} from "node:http";
import {BASE_PORT, BASE_URL} from "./config/configs.ts";
import {dragRouter} from "./routers/dragRouter.ts";
import {sl} from "./sl.ts";
import {userRouter} from "./routers/userRouter.ts";

export const launchServer = () => {

    createServer(async (req,
                        res) => {

        await dragRouter(req, res, sl.dragController);
        await userRouter(req, res, sl.userController);

    }).listen(BASE_PORT,
        () => console.log(`Server runs at ${BASE_URL}:${BASE_PORT}`)
    )

}
