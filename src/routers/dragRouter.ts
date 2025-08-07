import {sendError} from "../utils/tools.ts";
import express from "express";
import {sl} from "../sl.js";
import asyncHandler from "express-async-handler";

export const PATH_DRAGS = "/drags";

export const dragRouterExpress = express.Router();

dragRouterExpress.get('/', asyncHandler(async (req, res) => {
    await sl.dragController.getDrags(res);
}));

dragRouterExpress.get('/:id', asyncHandler(async (req, res) => {
    const dragId = req.params.id;
    if (dragId){
        await sl.dragController.getDragsById(dragId, res);
    } else {
        await sl.dragController.getDrags(res);
    }
}));

dragRouterExpress.post('/',
    asyncHandler(async (req, res) => {
        await sl.dragController.postDrags(req, res);
    }));
dragRouterExpress.delete('/:id', asyncHandler(async (req, res) => {
    const dragId = req.params.id;
    if (dragId) {
        await sl.dragController.deleteDrag(
            dragId, res
        )
    } else {
        sendError("Empty ID", res);
    }
}));
dragRouterExpress.put('/', asyncHandler(async (req, res) => {
    await sl.dragController.putDrag(req, res);
}));
