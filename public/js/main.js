import { readFiles } from "./readFiles.js";
import { parseStringToHtml } from "./parseStringToHtml.js";
import { extractData } from "./extractData.js";

const output = document.querySelector('#output');

document.querySelector('#file').addEventListener('change', async e => {

    const files = await readFiles(e);
    const parsedFiles = files
        .map(parseStringToHtml)
        .map(extractData)

    const docHtml = files;

    for (const a of docHtml) {
        output.innerHTML = a;
    }

    for (const p of parsedFiles) {
        console.log(p);
    }

});