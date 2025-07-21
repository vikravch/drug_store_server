import {IncomingMessage, ServerResponse} from "node:http";
import {CONTENT_TYPE_TEXT} from "../config/constants.ts";

export const sayHi = (name:string):void => {
    console.log(`Hello ${name}`)
}

export function parseBody(req: InstanceType<typeof IncomingMessage>) {
    return new Promise((resolve, reject) => {
        let body = "";
        req.on("data", (chunk) => {
            body += chunk.toString();
        })
        req.on("end", () => {
            try {
                resolve(JSON.parse(body))
            } catch (e) {
                reject(new Error('Invalid JSON'))
            }
        })
    })
}

export function sendError(text: string, res: ServerResponse){
    res.writeHead(404, CONTENT_TYPE_TEXT);
    res.end(text);
}
