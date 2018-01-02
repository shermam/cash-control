import { readFiles } from "./readFiles.js";
import { parseStringToHtml } from "./parseStringToHtml.js";

const output = document.querySelector('#output');

document.querySelector('#file').addEventListener('change', async e => {

    const files = await readFiles(e);
    const parsedFiles = files.map(parseStringToHtml);

    for (const p of parsedFiles) {
        console.log(p);
    }

});