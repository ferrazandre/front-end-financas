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
    description: "Luz",
    amount: -5000,
    date: "20/03/2021",
  },
  {
    description: "Água",
    amount: -2000,
    date: "20/03/2021",
  },
  {
    description: "Computador",
    amount: 200000,
    date: "20/03/2021",
  },
];
const Transaction = {
  all: transactions,

  add(transaction){
    Transaction.all.push(transaction)
    App.reload()
  },

  remove(index){
      Transaction.all.splice(index, 1)
      App.reload()
  },

  incomes() {
    let income = 0;
    Transaction.all.forEach(transaction => {
      if(transaction.amount > 0 ){
        income = income + transaction.amount;
      }
    })
    return income;
  },

  expenses() {
    let expense = 0;
    Transaction.all.forEach(transaction => {
      if(transaction.amount < 0 ){
        expense = expense + transaction.amount;
      }
    })
    return expense;
  },

  total() {
    return Transaction.incomes() + Transaction.expenses();
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
  }, 
  updateBalance(){
    document.getElementById('incomeDisplay').innerHTML = Utils.formatCurrecy(Transaction.incomes());
    document.getElementById('expenseDisplay').innerHTML = Utils.formatCurrecy(Transaction.expenses());
    document.getElementById('totalDisplay').innerHTML = Utils.formatCurrecy(Transaction.total());
  },
  clearTransaction(){
    DOM.transactionsContainer = ""
  }
}
const App = {
  init(){
    Transaction.all.forEach(transaction => {
      DOM.addTransaction(transaction)
    })
    
    DOM.updateBalance();
  },

  reload(){
      DOM.clearTransaction()
      App.init()
  }
} 

App.init()
