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
  formatDate(){
    const splittedDate = date.split("-")

    return `${splittedDate[2]}/${splittedDate[1]}/${splittedDate[0]}`
  },

  formatAmount(value){
      value = Number(value) * 100

      return value
  },

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
const Form = {
  description: document.querySelector('input#description'),
  amount: document.querySelector('input#amount'),
  date: document.querySelector('input#date'),

  gatValue(){
      return {
        description: Form.description.value,
        amount: Form.amount.value,
        date: Form.date.value
      }
  },

  formatValues(){
    let {description, amount, date} = Form.gatValue()

    amount = Utils.formatAmount(amount)

    date = Utils.formatDate(date)

    return {
      description,
      amount, 
      date
    }

  },

  validateField(){
    const {description, amount, date} = Form.gatValue()
    if(description.trim()==="" || amount.trim()==="" || date.trim()===""){
      throw new Error("Por favor, preencha todos os campos")
    }
  },

  saveTransaction(transaction){
    Transaction.add(transaction)  
  },

  clearFields(){
    Form.description.value =""
    Form.amount.value =""
    Form.date.value =""
  },

  submit(event){
      event.preventDefault()
      try{
       const transaction = Form.validateField()
       saveTransaction(transaction)
       clearFields()
       Modal.close
      }catch(error){
        alert(error.message)
      }
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
