const Modal = {
  open() {
    document.querySelector(".modal-overlay").classList.add("active");
  },
  close() {
    document.querySelector(".modal-overlay").classList.remove("active");
  },
};
const transactions = [
  {
    id: 1,
    description: "Luz",
    amount: -5000,
    date: "20/03/2021",
  },
  {
    id: 2,
    description: "Água",
    amount: -2000,
    date: "20/03/2021",
  },
  {
    id: 3,
    description: "Computador",
    amount: 200000,
    date: "20/03/2021",
  },
];
const Transaction = {
  incomes() {
    // Somar as entradas
  },
  expenses() {
    // Somar as saídas
  },

  total() {
    // entradas - saídas
  },
};

const Utils = {
  formatCurrecy(value){
    const signal  = Number(value) < 0 ? "-" : ""

    value = String(value).replace(/\D/g,"")

    value = Number(value) / 100

    value = value.toLocaleString("pt-BR",{
      style: "currency",
      currency: "BRL"
    })

    return signal+value
   }
}
const DOM = {
  transactionsContainer: document.querySelector('#data-table tbody'),

  addTransaction(transaction, index){
    const tr  = document.createElement('tr')
    tr.innerHTML  = DOM.innerHTMLTransction(transaction)

    DOM.transactionsContainer.appendChild(tr)
  },
  innerHTMLTransction(transaction){
    const CSSclass  = transaction.amount > 0 ? 'income' : 'expense'

    const amount = Utils.formatCurrecy(transaction.amount)

    const html = `
      
        <td class="description">${transaction.description}</td>
        <td class="${CSSclass}">${amount}</td>
        <td class="date">${transaction.date}</td>
        <td><img src="./image/remover.png" alt=""></td>
      
    `
    return html
  }
}

transactions.forEach(function(transaction){
  DOM.addTransaction(transaction)
})