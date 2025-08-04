var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { mockDrug } from "../mock/drugs_mock.js";
// @ts-ignore
import { Config, JsonDB } from "node-json-db";
const mockDragDataService = {
    add(drag) {
        return Promise.resolve(mockDrug);
    }, getAll() {
        return Promise.resolve([mockDrug]);
    }, getById(id) {
        return Promise.resolve(mockDrug);
    }, remove(id) {
        return Promise.resolve(false);
    }, update(newDrag) {
        return Promise.resolve(mockDrug);
    }
};
const db = new JsonDB(new Config('project_db', true, true, '/'));
const jsonDBDragDataService = {
    add(drag) {
        return __awaiter(this, void 0, void 0, function* () {
            yield db.push("/drags[]", drag);
            return Promise.resolve(drag);
        });
    },
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const resultList = yield db.getData("/drags");
            return Promise.resolve(resultList);
        });
    },
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const resultList = yield db.getData("/drags");
            return Promise.resolve(resultList.find(drag => drag.id == id));
        });
    },
    remove(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const resultList = yield db.getData("/drags");
            const newList = resultList.filter((item) => item.id != id);
            if (resultList.length == newList.length)
                return false;
            else {
                yield db.push('/drags', newList, true);
                return true;
            }
        });
    },
    update(newDrag) {
        return __awaiter(this, void 0, void 0, function* () {
            const resultList = yield db.getData("/drags");
            const index = resultList.findIndex(item => item.id == newDrag.id);
            if (index == -1) {
                throw new Error('Id not found');
            }
            resultList[index] = newDrag;
            yield db.push('/drags', resultList, true);
            return newDrag;
        });
    }
};
export default jsonDBDragDataService;
