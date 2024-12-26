// Pomodoro Timer Logic
let studyTime = 25; // Default study time in minutes
let breakTime = 5; // Default break time in minutes
let timerInterval;
let isBreak = false;
let remainingTime = studyTime * 60; // Convert to seconds

const timeDisplay = document.getElementById('time-display');
const startButton = document.getElementById('start-button');
const resetButton = document.getElementById('reset-button');
const studyInput = document.getElementById('study-time');
const breakInput = document.getElementById('break-time');

// Format time as MM:SS
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

// Update the timer display
function updateDisplay() {
    timeDisplay.textContent = formatTime(remainingTime);
}

// Start the timer
function startTimer() {
    if (timerInterval) return; // Prevent multiple intervals

    timerInterval = setInterval(() => {
        if (remainingTime > 0) {
            remainingTime--;
            updateDisplay();
        } else {
            clearInterval(timerInterval);
            timerInterval = null;
            isBreak = !isBreak;
            remainingTime = (isBreak ? breakTime : studyTime) * 60;
            alert(isBreak ? 'Waktunya istirahat!' : 'Waktunya belajar!');
            updateDisplay();
            startTimer();
        }
    }, 1000);
}

// Reset the timer
function resetTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
    isBreak = false;
    studyTime = parseInt(studyInput.value) || 25;
    breakTime = parseInt(breakInput.value) || 5;
    remainingTime = studyTime * 60;
    updateDisplay();
}

// Event listeners
startButton.addEventListener('click', startTimer);
resetButton.addEventListener('click', resetTimer);

// Initialize display
updateDisplay();

// To-Do List Logic
const todoInput = document.getElementById('todo-input');
const addButton = document.getElementById('add-button');
const todoItems = document.getElementById('todo-items');

// Add a new task
function addTask() {
    const taskText = todoInput.value.trim();
    if (!taskText) return;

    const li = document.createElement('li');
    li.textContent = taskText;

    const completeButton = document.createElement('button');
    completeButton.textContent = 'Selesai';
    completeButton.addEventListener('click', () => {
        li.classList.toggle('completed');
    });

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Hapus';
    deleteButton.addEventListener('click', () => {
        todoItems.removeChild(li);
        saveTasks();
    });

    li.appendChild(completeButton);
    li.appendChild(deleteButton);
    todoItems.appendChild(li);

    todoInput.value = '';
    saveTasks();
}

// Save tasks to localStorage
function saveTasks() {
    const tasks = Array.from(todoItems.children).map(item => ({
        text: item.firstChild.textContent,
        completed: item.classList.contains('completed')
    }));
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Load tasks from localStorage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.textContent = task.text;
        if (task.completed) li.classList.add('completed');

        const completeButton = document.createElement('button');
        completeButton.textContent = 'Selesai';
        completeButton.addEventListener('click', () => {
            li.classList.toggle('completed');
            saveTasks();
        });

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Hapus';
        deleteButton.addEventListener('click', () => {
            todoItems.removeChild(li);
            saveTasks();
        });

        li.appendChild(completeButton);
        li.appendChild(deleteButton);
        todoItems.appendChild(li);
    });
}

// Event listener
addButton.addEventListener('click', addTask);

todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTask();
});

// Initialize tasks
loadTasks();