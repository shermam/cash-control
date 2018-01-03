import { readFiles } from "./readFiles.js";
import { parseStringToHtml } from "./parseStringToHtml.js";
import { extractData } from "./extractData.js";

const output = document.querySelector('#output');

document.querySelector('#file').addEventListener('change', async e => {

    const files = await readFiles(e);
    const parsedFiles = files
        .map(f => {
            f.document = parseStringToHtml(f.content);
            return f;
        })
        .map(extractData)

    for (const a of files) {
        output.innerHTML = a.content;
    }

    for (const p of parsedFiles) {
        console.log(p);
    }

});