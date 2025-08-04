import {IncomingMessage, ServerResponse} from "node:http";
import repository, {DragDataService} from "../service/DragDataService.ts";
import {CONTENT_TYPE_JSON} from "../config/constants.ts";
import {parseBody, sendError} from "../utils/tools.ts";
import {Drag} from "../model/Drag.ts";

export type DragController = {
    getDrags: (res:ServerResponse) => void
    getDragsById: (id: string, res:ServerResponse) => void
    postDrags: (req: IncomingMessage, res:ServerResponse) => void
    deleteDrag: (id: string, res: ServerResponse) => void
    putDrag: (req: IncomingMessage, res:ServerResponse) => void
}

export class DragControllerImpl implements DragController{
    constructor( private dragService: DragDataService ) {}

    async putDrag(req: IncomingMessage, res: ServerResponse){
        try{
            const body = await parseBody(req);
            // validation comes here...
            const response = await repository.update(body as Drag);
            res.writeHead(200, CONTENT_TYPE_JSON);
            res.end(JSON.stringify(response));
        } catch (e) {
            sendError("Wrong body", res);
        }
    }
    async deleteDrag(id: string, res: ServerResponse){
        const dragResult = await repository.remove(id);
        if (dragResult) {
            res.writeHead(200, CONTENT_TYPE_JSON);
            res.end(JSON.stringify(dragResult));
        } else {
            sendError("Wrong ID", res);
        }
    }
    async getDragsById(id: string, res: ServerResponse){
        const dragResult = await repository.getById(id);
        if (dragResult){
            res.writeHead(200, CONTENT_TYPE_JSON);
            res.end(JSON.stringify(dragResult));
        } else {
            sendError("Wrong ID", res);
        }
    }
    async getDrags(res: ServerResponse) {
        const list = await this.dragService.getAll();
        res.writeHead(200, CONTENT_TYPE_JSON);
        res.end(JSON.stringify(list));
    }
    async postDrags(req: IncomingMessage, res: ServerResponse) {
        try{
            const body = await parseBody(req);
            // validation comes here...
            const response = await repository.add(body as Drag);
            res.writeHead(200, CONTENT_TYPE_JSON);
            res.end(JSON.stringify(response));
        } catch (e) {
            sendError("Wrong body", res);
        }
    }
}
