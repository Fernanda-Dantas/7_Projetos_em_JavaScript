// Seletores
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

// Eventos de escuta
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener("click", function addTodo(event){
    // Prevent form from submitting
    event.preventDefault();
    // div todo
    const todoDiv = document.createElement("div");
    // classe da div todo
    todoDiv.classList.add("todo");
    // Li (elementos em lista)
    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    // ADD TODO TO LOCALSTORAGE
    saveLocalTodos(todoInput.value);
    //Create Completed Button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = `<i class="fas fa-check"></i>`;
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    //Create trash button
    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = `<i class="fas fa-trash"></i>`;
    deleteButton.classList.add("delete-btn");
    todoDiv.appendChild(deleteButton);
    //attach final Todo
    todoList.appendChild(todoDiv);
    // Limpar input
    todoInput.value = "";
},
false
);

todoList.addEventListener("click", deleteCheck);

// Funções
function deleteCheck(event) {
const item = event.target;
  // DELETA ITENS
  if(item.classList[0] === 'delete-btn') {
    const todo = item.parentElement;
    // Animação
    todo.classList.add("fall");
    todo.addEventListener("transitionend", function() {
      todo.remove();
    });  
    removeLocalTodos(todo); 
  }

  // CHECK MARK
  if(item.classList[0] === 'complete-btn') {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
};


function saveLocalTodos(todo) {
  // Checar se está vazia ou não
  let todos;
  if(localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  todos.push(todo);
  localStorage.setItem('todos', JSON.stringify(todos));
};

function getTodos() {
  let todos;
  if(localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  todos.forEach(function(todo) {
    // div todo
    const todoDiv = document.createElement("div");
    // classe da div todo
    todoDiv.classList.add("todo");
    // Li (elementos em lista)
    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    //Create Completed Button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = `<i class="fas fa-check"></i>`;
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    //Create trash button
    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = `<i class="fas fa-trash"></i>`;
    deleteButton.classList.add("delete-btn");
    todoDiv.appendChild(deleteButton);
    //attach final Todo
    todoList.appendChild(todoDiv);
  });
};

function removeLocalTodos(todo) {
  let todos;
  if(localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
};
