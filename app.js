document.getElementById('addTaskBtn').addEventListener('click', function () {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();

    if (taskText !== "") {
        const taskList = document.getElementById('taskList');

        // Створення нового елемента списку
        const li = document.createElement('li');
        li.textContent = taskText;

        // Додавання кнопки видалення
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Видалити';
        deleteBtn.addEventListener('click', function () {
            taskList.removeChild(li);
            saveTasks();
        });

        li.appendChild(deleteBtn);
        taskList.appendChild(li);

        // Очищення поля введення
        taskInput.value = "";

        // Збереження задач
        saveTasks();
    }
});

// Функція для збереження задач у локальному сховищі
function saveTasks() {
    const tasks = [];
    document.querySelectorAll('#taskList li').forEach(function (task) {
        tasks.push(task.textContent.replace('Видалити', '').trim());
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Функція для завантаження задач з локального сховища
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const taskList = document.getElementById('taskList');

    tasks.forEach(function (taskText) {
        const li = document.createElement('li');
        li.textContent = taskText;

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Видалити';
        deleteBtn.addEventListener('click', function () {
            taskList.removeChild(li);
            saveTasks();
        });

        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    });
}

// Завантаження задач при завантаженні сторінки
window.onload = loadTasks;
