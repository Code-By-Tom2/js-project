document.addEventListener("DOMContentLoaded", () => {
    const faces = document.querySelectorAll(".face");
    const button = document.getElementById("colorButton");

    button.addEventListener("click", () => {
        faces.forEach(face => {
            face.style.background = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;
        });
    });
});
