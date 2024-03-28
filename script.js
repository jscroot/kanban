let taskIdCounter = 0; // Global counter to ensure each task has a unique ID

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.add-task-btn').forEach(button => {
        button.addEventListener('click', addTask);
    });
});

function addTask(e) {
    const column = e.target.dataset.column;
    const taskText = prompt('Enter task description:');
    if (taskText) {
        const taskDiv = document.createElement('div');
        taskDiv.classList.add('task');
        taskDiv.textContent = taskText;
        taskDiv.setAttribute('draggable', true);
        taskDiv.id = `task-${taskIdCounter++}`; // Assign a unique ID to each task
        taskDiv.addEventListener('dragstart', dragStart);
        taskDiv.addEventListener('dragend', dragEnd);

        document.getElementById(`${column}-tasks`).appendChild(taskDiv);
    }
}

function initDragAndDrop() {
    const columns = document.querySelectorAll('.kanban-column');

    columns.forEach(column => {
        column.addEventListener('dragover', dragOver);
        column.addEventListener('dragenter', dragEnter);
        column.addEventListener('dragleave', dragLeave);
        column.addEventListener('drop', dragDrop);
    });
}

function dragStart(e) {
    e.dataTransfer.setData('text/plain', e.target.id);
    setTimeout(() => this.classList.add('hide'), 0);
}

function dragEnd() {
    this.classList.remove('hide');
}

function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
    this.classList.add('over');
}

function dragLeave() {
    this.classList.remove('over');
}

function dragDrop(e) {
    this.classList.remove('over');
    const taskId = e.dataTransfer.getData('text/plain');
    const task = document.getElementById(taskId);
    if (task && this.classList.contains('kanban-column')) {
        this.querySelector('.tasks').appendChild(task);
    }
}

document.addEventListener('DOMContentLoaded', () => initDragAndDrop()); // Initialize drag and drop
