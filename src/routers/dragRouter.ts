import {sendError} from "../utils/tools.ts";
import express from "express";
import {sl} from "../sl.js";
import asyncHandler from "express-async-handler";

export const PATH_DRAGS = "/drags";

export const dragRouterExpress = express.Router();

dragRouterExpress.get('/', async (req, res) => {
    const searchQuery = req.query.q;
    if(searchQuery && typeof searchQuery === "string") {
        await sl.dragController.findDrags(searchQuery as string, res);
    } else {
        await sl.dragController.getDrags(res);
    }
});

dragRouterExpress.get('/:id', async (req, res) => {
    const dragId = req.params.id;
    if (dragId){
        await sl.dragController.getDragsById(dragId, res);
    } else {
        await sl.dragController.getDrags(res);
    }
});

dragRouterExpress.post('/',
    async (req, res) => {
        await sl.dragController.postDrags(req, res);
    });
dragRouterExpress.delete('/:id', async (req, res) => {
    const dragId = req.params.id;
    if (dragId) {
        await sl.dragController.deleteDrag(
            dragId, res
        )
    } else {
        sendError("Empty ID", res);
    }
});
dragRouterExpress.put('/', async (req, res) => {
    await sl.dragController.putDrag(req, res);
});
