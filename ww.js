// Variables FOR current month and year
let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();

// Task storage (with the date)
let tasks = {};

// Function to generate the calendar
function generateCalendar() {
    const calendarElement = document.getElementById("calendar");
    const date = new Date(currentYear, currentMonth);
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
    const totalDaysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    // Get month name and update the UI
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    document.getElementById("monthName").innerText = `${monthNames[currentMonth]} ${currentYear}`;

    // Clear previous calendar
    calendarElement.innerHTML = '';

    // Add blank spaces for the first week
    for (let i = 0; i < firstDayOfMonth; i++) {
        const blank = document.createElement('div');
        calendarElement.appendChild(blank);
    }

    // Add day numbers
    for (let day = 1; day <= totalDaysInMonth; day++) {
        const dayElement = document.createElement('div');
        dayElement.classList.add('day');
        dayElement.textContent = day;

        // Highlight days with tasks
        if (tasks[`${currentYear}-${currentMonth + 1}-${day}`]) {
            dayElement.classList.add('has-tasks');
        }

        // Event listener for showing tasks
        dayElement.addEventListener('click', () => showTasksForDay(day));

        calendarElement.appendChild(dayElement);
    }
}

// Show tasks for a specific day
function showTasksForDay(day) {
    const taskList = document.getElementById("taskList");
    const selectedDate = `${currentYear}-${currentMonth + 1}-${day}`;
    taskList.innerHTML = ''; // Clear previous tasks

    if (tasks[selectedDate]) {
        tasks[selectedDate].forEach((task, index) => {
            const listItem = document.createElement('li');
            listItem.textContent = task.text;

            // Complete button
            const completeButton = document.createElement('button');
            completeButton.classList.add('complete');
            completeButton.textContent = "Complete";
            completeButton.addEventListener('click', () => completeTask(selectedDate, index));

            // Delete button
            const deleteButton = document.createElement('button');
            deleteButton.classList.add('delete');
            deleteButton.textContent = "Delete";
            deleteButton.addEventListener('click', () => deleteTask(selectedDate, index));

            listItem.appendChild(completeButton);
            listItem.appendChild(deleteButton);

            // If task is completed, apply class
            if (task.completed) {
                listItem.classList.add('completed');
            }

            taskList.appendChild(listItem);
        });
    } else {
        taskList.innerHTML = '<li>No tasks for this day.</li>';
    }
}

// Task Completion
function completeTask(date, index) {
    tasks[date][index].completed = true;
    generateCalendar(); // Refresh the calendar
    showTasksForDay(date.split('-')[2]); // Refresh the tasks for the specific day
}

// Task Deletion
function deleteTask(date, index) {
    tasks[date].splice(index, 1);
    if (tasks[date].length === 0) {
        delete tasks[date]; // Remove the day if there are no tasks left
    }
    generateCalendar(); // Refresh the calendar
    showTasksForDay(date.split('-')[2]); // Refresh the tasks for the specific day
}

// Add Task
document.getElementById("addTaskBtn").addEventListener("click", () => {
    const taskText = document.getElementById("taskInput").value;
    const taskDate = document.getElementById("taskDate").value;

    if (taskText && taskDate) {
        if (!tasks[taskDate]) {
            tasks[taskDate] = [];
        }
        tasks[taskDate].push({ text: taskText, completed: false });

        document.getElementById("taskInput").value = ''; // Clear input
        document.getElementById("taskDate").value = ''; // Clear date
        generateCalendar(); // Refresh the calendar
        showTasksForDay(taskDate.split('-')[2]); // Refresh tasks for the selected day
    }
});

// Navigate to previous and next month
document.getElementById("prevMonthBtn").addEventListener("click", () => {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    generateCalendar();
});

document.getElementById("nextMonthBtn").addEventListener("click", () => {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    generateCalendar();
});

// Initialize calendar
generateCalendar();
