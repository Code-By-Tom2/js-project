document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('http://localhost:5000/api/courses');
        const courses = await response.json();

        // Populate the courses section dynamically
        const coursesContainer = document.querySelector('.container');
        courses.forEach(course => {
            const courseCard = document.createElement('div');
            courseCard.classList.add('course-card');
            courseCard.innerHTML = `
                <img src="${course.image}" alt="${course.title}" class="course-image">
                <h3>${course.title}</h3>
                <p>${course.description}</p>
                <a href="#" class="btn">Learn More</a>
            `;
            coursesContainer.appendChild(courseCard);
        });
    } catch (error) {
        console.error('Error fetching courses:', error);
    }
});
