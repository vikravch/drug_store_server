import {BASE_PORT, BASE_URL} from "./config/configs.ts";
import {HttpError} from "./errors/HttpError.ts";
import express, {NextFunction, Request, Response} from 'express';
import {
    loggerRouterExpress,
    PATH_LOGGER,
    PATH_USER,
    PATH_USERS,
    userRouterExpress,
    usersRouterExpress
} from "./routers/userRouter.ts";
import {dragRouterExpress, PATH_DRAGS} from "./routers/dragRouter.ts";

export const launchServer = () => {
    const app = express();
    app.listen(BASE_PORT,
        () => console.log(`Server runs at ${BASE_URL}:${BASE_PORT}`))
    app.use(express.json())

    app.use(PATH_USER, userRouterExpress);
    app.use(PATH_USERS, usersRouterExpress);
    app.use(PATH_LOGGER, loggerRouterExpress);

    app.use(PATH_DRAGS, dragRouterExpress);

    app.use((req, res) => {
        res.status(400).send("Bad request")
    })

    app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
        if (err instanceof HttpError)
            res.status(err.status).send(err.message)
        else
            res.status(500).send("Unknown server error!")
    })
}
