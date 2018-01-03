export function flatten(arr) {
    return Array.prototype.concat.apply([], arr);
}

if (!Array.prototype.flatten) {
    Array.prototype.flatten = function () {
        return flatten(this);
    };
}