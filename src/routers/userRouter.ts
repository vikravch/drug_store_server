import {myLogger} from "../utils/logger.ts";
import express from "express";
import {sl} from "../sl.ts";
import {HttpError} from "../errors/HttpError.ts";
import asyncHandler from "express-async-handler";

export const PATH_USER = "/user";
export const PATH_USERS = "/users";
export const PATH_LOGGER = "/logger";

export const userRouterExpress = express.Router();
userRouterExpress.get('/',
    async (req, res) => {
        if(req.query.id) {
            await sl.userController.getUserById(req, res)
        } else {
            throw new HttpError(410, 'No User Id');
        }
});
userRouterExpress.post('/', async (req, res) => {
    await sl.userController.addUser(req, res);
});
userRouterExpress.delete('/', async (req, res) => {
    await sl.userController.removeUser(req, res)
});
userRouterExpress.put('/', async (req, res) => {
    await sl.userController.updateUser(req, res)
});

export const usersRouterExpress = express.Router();
usersRouterExpress.get("/", async (req, res) => {
    await sl.userController.getAllUsers(req, res);
});

export const loggerRouterExpress = express.Router();
loggerRouterExpress.get('/', (req, res) => {
    const logs = myLogger.getLogArray();
    res.json(logs);
});
