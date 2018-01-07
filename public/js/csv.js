function flattenObject(ob) {
    var toReturn = {};

    for (var i in ob) {
        if (!ob.hasOwnProperty(i)) continue;

        if (ob[i] && (typeof ob[i]) == 'object') {
            var flatObject = flattenObject(ob[i]);
            for (var x in flatObject) {
                if (!flatObject.hasOwnProperty(x)) continue;

                toReturn[i + '.' + x] = flatObject[x];
            }
        } else {
            toReturn[i] = ob[i];
        }
    }
    return toReturn;
};

export function exportCSV(dados, nomeArquivo, separator = ';') {
    var csvContent = "";
    var cabecalho = "";
    var first = true;

    dados = dados.map(flattenObject);

    dados.forEach(function (objeto, index) {

        var dataString = "";
        for (var key in objeto) {
            if (key.indexOf('$') !== -1) {
                continue;
            }

            if (first) {
                cabecalho += key.replace("_", " ") + separator;
            }

            var value = objeto[key];

            if (value instanceof Date) {
                value = value.toLocaleDateString();
            }

            dataString += value + separator;
        }

        dataString = dataString.substring(0, dataString.length - 1);

        if (first) {
            cabecalho = cabecalho.substring(0, cabecalho.length - 1);
            cabecalho += "\r\n";
        }
        first = false;
        csvContent += index < dados.length ? dataString + "\r\n" : dataString;

    });

    csvContent = cabecalho + csvContent;

    var blob = null;
    if (window.navigator.msSaveOrOpenBlob) {
        blob = new Blob([decodeURIComponent(encodeURI(csvContent))], {
            type: "text/csv;charset=utf-8;"
        });
        navigator.msSaveBlob(blob, nomeArquivo + '.csv');
    } else {

        blob = new Blob([csvContent], {
            type: "text/csv;charset=utf-8;"
        });

        var a = document.createElement('a');
        a.href = window.URL.createObjectURL(blob);
        a.target = '_blank';
        a.download = nomeArquivo + '.csv';

        document.body.appendChild(a);
        a.click();
    }
}