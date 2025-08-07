import {User} from "../model/User.ts";
// @ts-ignore
import {Config, JsonDB} from "node-json-db";

export interface UserService {
    addUser(user: User): Promise<boolean>;

    removeUser(id: number): Promise<User>;

    getAllUsers(): Promise<User[]>;

    getUserById(id: number): Promise<User>;

    updateUser(newUser: User): Promise<void>;
}


const db = new JsonDB(new Config('user_db', true, true, '/'));
const jsonDBUserService: UserService = {
    async addUser(user: User): Promise<boolean> {
            const users: User[] = await db.getData("/users") || [];
            if (users.find(u => u.id === user.id)) {
                return false;
            }
            users.push(user);
            await db.push("/users", users, true);
            return true;
    },

    async getAllUsers(): Promise<User[]> {
        try {
            return await db.getData('/users') || [];
        } catch (e) {
            return [];
        }
    },

    async getUserById(id: number): Promise<User> {
        const users: User[] = await db.getData("/users") || [];
        const user = users.find(u => u.id == id);
        if (!user) throw "404";
        return user;
    },
    async removeUser(id: number): Promise<User> {
        const users: User[] = await db.getData("/users") || [];
        const index = users.findIndex(u => u.id === id);
        if (index === -1) throw "404";
        const [removedUser] = users.splice(index, 1);
        await db.push("/users", users, true);
        return removedUser;
    },
    async updateUser(newUser: User): Promise<void> {
        const users: User[] = await db.getData("/users") || [];
        const index = users.findIndex(u => u.id === newUser.id);
        if (index === -1) throw "404";
        users[index] = newUser;
        await db.push("/users", users, true);
    }
};
export default jsonDBUserService;
