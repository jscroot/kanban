document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.add-task-btn').forEach(button => {
        button.addEventListener('click', addTask);
    });
    initDragAndDrop();
});

function addTask(e) {
    const column = e.target.dataset.column;
    const taskText = prompt('Enter task description:');
    if (taskText) {
        const taskDiv = document.createElement('div');
        taskDiv.classList.add('task');
        taskDiv.textContent = taskText;
        taskDiv.setAttribute('draggable', true);
        taskDiv.addEventListener('dragstart', dragStart);
        taskDiv.addEventListener('dragend', dragEnd);

        document.getElementById(`${column}-tasks`).appendChild(taskDiv);
    }
}

function initDragAndDrop() {
    const tasks = document.querySelectorAll('.task');
    const columns = document.querySelectorAll('.kanban-column');

    tasks.forEach(task => {
        task.addEventListener('dragstart', dragStart);
        task.addEventListener('dragend', dragEnd);
    });

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

function dragDrop() {
    this.classList.remove('over');
    const taskId = e.dataTransfer.getData('text/plain');
    const task = document.getElementById(taskId);
    this.querySelector('.tasks').appendChild(task);
}

document.addEventListener('DOMContentLoaded', initDragAndDrop);
