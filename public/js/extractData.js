const dateRegex = /(\d{2}\/\d{2})( |$|\n)/;
const descriptionRegex = /(.{2,})/;
const anyNumberRegex = /(-?(?:\d{1,3}(?:\.|,)?)*(?:\.|,)\d{2})/;
const usNumberRegex = /(^-?(?:\d{1,3},?)*\.\d{2}$)/;

let fileYear = null;

export function extractData(file) {

    const htmlDoc = file.document;
    const result = [];
    const rows = htmlDoc.querySelectorAll('tr');

    fileYear = Number(file.name.substring(0, 4));

    for (const row of rows) {
        const transaction = readRow(row);

        if (transaction) {
            rearrangeBalance(transaction);
            result.push(transaction);
        }
    }

    return result;
}

function rearrangeBalance(transaction) {
    if (transaction.description.indexOf('SALDO') !== -1 ||
        transaction.description.indexOf('SDO') === 0) {
        transaction.balance = transaction.value;
        transaction.value = null;
    }
}


function readRow(row) {
    const transaction = {};

    for (const cell of row.cells) {

        //Extract the date information
        if (!transaction.date) {
            transaction.date = formatDate(readDateCell(cell));
            continue;
        }

        //Extract the description information
        if (!transaction.description) {
            transaction.description = readDescriptionCell(cell);
            continue;
        }

        //Extract the value information
        if (!transaction.value) {
            transaction.value = parseNumber(readValueCell(cell));
            continue;
        }

        //Extract the balance information 
        //(The rows the have only balance without value 
        //have the balance ammount appearing on the value property)
        if (!transaction.balance) {
            transaction.balance = parseNumber(readValueCell(cell));
            continue;
        }
    }

    return transaction.date ? transaction : false;
}

function formatDate(rawDate) {
    if (!rawDate) {
        return null;
    }

    return fileYear.toString() + '-' + rawDate.split('/').reverse().join('-');
}

function readCell(cell, regex) {
    const text = extractText(cell);

    //Ugly hack to exclude exporadic information cells
    if (text.indexOf("a compensar") !== -1) {
        return false;
    }

    const match = text.match(regex);
    return match ? match[1] : false;
}

function extractText(cell) {
    if (cell.firstElementChild) {
        return extractText(cell.firstElementChild);
    }

    return cell.innerHTML.trim();
}

function readDateCell(cell) {
    return readCell(cell, dateRegex);
}

function readDescriptionCell(cell) {
    return readCell(cell, descriptionRegex);

}

function readValueCell(cell) {
    return readCell(cell, anyNumberRegex);
}

function parseNumber(numString) {

    if (!numString) {
        return null;
    }

    if (usNumberRegex.test(numString)) {
        numString = numString.replace(',', '');
    } else {
        numString = numString.replace('.', '');
        numString = numString.replace(',', '.');
    }

    let num = Number(numString);
    return isNaN(num) ? null : num;
}
