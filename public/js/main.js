import { readAsText } from "./reader.js";

const fileInput = document.querySelector('#file');
const list = document.querySelector('#list');
const output = document.querySelector('#output');

fileInput.addEventListener('change', async e => {

    //Loops throug all of the selected files
    for (const file of fileInput.files) {

        //List the files names on the screen
        const listItem = document.createElement('li');
        listItem.innerHTML = file.name;
        list.appendChild(listItem);

        //logs the contents of the files
        const fileContent = await readAsText(file);
        output.innerHTML += fileContent;
    }

});