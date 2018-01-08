export function createAgregation(dimensionProp, valueProp) {

    return function (data) {
        const agregatedObj = data.reduce((obj, item) => {
            obj[item[dimensionProp]] = obj[item[dimensionProp]] || 0;
            obj[item[dimensionProp]] += item[valueProp];

            return obj;
        }, {});

        const array = [];

        for (const key in agregatedObj) {
            const returnObj = {};
            returnObj[dimensionProp] = key;
            returnObj[valueProp] = round(agregatedObj[key], 2);
            array.push(returnObj);
        }

        console.log(array);


        return array;
    }
}

function round(num, decimal) {
    const factor = Math.pow(10, decimal);
    return Math.round(num * factor) / factor;
}