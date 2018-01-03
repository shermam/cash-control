import { readFiles } from "./readFiles.js";
import { extractData } from "./extractData.js";
import { generateFileHTMLDoc } from "./generateFileHTMLDoc.js";
import { flatten } from "./flatten.js";
import { updateLabel } from "./updateLabel.js";

document.querySelector('#file').addEventListener('change', async e => {

    updateLabel(e.target);
    const files = await readFiles(e);
    const parsedFiles = files
        .map(generateFileHTMLDoc)
        .map(extractData)
        .flatten();

    console.log(parsedFiles);

});