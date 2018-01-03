import { readFiles } from "./readFiles.js";
import { extractData } from "./extractData.js";
import { generateFileHTMLDoc } from "./generateFileHTMLDoc.js";

document.querySelector('#file').addEventListener('change', async e => {

    const files = await readFiles(e);
    const parsedFiles = files
        .map(generateFileHTMLDoc)
        .map(extractData)

    for (const p of parsedFiles) {
        console.log(p);
    }

});