"use strict"

const todoEl = document.getElementById("todo");
const progressEl = document.getElementById("progress");
const doneEl = document.getElementById("done");
const modalEl = document.querySelector(".modal");
const toggleModalButtonEl = document.getElementById("toggle-modal-btn");
const modalBackgroundEl = document.querySelector(".modal .bg");
const addTaskButtonEl = document.getElementById("add-task-btn");

const tasks = document.querySelectorAll(".task");
let dragElement = null;


tasks.forEach((task) => {
    task.addEventListener("drag", (e) => {
        dragElement = task;
    });
})


addDragEventsOnColumn(todoEl);
addDragEventsOnColumn(doneEl);
addDragEventsOnColumn(progressEl);

function addDragEventsOnColumn(element) {
    element.addEventListener("dragenter", (e) => {
        e.preventDefault();
        element.classList.add("hover-over");
    });

    element.addEventListener("dragleave", (e) => {
        e.preventDefault();
        element.classList.remove("hover-over");
    });

    element.addEventListener("dragover", (e) => {
        e.preventDefault();
    })

    element.addEventListener("drop", (e) => {
        e.preventDefault();
        element.append(dragElement);
        element.classList.remove("hover-over");

        updateTaskCount();
    });
}


toggleModalButtonEl.addEventListener("click", (e) => {
    modalEl.classList.add("active");
});

modalBackgroundEl.addEventListener("click", (e) => {
    modalEl.classList.remove("active");
});

addTaskButtonEl.addEventListener("click", (e) => {
    e.preventDefault();
    const taskTitleEl = document.getElementById("task-title-input");
    const taskDescEl = document.getElementById("task-desc-input");

    // Prevent adding empty task in todo column
    if (!taskTitleEl.value.trim() || !taskDescEl.value.trim()) {
        alert("No task found!");
    } else {
        const newTaskEl = document.createElement("div");
        newTaskEl.classList.add("task");
        newTaskEl.setAttribute("draggable", "true");

        newTaskEl.innerHTML =
            `<h2>${taskTitleEl.value}</h2>
                    <p>${taskDescEl.value}</p>
                    <button>Delete</button>`

        newTaskEl.addEventListener("drag", (e) => {
            dragElement = newTaskEl;
        });

        newTaskEl.querySelector("button").addEventListener("click", (e) => {
            newTaskEl.remove();
            updateTaskCount();
        })

        todoEl.append(newTaskEl);

        updateTaskCount();

        // Reset input fields
        taskTitleEl.value = "";
        taskDescEl.value = "";
    }

    modalEl.classList.remove("active");
});


function updateTaskCount() {
    [todoEl, progressEl, doneEl].forEach(col => {
        const taskCountEl = col.querySelector(".right");
        const tasksEl = col.querySelectorAll(".task");

        taskCountEl.textContent = tasksEl.length;
    });
}