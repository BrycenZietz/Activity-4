// Activity 4: Interactive To-Do List (Part 1)

// Part A: Application state
let tasks = []; // Stores the tasks
let taskIdCounter = 1; // Gives each task a different ID

// Part B: Add a task from the input field
function addTask() {
    const taskInput = document.getElementById("taskInput");
    const taskText = taskInput.value.trim(); // Removes outer spaces

    // Show activity in the console
    console.log(`Attempting to add task: "${taskText}"`);

    // Validate input
    if (taskText === "") {
        alert("Please enter a task!");
        console.log("Task addition failed: empty input");
        return; // Stops this function
    }

    // Reject more than 100 characters
    if (taskText.length > 100) {
        alert("Task is too long! Please keep it under 100 characters.");
        console.log("Task addition failed: too long");
        return;
    }

    // Create task object
    const task = {
        id: taskIdCounter++,
        text: taskText,
        completed: false,
        createdAt: new Date() // Saves the creation time
    };

    // Add to tasks array
    tasks.push(task);
    console.log("Task added to array:", task);

    // Create list item element
    const listItem = createTaskElement(task);

    // Append to list
    const todoList = document.getElementById("todo-list");
    todoList.appendChild(listItem);

    // Clear input
    taskInput.value = "";

    // Update statistics
    updateTaskStats();

    console.log(`Task "${taskText}" added successfully. Total tasks: ${tasks.length}`);
}

// Part C: Build the list item element for a task
function createTaskElement(task) {
    // Create list item
    const listItem = document.createElement("li");
    listItem.className = "task-item";
    listItem.setAttribute("data-task-id", task.id); // Connects the row to its task

    // Create task text span
    const taskTextSpan = document.createElement("span");
    taskTextSpan.className = "task-text";
    taskTextSpan.textContent = task.text;

    // Create status span
    const statusSpan = document.createElement("span");
    statusSpan.className = "task-status";

    // Set initial state
    if (task.completed) {
        listItem.classList.add("done");
        statusSpan.textContent = "\u2713 Done";
        statusSpan.classList.add("status-done");
    } else {
        statusSpan.textContent = "\u23F3 Pending";
        statusSpan.classList.add("status-pending");
    }

    // Append spans to list item
    listItem.appendChild(taskTextSpan);
    listItem.appendChild(statusSpan);

    // Add click event for toggling completion
    listItem.onclick = function() {
        toggleTaskCompletion(task.id);
    };

    console.log("Created task element:", listItem);
    return listItem; // Sends back the new row
}

// Part D: Toggle a task's completion state
function toggleTaskCompletion(taskId) {
    console.log(`Toggling completion for task ID: ${taskId}`);

    // Find task in array
    const task = tasks.find(t => t.id === taskId);
    if (!task) {
        console.error(`Task with ID ${taskId} not found`);
        return;
    }

    // Toggle completion status
    task.completed = !task.completed;
    console.log(`Task "${task.text}" is now ${task.completed ? 'completed' : 'pending'}`);

    // Find and update DOM element
    const listItem = document.querySelector(`[data-task-id="${taskId}"]`);
    const statusSpan = listItem.querySelector(".task-status");

    if (task.completed) {
        listItem.classList.add("done");
        statusSpan.textContent = "\u2713 Done";
        statusSpan.classList.remove("status-pending");
        statusSpan.classList.add("status-done");
    } else {
        listItem.classList.remove("done");
        statusSpan.textContent = "\u23F3 Pending";
        statusSpan.classList.remove("status-done");
        statusSpan.classList.add("status-pending");
    }

    // Update statistics
    updateTaskStats();
}

// Part E: Update the task statistics
function updateTaskStats() {
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.completed).length; // Counts finished tasks
    const pendingTasks = totalTasks - completedTasks;

    // Update DOM elements
    document.getElementById("taskCount").textContent = `(${totalTasks} task${totalTasks !== 1 ? 's' : ''})`;
    document.getElementById("totalTasks").textContent = `Total: ${totalTasks}`;
    document.getElementById("completedTasks").textContent = `Completed: ${completedTasks}`;
    document.getElementById("pendingTasks").textContent = `Pending: ${pendingTasks}`;

    console.log(`Stats updated - Total: ${totalTasks}, Completed: ${completedTasks}, Pending: ${pendingTasks}`);
}

// Part F: Add tasks with the Enter key as well as the button
document.getElementById("taskInput").onkeydown = function(event) {
    if (event.key === "Enter") {
        addTask();
    }
};

// Confirm the script loaded
console.log("To-Do List application loaded");