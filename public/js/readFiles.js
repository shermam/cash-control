import { readAsText } from "./reader.js";

export function readFiles(fileInput) {
    return Promise.all(
        Array
            .from(fileInput.files)
            .map(readAsText)
    );
}