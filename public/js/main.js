import { readFiles } from "./readFiles.js";
import { extractData } from "./extractData.js";
import { generateFileHTMLDoc } from "./generateFileHTMLDoc.js";
import { flatten } from "./flatten.js";
import { createUpdateLabel } from "./updateLabel.js";
import { renderTransactionsTable } from "./renderTransactionsTable.js";
import { store } from "./db.js";
import { exportCSV } from "./csv.js";
import { chart } from "./chart.js";
import { createAgregation, createAgregationRegex, sum } from "./agregation.js";

const agregateByDate = createAgregation('date', 'value');
const agregateByDescription = createAgregationRegex('description', 'value', /(( | ?-)\d{2}\/\d{2})|( \d{6,})/g);

(async _ => {

    const objStore = await store('transactions');
    const fileInput = document.querySelector('#file');
    const clearButton = document.querySelector('#clear-data');
    const jsonButton = document.querySelector('#generate-json');
    const csvButton = document.querySelector('#generate-csv');
    const somatorioButton = document.querySelector('#somatorio');
    const agregateButton = document.querySelector('#agregate');
    const updateLabel = createUpdateLabel(fileInput);

    somatorioButton.addEventListener('click', async e => {
        console.log(sum(await objStore.getAll()));
    });

    agregateButton.addEventListener('click', async e => {
        console.log(agregateByDescription(await objStore.getAll()));
    });

    jsonButton.addEventListener('click', async e => {
        const jsonObj = await objStore.getAll();
        const newWindow = window.open();
        newWindow.document.body.innerHTML = JSON.stringify(jsonObj);
    });

    csvButton.addEventListener('click', async e => {
        const jsonObj = await objStore.getAll();
        exportCSV(jsonObj, 'cash-control', ',');
    });

    clearButton.addEventListener('click', async e => {
        await objStore.clear();
        refreshScreen();
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

        refreshScreen();
    });

    async function refreshScreen() {
        const data = await objStore.getAll();
        //const agregatedData = agregateByDate(data.sort((a, b) => b.date < a.date ? 1 : -1));

        renderTransactionsTable(data);
        //chart(agregatedData);
    }

    refreshScreen();

})();
