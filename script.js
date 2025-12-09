// Task storage
let tasks = [];
let taskIdCounter = 1;

// Elements
const form = document.getElementById('taskForm');
const taskNameInput = document.getElementById('taskName');
const priorityInput = document.getElementById('priority');
const importantInput = document.getElementById('important');
const completedInput = document.getElementById('completed');
const taskManager = document.getElementById('taskmanager');

// Add Task
form.addEventListener('submit', (e) => {
   e.preventDefault();

   if (taskNameInput.value.trim() === '') {
     alert('Task name cannot be empty.');
     return;
  }

    const task = {
       id: taskIdCounter++,
       name: taskNameInput.value.trim(),
       priority: priorityInput.value,
       isImportant: importantInput.checked,
       isCompleted: completedInput.checked,
       date: new Date().toLocaleString()
  };

    tasks.push(task);
    renderTasks();
    console.log(JSON.stringify(tasks));

    form.reset();
});

// Render
function renderTasks() {
   taskManager.innerHTML = '';

   tasks.forEach(task => {
    const card = document.createElement('div');
    card.classList.add('task-card');

    // Styling for important or completed tasks
    if (task.isImportant) card.style.border = '2px solid red';
    if (task.isCompleted) card.style.textDecoration = 'line-through';

    // HTML added upon click of add task button
    card.innerHTML = `
      <div class="task-top">
        <span class="task-name">${task.name}</span>
        <span class="badge">${task.priority}</span>
      </div>
      <div class="task-meta">Added: ${task.date}</div>
      <div class="task-controls">
        <button class="small-btn" onclick="toggleComplete(${task.id})">Done</button>
        <button class="small-btn" onclick="toggleImportant(${task.id})">Important</button>
        <button class="small-btn" onclick="deleteTask(${task.id})">Delete</button>
      </div>
    `;

    taskManager.appendChild(card);
  });
}

// Toggle completion
function toggleComplete(id) {
    const task = tasks.find(t => t.id === id);
    task.isCompleted = !task.isCompleted;
    renderTasks();
    console.log(JSON.stringify(tasks));
}

// Toggle importance
function toggleImportant(id) {
    const task = tasks.find(t => t.id === id);
    task.isImportant = !task.isImportant;
    renderTasks();
    console.log(JSON.stringify(tasks));
}

// Delete task
function deleteTask(id) {
    tasks = tasks.filter(t => t.id !== id);
    renderTasks();
    console.log(JSON.stringify(tasks));
}
