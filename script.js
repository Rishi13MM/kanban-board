"use strict"

const todoEl = document.getElementById("todo");
const progressEl = document.getElementById("progress");
const doneEl = document.getElementById("done");
const modalEl = document.querySelector(".modal");
const toggleModalButtonEl = document.getElementById("toggle-modal-btn");
const modalBackgroundEl = document.querySelector(".modal .bg");

let dragElement = null;


addDragEventsOnColumn(todoEl);
addDragEventsOnColumn(doneEl);
addDragEventsOnColumn(progressEl);


const tasks = document.querySelectorAll(".task");

tasks.forEach((task)=>{
    task.addEventListener("drag", (e)=>{
        dragElement = task;
    });
})


function addDragEventsOnColumn(element) {
    element.addEventListener("dragenter", (e)=>{
        e.preventDefault();
        element.classList.add("hover-over");
    });

    element.addEventListener("dragleave", (e)=>{
        e.preventDefault();
        element.classList.remove("hover-over");
    });

    element.addEventListener("dragover", (e)=>{
        e.preventDefault();
        console.log("hover..");
    })

    element.addEventListener("drop", (e)=> {
        e.preventDefault();
        element.append(dragElement);
        element.classList.remove("hover-over");
        console.log("Task dropped!");
    });
}


toggleModalButtonEl.addEventListener("click", (e)=>{
    modalEl.classList.add("active");
});

modalBackgroundEl.addEventListener("click", (e)=>{
    modalEl.classList.remove("active");
});