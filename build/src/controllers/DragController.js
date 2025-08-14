var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import repository from "../service/DragDataService.js";
import { sendError } from "../utils/tools.js";
import { dragObjectValidate } from "../validator/dragObjectValidate.js";
import { HttpError } from "../errors/HttpError.js";
export class DragControllerImpl {
    constructor(dragService) {
        this.dragService = dragService;
    }
    putDrag(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const body = req.body;
                dragObjectValidate(body);
                const response = yield repository.update(body);
                res.send(response);
            }
            catch (e) {
                if (e instanceof HttpError) {
                    throw e;
                }
                sendError("Wrong body", res);
            }
        });
    }
    deleteDrag(id, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const dragResult = yield repository.remove(id);
            if (dragResult) {
                res.send(dragResult);
            }
            else {
                sendError("Wrong ID", res);
            }
        });
    }
    getDragsById(id, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const dragResult = yield repository.getById(id);
            if (dragResult) {
                res.send(dragResult);
            }
            else {
                sendError("Wrong ID", res);
            }
        });
    }
    getDrags(res) {
        return __awaiter(this, void 0, void 0, function* () {
            const list = yield this.dragService.getAll();
            res.send(list);
        });
    }
    postDrags(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const body = req.body;
                dragObjectValidate(body);
                const response = yield repository.add(body);
                res.send(response);
            }
            catch (e) {
                if (e instanceof HttpError) {
                    throw e;
                }
                sendError("Wrong body", res);
            }
        });
    }
    findDrags(query, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const list = yield this.dragService.getAll();
            const resList = list.filter(item => {
                return item.dragName.toLowerCase().includes(query.toLowerCase()) ||
                    item.description.toLowerCase().includes(query.toLowerCase());
            });
            res.send(resList);
        });
    }
}
