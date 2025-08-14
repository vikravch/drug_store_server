import { HttpError } from "../errors/HttpError.js";
export const sayHi = (name) => {
    console.log(`Hello ${name}`);
};
export function parseBody(req) {
    return new Promise((resolve, reject) => {
        let body = "";
        req.on("data", (chunk) => {
            body += chunk.toString();
        });
        req.on("end", () => {
            try {
                resolve(JSON.parse(body));
            }
            catch (e) {
                reject(new Error('Invalid JSON'));
            }
        });
    });
}
export function sendError(text, res) {
    throw new HttpError(404, text);
}
export const isUserType = (obj) => {
    return (typeof obj === 'object' &&
        obj !== null &&
        typeof obj.id === 'number' &&
        typeof obj.userName === 'string');
};
