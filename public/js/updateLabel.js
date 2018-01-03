export function updateLabel(fileInput) {
    let fileName = '';
    const label = fileInput.nextElementSibling;

    if (fileInput.files && fileInput.files.length > 1)
        fileName = `${fileInput.files.length} arquivos selecionados`;
    else
        fileName = fileInput.value.split('\\').pop();

    if (fileName)
        label.querySelector('span').innerHTML = fileName;
    else
        label.innerHTML = 'Selecione os arquivos desejados';
}