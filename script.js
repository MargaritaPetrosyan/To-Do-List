// Select elements
const taskInput = document.getElementById("task-input");
const addTaskBtn = document.getElementById("add-task-btn");
const taskList = document.getElementById("task-list");

// Load tasks from localStorage
window.onload = function () {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((task) => {
    createTask(task.text, task.completed);
  });
};

// Add task event
addTaskBtn.addEventListener("click", () => {
  const taskText = taskInput.value.trim();
  if (taskText) {
    createTask(taskText, false);
    saveTask(taskText, false);
    taskInput.value = "";
  }
});

// Create task element
function createTask(text, completed) {
  const li = document.createElement("li");
  li.className = "task-item";
  if (completed) li.classList.add("completed");

  li.innerHTML = `
    <span>${text}</span>
    <button class="delete-btn">Delete</button>
  `;

  li.addEventListener("click", function () {
    this.classList.toggle("completed");
    updateTask(text, this.classList.contains("completed"));
  });

  li.querySelector(".delete-btn").addEventListener("click", function (e) {
    e.stopPropagation();
    deleteTask(text);
    li.remove();
  });

  taskList.appendChild(li);
}

// Save task to localStorage
function saveTask(text, completed) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push({ text, completed });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Update task in localStorage
function updateTask(text, completed) {
  const tasks = JSON.parse(localStorage.getItem("tasks"));
  const taskIndex = tasks.findIndex((task) => task.text === text);
  if (taskIndex > -1) {
    tasks[taskIndex].completed = completed;
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
}

// Delete task from localStorage
function deleteTask(text) {
  const tasks = JSON.parse(localStorage.getItem("tasks"));
  const filteredTasks = tasks.filter((task) => task.text !== text);
  localStorage.setItem("tasks", JSON.stringify(filteredTasks));
}
