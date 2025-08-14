var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { sendError } from "../utils/tools.js";
import express from "express";
import { sl } from "../sl.js";
export const PATH_DRAGS = "/drags";
export const dragRouterExpress = express.Router();
dragRouterExpress.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const searchQuery = req.query.q;
    if (searchQuery && typeof searchQuery === "string") {
        yield sl.dragController.findDrags(searchQuery, res);
    }
    else {
        yield sl.dragController.getDrags(res);
    }
}));
dragRouterExpress.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const dragId = req.params.id;
    if (dragId) {
        yield sl.dragController.getDragsById(dragId, res);
    }
    else {
        yield sl.dragController.getDrags(res);
    }
}));
dragRouterExpress.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield sl.dragController.postDrags(req, res);
}));
dragRouterExpress.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const dragId = req.params.id;
    if (dragId) {
        yield sl.dragController.deleteDrag(dragId, res);
    }
    else {
        sendError("Empty ID", res);
    }
}));
dragRouterExpress.put('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield sl.dragController.putDrag(req, res);
}));
