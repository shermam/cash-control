import { formatNumber, formatDate } from "./formatters.js";

export function renderTransactionsTable(transactions) {
    const tableString = `
        <div class="killer-grid-header">
            <h1>Transações</h1>
        </div>

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
                    <td>${formatDate(t.date)}</td>
                    <td>${t.description}</td>
                    <td>${formatNumber(t.value)}</td>
                    <td>${formatNumber(t.balance)}</td>
                </tr>`)
            .join('')}
            </tbody >
        </table >
    `;

    document.querySelector('#transactions').innerHTML = tableString;
}