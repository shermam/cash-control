export function parseStringToHtml(textToParse) {
    const parser = new DOMParser();
    return parser.parseFromString(textToParse, 'text/html');
}