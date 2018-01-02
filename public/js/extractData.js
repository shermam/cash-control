const dateRegex = /(\d{2}\/\d{2})( |$)/;
const descriptionRegex = /(.{2,})/;
const anyNumberRegex = /(-?(?:\d{1,3}(?:\.|,)?)*(?:\.|,)\d{2})/;
const usNumberRegex = /(^-?(?:\d{1,3},?)*\.\d{2}$)/;

export function extractData(htmlDoc) {

    const result = [];
    const rows = htmlDoc.querySelectorAll('tr');

    for (const row of rows) {
        const resultRow = readRow(row);

        if (resultRow) {
            result.push(resultRow);
        }
    }

    return result;
}


function readRow(row) {
    let count = 0;
    const result = {};

    for (const cell of row.cells) {

        //Extract the date information
        if (!result.date) {
            result.date = readDateCell(cell);
            continue;
        }

        //Extract the description information
        if (!result.description) {
            result.description = readDescriptionCell(cell);
            continue;
        }

        //Extract the value information
        if (!result.value) {
            result.value = parseNumber(readValueCell(cell));
            continue;
        }

        //Extract the balance information 
        //(The rows the have only balance without value 
        //have the balance ammount appearing on the value property)
        if (!result.balance) {
            result.balance = parseNumber(readValueCell(cell));
            continue;
        }
    }

    return result.date ? result : false;
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
