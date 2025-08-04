var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { createServer } from "node:http";
import { BASE_PORT, BASE_URL } from "./config/configs.js";
import { dragRouter } from "./routers/dragRouter.js";
import { sl } from "./sl.js";
import { userRouter } from "./routers/userRouter.js";
export const launchServer = () => {
    createServer((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        yield dragRouter(req, res, sl.dragController);
        yield userRouter(req, res, sl.userController);
    })).listen(BASE_PORT, () => console.log(`Server runs at ${BASE_URL}:${BASE_PORT}`));
};
