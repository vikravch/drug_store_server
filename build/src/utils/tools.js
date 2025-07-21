import { CONTENT_TYPE_TEXT } from "../config/constants.js";
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
    res.writeHead(404, CONTENT_TYPE_TEXT);
    res.end(text);
}
