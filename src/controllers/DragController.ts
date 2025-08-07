import repository, {DragDataService} from "../service/DragDataService.ts";
import {sendError} from "../utils/tools.ts";
import {Drag} from "../model/Drag.ts";
import {Request,Response} from "express";
import {dragObjectValidate} from "../validator/dragObjectValidate.js";
import {HttpError} from "../errors/HttpError.js";

export type DragController = {
    getDrags: (res:Response) => void
    getDragsById: (id: string, res:Response) => void
    postDrags: (req:Request, res:Response) => void
    deleteDrag: (id: string, res:Response) => void
    putDrag: (req:Request, res:Response) => void
}

export class DragControllerImpl implements DragController{
    constructor( private dragService: DragDataService ) {}

    async putDrag(req:Request, res:Response){
        try{
            const body = req.body;
            dragObjectValidate(body);
            const response = await repository.update(body as Drag);
            res.send(response);
        } catch (e) {
            if (e instanceof HttpError) {
                throw e;
            }
            sendError("Wrong body", res);
        }
    }
    async deleteDrag(id: string, res: Response){
        const dragResult = await repository.remove(id);
        if (dragResult) {
            res.send(dragResult);
        } else {
            sendError("Wrong ID", res);
        }
    }
    async getDragsById(id: string, res: Response){
        const dragResult = await repository.getById(id);
        if (dragResult){
            res.send(dragResult);
        } else {
            sendError("Wrong ID", res);
        }
    }
    async getDrags(res: Response) {
        const list = await this.dragService.getAll();
        res.send(list);
    }
    async postDrags(req: Request, res: Response) {
        try{
            const body = req.body;
            dragObjectValidate(body);
            const response = await repository.add(body as Drag);
            res.send(response);
        } catch (e) {
            if (e instanceof HttpError) {
                throw e;
            }
            sendError("Wrong body", res);
        }
    }
}
