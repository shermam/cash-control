export function createAgregation(dimensionProp, valueProp) {

    return function (data) {
        const agregatedObj = data.reduce((obj, item) => {
            obj[item[dimensionProp]] = obj[item[dimensionProp]] || 0;
            obj[item[dimensionProp]] += item[valueProp];
            return obj;
        }, {});

        const array = [];
        let balance = 0;

        for (const key in agregatedObj) {
            const returnObj = {};
            const value = round(agregatedObj[key], 2);
            returnObj[dimensionProp] = key;
            returnObj[valueProp] = value;
            balance += value;
            returnObj.balance = round(balance, 2);
            array.push(returnObj);
        }
        return array;
    }
}

export function createAgregationRegex(dimensionProp, valueProp, regex) {

    return function (data) {
        return data.reduce((obj, item) => {

            const label = item[dimensionProp].replace(regex, '');
            obj[label] = obj[label] || 0;
            obj[label] += item[valueProp];
            return obj;
        }, {});
    }
}

function round(num, decimal) {
    const factor = Math.pow(10, decimal);
    return Math.round(num * factor) / factor;
}

export function sum(data) {
    return data.reduce((ret, item) => {
        if (item.value < 0) {
            ret.saidas += item.value;
        } else {
            ret.entradas += item.value;
        }
        return ret;
    },
        {
            saidas: 0,
            entradas: 0
        });
}