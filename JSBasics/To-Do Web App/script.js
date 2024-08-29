document.getElementById("addTaskButton").addEventListener("click", addTask);

function addTask() {
    const taskInput = document.getElementById("taskInput");
    const taskText = taskInput.value.trim();

    if (taskText !== "") {
        const pendingList = document.getElementById("pendingList");

        const taskItem = document.createElement("li");
        const taskSpan = document.createElement("span");
        taskSpan.textContent = taskText;

        const timestamp = document.createElement("div");
        timestamp.classList.add("timestamp");
        timestamp.textContent = "Added on: " + new Date().toLocaleString();

        const editButton = createButton("Edit", "edit", function() {
            const newText = prompt("Edit Task:", taskSpan.textContent);
            if (newText) {
                taskSpan.textContent = newText;
            }
        });

        const completeButton = createButton("Complete", "complete", function() {
            taskItem.classList.add("completed");
            const completedList = document.getElementById("completedList");
            completedList.appendChild(taskItem);
            completeButton.remove();
            timestamp.textContent += " | Completed on: " + new Date().toLocaleString();
        });

        const deleteButton = createButton("Delete", "delete", function() {
            const list = taskItem.parentNode;
            list.removeChild(taskItem);
        });

        taskItem.appendChild(taskSpan);
        taskItem.appendChild(timestamp);
        taskItem.appendChild(editButton);
        taskItem.appendChild(completeButton);
        taskItem.appendChild(deleteButton);

        pendingList.appendChild(taskItem);
        taskInput.value = "";
    }
}

function createButton(text, className, onClick) {
    const button = document.createElement("button");
    button.textContent = text;
    button.className = className;
    button.addEventListener("click", onClick);
    return button;
}
