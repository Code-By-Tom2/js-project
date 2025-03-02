document.addEventListener('DOMContentLoaded', function() {
    const toggleBtn = document.getElementById('toggle-btn');
    const sidebar = document.getElementById('sidebar');
    const icon = toggleBtn.querySelector('i');

    toggleBtn.addEventListener('click', function() {
        sidebar.classList.toggle('active');
        document.body.classList.toggle('sidebar-active');
        if (sidebar.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
});