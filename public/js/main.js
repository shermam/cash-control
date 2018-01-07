import { readFiles } from "./readFiles.js";
import { extractData } from "./extractData.js";
import { generateFileHTMLDoc } from "./generateFileHTMLDoc.js";
import { flatten } from "./flatten.js";
import { createUpdateLabel } from "./updateLabel.js";
import { renderTransactionsTable } from "./renderTransactionsTable.js";
import { store } from "./db.js";

(async _ => {

    const objStore = await store('transactions');
    const fileInput = document.querySelector('#file');
    const clearButton = document.querySelector('#clear-data');
    const jsonButton = document.querySelector('#generate-json');
    const updateLabel = createUpdateLabel(fileInput);

    jsonButton.addEventListener('click', async e => {

        const jsonObj = await objStore.getAll();
        const newWindow = window.open();
        newWindow.document.body.innerHTML = JSON.stringify(jsonObj);

    });

    clearButton.addEventListener('click', async e => {
        await objStore.clear();
        renderTransactionsTable(await objStore.getAll());
        fileInput.value = '';
        updateLabel();
    });

    fileInput.addEventListener('change', async e => {

        updateLabel();

        const files = await readFiles(fileInput);
        const transactions = files
            .map(generateFileHTMLDoc)
            .map(extractData)
            .flatten();

        objStore.putAll(transactions);

        renderTransactionsTable(await objStore.getAll());
    });

    renderTransactionsTable(await objStore.getAll());

})();
