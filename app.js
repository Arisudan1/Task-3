document.addEventListener('DOMContentLoaded', function() {
    const taskInput = document.getElementById('task-input');
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskList = document.getElementById('task-list');

    // Load tasks from local storage
    loadTasks();

    addTaskBtn.addEventListener('click', addTask);

    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText === '') return;

        const taskItem = createTaskItem(taskText);
        taskList.appendChild(taskItem);

        saveTasks();
        taskInput.value = '';
    }

    function createTaskItem(text) {
        const li = document.createElement('li');

        const span = document.createElement('span');
        span.textContent = text;

        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.classList.add('edit-btn');
        editBtn.addEventListener('click', () => editTask(li));

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.classList.add('delete-btn');
        deleteBtn.addEventListener('click', () => deleteTask(li));

        const priorityBtn = document.createElement('button');
        priorityBtn.textContent = '!';
        priorityBtn.classList.add('priority');
        priorityBtn.addEventListener('click', () => togglePriority(li));

        const statusBtn = document.createElement('button');
        statusBtn.textContent = 'Complete';
        statusBtn.classList.add('status-btn');
        statusBtn.addEventListener('click', () => toggleStatus(li));

        li.appendChild(span);
        li.appendChild(editBtn);
        li.appendChild(deleteBtn);
        li.appendChild(priorityBtn);
        li.appendChild(statusBtn);

        return li;
    }

    function editTask(taskItem) {
        const newText = prompt('Edit your task:', taskItem.firstChild.textContent);
        if (newText !== null && newText.trim() !== '') {
            taskItem.firstChild.textContent = newText.trim();
            saveTasks();
        }
    }

    function deleteTask(taskItem) {
        taskItem.remove();
        saveTasks();
    }

    function togglePriority(taskItem) {
        taskItem.classList.toggle('priority');
        saveTasks();
    }

    function toggleStatus(taskItem) {
        taskItem.classList.toggle('completed');
        saveTasks();
    }

    function saveTasks() {
        const tasks = [];
        taskList.querySelectorAll('li').forEach(taskItem => {
            const text = taskItem.firstChild.textContent;
            const isPriority = taskItem.classList.contains('priority');
            const isCompleted = taskItem.classList.contains('completed');
            tasks.push({ text, isPriority, isCompleted });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => {
            const taskItem = createTaskItem(task.text);
            if (task.isPriority) {
                taskItem.classList.add('priority');
            }
            if (task.isCompleted) {
                taskItem.classList.add('completed');
            }
            taskList.appendChild(taskItem);
        });
    }
});
