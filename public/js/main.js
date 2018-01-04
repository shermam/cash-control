import { readFiles } from "./readFiles.js";
import { extractData } from "./extractData.js";
import { generateFileHTMLDoc } from "./generateFileHTMLDoc.js";
import { flatten } from "./flatten.js";
import { updateLabel } from "./updateLabel.js";
import { renderTransactionsTable } from "./renderTransactionsTable.js";
import { store } from "./db.js";

(async _ => {

    const objStore = await store('transactions');
    renderTransactionsTable(await objStore.getAll());

    document.querySelector('#file').addEventListener('change', async e => {

        updateLabel(e.target);

        const files = await readFiles(e);
        const transactions = files
            .map(generateFileHTMLDoc)
            .map(extractData)
            .flatten();

        objStore.putAll(transactions);

        renderTransactionsTable(await objStore.getAll());
    });

})();
