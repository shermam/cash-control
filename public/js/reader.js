export function readAsText(file) {

    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onerror = reject;
        reader.onload = _ => {
            resolve({
                content: reader.result,
                lastModified: file.lastModified,
                lastModifiedDate: file.lastModifiedDate.toISOString(),
                name: file.name,
                size: file.size
            })
        };
        reader.readAsText(file);
    });
}