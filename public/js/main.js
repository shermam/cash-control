import { readFiles } from "./readFiles.js";

const output = document.querySelector('#output');

document.querySelector('#file').addEventListener('change', async e => {

    let files = await readFiles(e);

    //Loops throug all of the selected files
    for (const file of files) {

        //logs the contents of the files
        output.innerHTML += file;
    }

});