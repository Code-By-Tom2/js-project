const draggable = document.getElementById("draggable");
const dropzone = document.querySelector(".dropzone");

draggable.addEventListener("dragstart", (e) => {
    e.dataTransfer.setData("text/plain", draggable.id);
    setTimeout(() => {
        draggable.style.opacity = "0.5";
    }, 0);
});

draggable.addEventListener("dragend", () => {
    draggable.style.opacity = "1";
});

dropzone.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropzone.classList.add("over");
});

dropzone.addEventListener("dragleave", () => {
    dropzone.classList.remove("over");
});

dropzone.addEventListener("drop", (e) => {
    e.preventDefault();
    const draggedElement = document.getElementById(e.dataTransfer.getData("text/plain"));
    dropzone.appendChild(draggedElement);
    dropzone.classList.remove("over");
});
