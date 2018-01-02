import { readAsText } from "./reader.js";

export function readFiles(event) {
    return Promise.all(
        Array
            .from(event.target.files)
            .map(f => readAsText(f))
    );
}