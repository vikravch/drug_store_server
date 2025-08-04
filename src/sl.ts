// drag router
import dragDataService from "./service/DragDataService.ts";
import userDataService from "./service/UserService.ts";
import {DragControllerImpl} from "./controllers/DragController.ts";
import {UserController} from "./controllers/UserController.ts";

const dragService =  dragDataService;
const dragController = new DragControllerImpl(dragService);

const userService = userDataService;
const userController = new UserController(userService)

export const sl = {
    dragController: dragController,
    userController: userController,
}
