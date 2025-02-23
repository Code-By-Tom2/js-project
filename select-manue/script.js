document.addEventListener("DOMContentLoaded", function () {
    const sidebar = document.getElementById("sidebar");
    const menuToggle = document.getElementById("menu-toggle");
    const mainContent = document.querySelector(".main-content");
    const sectionTitle = document.getElementById("section-title");
    const content = document.getElementById("content");

    const settingsBtn = document.getElementById("settings-btn");
    const settingsMenu = document.getElementById("settings-menu");

    // Sidebar Toggle
    menuToggle.addEventListener("click", function () {
        if (sidebar.style.width === "60px") {
            sidebar.style.width = "200px";
            mainContent.style.marginLeft = "220px";
        } else {
            sidebar.style.width = "60px";
            mainContent.style.marginLeft = "80px";
        }
    });

    // Menu Click Handling
    document.querySelectorAll(".menu-item").forEach(item => {
        item.addEventListener("click", function () {
            const section = this.getAttribute("data-section");
            sectionTitle.textContent = section.charAt(0).toUpperCase() + section.slice(1);

            if (section === "home") {
                content.innerHTML = "<p>Welcome to the home section!</p>";
            } else if (section === "analytics") {
                content.innerHTML = "<p>Analytics section: View reports and data.</p>";
            } else if (section === "settings") {
                content.innerHTML = "<p>Settings section: Manage your preferences.</p>";
            }
        });
    });

    // Settings Menu Toggle
    settingsBtn.addEventListener("click", function () {
        settingsMenu.style.display = settingsMenu.style.display === "block" ? "none" : "block";
    });

    // Close Settings Menu when Clicking Outside
    document.addEventListener("click", function (event) {
        if (!settingsBtn.contains(event.target) && !settingsMenu.contains(event.target)) {
            settingsMenu.style.display = "none";
        }
    });
});
