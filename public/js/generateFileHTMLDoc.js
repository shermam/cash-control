import { parseStringToHtml } from "./parseStringToHtml.js";

export function generateFileHTMLDoc(file) {
    file.document = parseStringToHtml(file.content);
    return file;
}