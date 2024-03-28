let kanbanData = [];
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
        const taskId = `task-${taskIdCounter++}`; // Moved this line up to use the ID in the data object
        // Create and append the task element
        const taskDiv = document.createElement('div');
        taskDiv.classList.add('task');
        taskDiv.textContent = taskText;
        taskDiv.setAttribute('draggable', true);
        taskDiv.id = `task-${taskIdCounter++}`; // Assign a unique ID to each task
        taskDiv.addEventListener('dragstart', dragStart);
        taskDiv.addEventListener('dragend', dragEnd);

        document.getElementById(`${column}-tasks`).appendChild(taskDiv);

        // Add the task data to the kanbanData array
        kanbanData.push({
            id: taskId,
            description: taskText,
            state: column
        });
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
    e.preventDefault(); // Prevent the default behavior
    this.classList.remove('over');
    const taskId = e.dataTransfer.getData('text/plain');
    const task = document.getElementById(taskId);
    console.log(taskId);
    console.log(task);
    if (task && this.classList.contains('kanban-column')) {
        const columnId = this.id; // Get the column ID where the task is dropped
        console.log(columnId);

        this.querySelector('.tasks').appendChild(task);

        // Find the task in kanbanData and update its state
        const taskIndex = kanbanData.findIndex(t => t.id === taskId);
        if (taskIndex !== -1) {
            kanbanData[taskIndex].state = columnId;
            console.log(`Task ${taskId} moved to ${columnId}`);
        } else {
            console.error('Task not found in kanbanData');
        }
    }
    // Debug: Log the updated kanbanData to see if the state is updated correctly
    console.log(kanbanData);
}

function getKanbanData() {
    console.log(kanbanData);
}

document.addEventListener('DOMContentLoaded', () => initDragAndDrop()); // Initialize drag and drop
