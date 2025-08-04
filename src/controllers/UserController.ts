import {IncomingMessage, ServerResponse} from "node:http";
import {UserService} from "../service/UserService.ts";
import {isUserType, parseBody} from "../utils/tools.ts";
import {myLogger} from "../utils/logger.ts";
import {User} from "../model/User.ts";
import {SERVER_URL} from "../config/configs.ts";

export class UserController{
    constructor(private userService: UserService) { }

    async addUser(req:IncomingMessage, res:ServerResponse){
        const body =  await parseBody(req);
        if(!isUserType(body)){
            res.writeHead(400, {'Content-Type': 'text/html'})
            res.end('Bad request: wrong params!')
            myLogger.log('Wrong params!')
            return;
        }
        const user = body as User;
        const isSuccess = await this.userService.addUser(user);
        if (isSuccess) {
            res.writeHead(201, {'Content-Type': 'text/html'})
            res.end(`Created`);
            myLogger.log(`User with id ${user.id} was added`);
            myLogger.save(`User with id ${user.id} was added`);

        } else {
            res.writeHead(409, {'Content-Type': 'text/html'})
            res.end('User already exists')
            myLogger.log('User already exists')
        }
    }
    async removeUser(req:IncomingMessage, res:ServerResponse) {
        const url = new URL(req.url!, SERVER_URL);
        const param = url.searchParams.get('id');

        if(!param || Number.isNaN(parseInt(param))){
            res.writeHead(400, {'Content-Type': 'text/html'})
            res.end('Bad request: wrong params!')
            myLogger.log('Wrong params!')
        }
        const id = parseInt(param!)
        try {
            const removed = await this.userService.removeUser(id);
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify(removed));
            myLogger.log(`User with id ${id} was removed from DB`);
            myLogger.save(`User with id ${id} was removed from DB`);

        } catch (e) {
            if(e === "404"){
                res.writeHead(404, {'Content-Type': 'text/html'})
                res.end(`User with id ${param} not found`)
                myLogger.log(`User with id ${param} not found`);
            }else{
                res.writeHead(500, {'Content-Type': 'text/html'})
                res.end('Unexpected server error')
                myLogger.log(`Server error`);
                myLogger.save(`Server error` + JSON.stringify(e));
            }
        }
    }
    async getAllUsers(req:IncomingMessage, res:ServerResponse){
        const result = await this.userService.getAllUsers();
        console.log('controller getAllUsers result '+result);
        res.writeHead(200, {'Content-Type': 'application/json'})
        res.end(JSON.stringify(result));
        myLogger.log(`All users responsed`);
    }
    async getUserById(req:IncomingMessage, res:ServerResponse){
        const url = new URL( req.url!, SERVER_URL);
        const param = url.searchParams.get('id');
        if(!param || Number.isNaN(parseInt(param))){
            res.writeHead(400, {'Content-Type': 'text/html'})
            res.end('Bad request: wrong params!');
            myLogger.log('Wrong params!');

        }
        try {
            const user = await this.userService.getUserById(parseInt(param!));
            res.writeHead(200, {'Content-Type': 'application/json'})
            res.end(JSON.stringify(user));
            myLogger.log(`User responsed`);
        } catch (e) {
            if(e === "404"){
                res.writeHead(404, {'Content-Type': 'text/html'})
                res.end(`User with id ${param} not found`)
                myLogger.log(`User with id ${param} not found`);
            }else{
                res.writeHead(500, {'Content-Type': 'text/html'})
                res.end('Unexpected server error')
                myLogger.log(`Server error`);
                myLogger.save(`Server error` + JSON.stringify(e));
            }
        }
    }
    async updateUser(req: IncomingMessage, res: ServerResponse) {
        const body = await parseBody(req) as User;
        try {
            await this.userService.updateUser(body);
            res.writeHead(200, {'Content-Type': 'text/html'})
            res.end('User was successfully updated');
            myLogger.log(`User with id ${body.id} was updated`);
        } catch (e) {
            if(e === "404"){
                res.writeHead(404, {'Content-Type': 'text/html'})
                res.end(`User not found`)
                myLogger.log(`User to update not found`);
            }else{
                res.writeHead(500, {'Content-Type': 'text/html'})
                res.end('Unexpected server error');
                myLogger.log(`Server error`);
                myLogger.save(`Server error` + JSON.stringify(e));
            }
        }
    }
}
