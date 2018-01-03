import { readFiles } from "./readFiles.js";
import { extractData } from "./extractData.js";
import { generateFileHTMLDoc } from "./generateFileHTMLDoc.js";
import { flatten } from "./flatten.js";

document.querySelector('#file').addEventListener('change', async e => {

    const files = await readFiles(e);
    const parsedFiles = files
        .map(generateFileHTMLDoc)
        .map(extractData)
        .flatten();

    console.log(parsedFiles);

});