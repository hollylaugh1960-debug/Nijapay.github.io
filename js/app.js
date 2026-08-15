const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");


// =========================
// MOBILE MENU
// =========================

if (menuBtn && navMenu) {

    // Open / close menu
    menuBtn.addEventListener("click", (event) => {

        event.stopPropagation();

        navMenu.classList.toggle("active");

    });


    // Close menu when clicking outside
    document.addEventListener("click", (event) => {

        if (
            navMenu.classList.contains("active") &&
            !navMenu.contains(event.target) &&
            !menuBtn.contains(event.target)
        ) {

            navMenu.classList.remove("active");

        }

    });


    // Close menu after clicking a navigation link
    const navLinks =
        navMenu.querySelectorAll("a");

    navLinks.forEach((link) => {

        link.addEventListener("click", () => {

            navMenu.classList.remove("active");

        });

    });

}