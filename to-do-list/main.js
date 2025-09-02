const cards = document.querySelectorAll(".card");
const boxes = document.querySelectorAll(".box");
const addButton = document.getElementById("add-btn");
const toDo = document.querySelector(".to-do");
const input = document.querySelector("input");

window.addEventListener("load", loadTasks);
addButton.addEventListener("click", add);
cards.forEach((card) => {
  card.addEventListener("dragstart", (e) => {
    e.dataTransfer.setData("text/plain", e.target.id);
    console.log("dragstart");
  });
});
boxes.forEach((box) => {
  box.addEventListener("dragover", (e) => {
    e.preventDefault();
    box.classList.add("over");
  });
  box.addEventListener("dragleave", () => {
    box.classList.remove("over");
  });
  box.addEventListener("drop", (e) => {
    e.preventDefault();
    const data = e.dataTransfer.getData("text/plain");
    const draggedElement = document.getElementById(data);
    box.appendChild(draggedElement);
    updateTasks(draggedElement.id, box.classList[1]);
  });
});
function add() {
  if (input.value.trim() !== "") {
    const id = "card-" + Date.now();
    createTask(id, input.value, "to-do");
    saveTasks(id, input.value, "to-do");
    input.value = "";
  }
}
function createTask(id, text, className) {
  let Task = document.createElement("p");
  Task.innerText = text;

  Task.className = "card";
  Task.id = id;
  Task.draggable = true;
  Task.addEventListener("dragstart", (e) => {
    e.dataTransfer.setData("text/plain", e.target.id);
  });
  Task.addEventListener("dblclick", () => {
    Task.remove();
    removeTasks(id);
  });

  const box = document.querySelector("." + className);
  if (box) {
    box.appendChild(Task);
  }
}

function saveTasks(id, text, boxClass) {
  let tasks = JSON.parse(localStorage.getItem("task")) || [];
  tasks.push({ id, text, boxClass });
  localStorage.setItem("task", JSON.stringify(tasks));
}
function removeTasks(id) {
  let tasks = JSON.parse(localStorage.getItem("task")) || [];
  tasks = tasks.filter((t) => t.id !== id);
  localStorage.setItem("task", JSON.stringify(tasks));
}
function loadTasks() {
  let tasks = JSON.parse(localStorage.getItem("task")) || [];
  tasks.forEach((t) => createTask(t.id, t.text, t.boxClass));
}
function updateTasks(id, newBoxClass) {
  let tasks = JSON.parse(localStorage.getItem("task")) || [];
  tasks = tasks.map((t) => (t.id === id ? { ...t, boxClass: newBoxClass } : t));
  localStorage.setItem("task", JSON.stringify(tasks));
}
