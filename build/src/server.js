import { BASE_PORT, BASE_URL } from "./config/configs.js";
import { HttpError } from "./errors/HttpError.js";
import express from 'express';
import { loggerRouterExpress, PATH_LOGGER, PATH_USER, PATH_USERS, userRouterExpress, usersRouterExpress } from "./routers/userRouter.js";
import { dragRouterExpress, PATH_DRAGS } from "./routers/dragRouter.js";
import cors from 'cors';
export const launchServer = () => {
    const app = express();
    app.listen(BASE_PORT, () => console.log(`Server runs at ${BASE_URL}:${BASE_PORT}`));
    app.use(express.json());
    //app.use(cors())
    const allowedOrigins = ['http://localhost:5173'];
    app.use(cors({
        origin: function (origin, callback) {
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            }
            else {
                callback(new Error('Not allowed by CORS'));
            }
        }
    }));
    app.use(PATH_USER, userRouterExpress);
    app.use(PATH_USERS, usersRouterExpress);
    app.use(PATH_LOGGER, loggerRouterExpress);
    app.use(PATH_DRAGS, dragRouterExpress);
    app.use((req, res) => {
        res.status(400).send("Bad request");
    });
    app.use((err, req, res, next) => {
        if (err instanceof HttpError)
            res.status(err.status).send(err.message);
        else
            res.status(500).send("Unknown server error!");
    });
};
