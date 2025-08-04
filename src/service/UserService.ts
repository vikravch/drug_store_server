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
        try {
            const users: User[] = await db.getData("/users") || [];
            if (users.find(u => u.id === user.id)) {
                return false;
            }
            users.push(user);
            await db.push("/users", users, true);
            return true;
        } catch (error) {
            console.error("Error adding user:", error);
            return false;
        }
    },

    async getAllUsers(): Promise<User[]> {
        try {
          return await db.getData('/users') || [];
        } catch (e) {
            return [];
        }
    },

    async getUserById(id: number): Promise<User> {
        try {
            const users: User[] = await db.getData("/users") || [];
            const user = users.find(u => u.id === id);
            if (!user) throw new Error("User not found");
            return user;
        } catch (error) {
            console.error("Error getting user:", error);
            throw new Error('Error getting user');
        }
    },

    async removeUser(id: number): Promise<User> {
        try {
            const users: User[] = await db.getData("/users") || [];
            const index = users.findIndex(u => u.id === id);
            if (index === -1) throw new Error("User not found");
            const [removedUser] = users.splice(index, 1);
            await db.push("/users", users, true);
            return removedUser;
        } catch (error) {
            console.error("Error removing user:", error);
            throw new Error('Error removing user');
        }
    },

    async updateUser(newUser: User): Promise<void> {
        try {
            const users: User[] = await db.getData("/users") || [];
            const index = users.findIndex(u => u.id === newUser.id);
            if (index === -1) throw new Error("User not found");
            users[index] = newUser;
            await db.push("/users", users, true);
        } catch (error) {
            console.error("Error updating user:", error);
        }
    }
};
export default jsonDBUserService;
