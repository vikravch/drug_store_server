import {IncomingMessage, ServerResponse} from "node:http";
import {UserService} from "../service/UserService.ts";
import {isUserType, parseBody} from "../utils/tools.ts";
import {myLogger} from "../utils/logger.ts";
import {User} from "../model/User.ts";
import {SERVER_URL} from "../config/configs.ts";
import {HttpError} from "../errors/HttpError.js";
import {Request,Response} from "express";

export class UserController{
    constructor(private userService: UserService) { }

    async addUser(req:Request, res:Response){
        const body =  req.body;
        if(!isUserType(body)){
            myLogger.log('Wrong params!')
            throw new HttpError (400, "Bad request: wrong params!");
        }
        const user = body as User;
        const isSuccess = await this.userService.addUser(user);
        if (isSuccess) {
            res.status(201).send(`Created`);
            myLogger.log(`User with id ${user.id} was added`);
            myLogger.save(`User with id ${user.id} was added`);

        } else {
            myLogger.log('User already exists')
            throw new HttpError (409, 'User already exists');
        }
    }
    async removeUser(req:Request, res:Response) {
        const url = new URL(req.url!, SERVER_URL);
        const param = url.searchParams.get('id');

        if(!param || Number.isNaN(parseInt(param))){
            myLogger.log('Wrong params!')
            throw new HttpError (400, "Bad request: wrong params!");
        }
        const id = parseInt(param!)
        try {
            const removed = await this.userService.removeUser(id);
            res.json(removed);
            myLogger.log(`User with id ${id} was removed from DB`);
            myLogger.save(`User with id ${id} was removed from DB`);

        } catch (e) {
            if(e === "404"){
                myLogger.log(`User with id ${param} not found`);
                throw new HttpError (404, `User with id ${param} not found`);
            }else{
                myLogger.log(`Server error`);
                myLogger.save(`Server error` + JSON.stringify(e));
                throw new HttpError (500, `Server error`);
            }
        }
    }
    async getAllUsers(req:Request, res:Response){
        const result = await this.userService.getAllUsers();
        console.log('controller getAllUsers result '+result);
        res.json(result);
        myLogger.log(`All users responsed`);
    }
    async getUserById(req:Request, res:Response){
        const url = new URL( req.url!, SERVER_URL);
        const param = url.searchParams.get('id');
        if(!param || Number.isNaN(parseInt(param))){
            myLogger.log('Wrong params!')
            throw new HttpError (400, "Bad request: wrong params!");
        }
        try {
            const user = await this.userService.getUserById(parseInt(param!));
            res.json(user);
            myLogger.log(`User responsed`);
        } catch (e) {
            if(e === "404"){
                myLogger.log(`User with id ${param} not found`);
                throw new HttpError (404, `User with id ${param} not found`);
            }else{
                myLogger.log(`Server error`);
                myLogger.save(`Server error` + JSON.stringify(e));
                throw new HttpError (500, `Server error`);
            }
        }
    }
    async updateUser(req:Request, res:Response) {
        const body = await parseBody(req) as User;
        try {
            await this.userService.updateUser(body);
            res.status(200).send('User was successfully updated');
            myLogger.log(`User with id ${body.id} was updated`);
        } catch (e) {
            if(e === "404"){
                myLogger.log(`User not found`);
                throw new HttpError (404, `User not found`);
            }else{
                myLogger.log(`Server error`);
                myLogger.save(`Server error` + JSON.stringify(e));
                throw new HttpError (500, `Server error`);
            }
        }
    }
}
