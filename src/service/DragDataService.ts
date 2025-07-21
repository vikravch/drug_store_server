import {Drag} from "../model/Drag.ts";
import {mockDrug} from "../mock/drugs_mock.ts";
// @ts-ignore
import {Config, JsonDB} from "node-json-db";

export type DragDataService = {
    getAll(): Promise<Array<Drag>>;
    getById(id: string) : Promise<Drag | undefined>;
    add(drag: Drag) : Promise<Drag>;
    remove(id: string) : Promise<boolean>;
    update(newDrag: Drag) : Promise<Drag>;
}

const mockDragDataService: DragDataService = {
    add(drag: Drag): Promise<Drag> {
        return Promise.resolve(mockDrug);
    }, getAll(): Promise<Array<Drag>> {
        return Promise.resolve([mockDrug]);
    }, getById(id: string): Promise<Drag | undefined> {
        return Promise.resolve(mockDrug);
    }, remove(id: string): Promise<boolean> {
        return Promise.resolve(false);
    }, update(newDrag: Drag): Promise<Drag> {
        return Promise.resolve(mockDrug);
    }
}

const db = new JsonDB(new Config('project_db', true, true, '/'));

const jsonDBDragDataService: DragDataService = {
    async add(drag: Drag): Promise<Drag> {
        await db.push("/drags[]", drag);
        return Promise.resolve(drag);
    },
    async getAll(): Promise<Array<Drag>> {
        const resultList = await db.getData("/drags") as Array<Drag>;
        return Promise.resolve(resultList);
    },
    async getById(id: string): Promise<Drag | undefined> {
        const resultList = await db.getData("/drags") as Array<Drag>;
        return Promise.resolve(resultList.find(drag => drag.id == id));
    },
    remove(id: string): Promise<boolean> {
        return Promise.resolve(false);
    },
    update(newDrag: Drag): Promise<Drag> {
        return Promise.resolve(mockDrug);
    }
}

export default jsonDBDragDataService;
