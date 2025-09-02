let balance = document.getElementById("balance");
let income = document.getElementById("income-amount");
let expenses = document.getElementById("expenses-amount");
let transactions = JSON.parse(localStorage.getItem("transaction")) || [];

const addTransaction = document.getElementById("add-transaction");
const decsInput = document.getElementById("description");
const amountInput = document.getElementById("amount");
const transactionList = document.getElementById("transaction-list");
const transactionForm = document.getElementById("transaction-form");

let editId = null;

transactionForm.addEventListener("submit", addTransactions);

function addTransactions(e) {
  e.preventDefault();
  const description = decsInput.value;
  const amount = parseFloat(amountInput.value);
  try {
    if (description.trim() !== "" && !isNaN(amount)) {
      if (editId) {
        transactions = transactions.map((t) =>
          t.id === editId ? { ...t, description, amount, date: t.date } : t
        );
        editId = null;
      } else {
        transactions.push({
          id: Date.now(),
          description,
          amount,
          date: new Date().toLocaleDateString(),
        });
      }
      localStorage.setItem("transaction", JSON.stringify(transactions));
      createTransaction();
      updateSummary();
      transactionForm.reset();
    }
  } catch (error) {
    console.error("please enter right description and amount", error);
  }
}
function updateSummary() {
  let totalIncome = 0;
  let totalExpenses = 0;
  transactions.forEach((t) => {
    if (t.amount > 0) {
      totalIncome += t.amount;
    } else {
      totalExpenses += t.amount;
    }
  });
  const balanceValue = totalIncome + totalExpenses;
  balance.textContent = balanceValue.toFixed(2);
  income.textContent = totalIncome.toFixed(2);
  expenses.textContent = totalExpenses.toFixed(2);
}
function createTransaction() {
  transactionList.innerHTML = "";
  let sortedTransactionList = [...transactions].reverse();
  sortedTransactionList.forEach((transaction) => {
    const li = document.createElement("li");
    li.classList.add("transaction");
    li.classList.add(transaction.amount > 0 ? "income" : "expenses");
    li.innerHTML = `<span>${transaction.description}</span>
    
    <span>${transaction.amount.toFixed(2)}</span>
    <span>${transaction.date}</span>

    `;
    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = `<i class="fa-solid fa-delete-left"></i>`;
    deleteButton.classList.add("delete-btn");
    deleteButton.addEventListener("click", () =>
      removeTransactions(transaction.id)
    );
    const editButton = document.createElement("button");
    editButton.classList.add("edit-btn");
    editButton.innerHTML = `<i class="fa-solid fa-pen-to-square"></i>`;
    editButton.addEventListener("click", () => editTransaction(transaction.id));
    li.append(editButton, deleteButton);
    transactionList.appendChild(li);
  });
}
function removeTransactions(id) {
  transactions = transactions.filter((t) => t.id !== id);
  localStorage.setItem("transaction", JSON.stringify(transactions));
  createTransaction();
  updateSummary();
}
function editTransaction(id) {
  const theTransaction = transactions.find((t) => t.id === id);
  if (theTransaction) {
    decsInput.value = theTransaction.description;
    amountInput.value - theTransaction.amount;
    editId = id;
  }
}
createTransaction();
updateSummary();
