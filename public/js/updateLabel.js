export function createUpdateLabel(fileInput) {

    const label = fileInput.nextElementSibling;
    const initialLabel = label.innerHTML;

    return function () {
        let fileName = '';

        if (fileInput.files && fileInput.files.length > 1)
            fileName = `${fileInput.files.length} arquivos selecionados`;
        else
            fileName = fileInput.value.split('\\').pop();

        if (fileName)
            label.querySelector('span').innerHTML = fileName;
        else
            label.innerHTML = initialLabel;
    }
}