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
        if (!result.data) {
            result.data = readDataCell(cell);
            continue;
        }

        if (!result.lancamento) {
            result.lancamento = readLancamentoCell(cell);
            continue;
        }

        if (!result.Valor) {
            result.Valor = readValorCell(cell);
            continue;
        }

        if (!result.Saldo) {
            result.Saldo = readSaldoCell(cell);
            continue;
        }
    }

    return result.data ? result : false;
}

function readDataCell(cell) {
    const regex = /(\d{2}\/\d{2}) /;
    const match = cell.innerHTML.match(regex);
    return match ? match[1] : false;
}

function readLancamentoCell(cell) {

}

function readValorCell(cell) {

}

function readSaldoCell(cell) {

}
