export function createTransactionsTable(transactions) {
    const tableString = `
        <table class="killer-grid">
            <thead>
                <tr>
                    <th>Data</th>
                    <th>Descrição</th>
                    <th>Valor</th>
                    <th>Saldo</th>
                </tr>
            </thead>
            <tbody>
            ${transactions.map(t => `
                <tr>
                    <td>${t.date}</td>
                    <td>${t.description}</td>
                    <td>${t.value || ''}</td>
                    <td>${t.balance || ''}</td>
                </tr>`)
            .join('')}
            </tbody >
        </table >
    `;

    document.querySelector('#transactions').innerHTML += tableString;
}