/* =========================================================
   ZOHAIB NAZIR — PORTFOLIO
   Main JavaScript
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTS
    ===================================================== */

    const pageLoader = document.getElementById("pageLoader");
    const navbar = document.getElementById("navbar");
    const themeToggle = document.getElementById("themeToggle");
    const menuToggle = document.getElementById("menuToggle");
    const mobileMenu = document.getElementById("mobileMenu");
    const currentYear = document.getElementById("currentYear");

    const navLinks = document.querySelectorAll(".nav-link");
    const mobileLinks = document.querySelectorAll(".mobile-menu a");

    const sections = document.querySelectorAll("section[id]");


    /* =====================================================
       PAGE LOADER
    ===================================================== */

    window.addEventListener("load", () => {

        setTimeout(() => {

            if (pageLoader) {
                pageLoader.classList.add("loaded");
            }

        }, 500);

    });


    /* =====================================================
       NAVBAR SCROLL EFFECT
    ===================================================== */

    function handleNavbarScroll() {

        if (!navbar) return;

        if (window.scrollY > 50) {

            navbar.classList.add("scrolled");

        } else {

            navbar.classList.remove("scrolled");

        }

    }

    window.addEventListener(
        "scroll",
        handleNavbarScroll
    );

    handleNavbarScroll();


    /* =====================================================
       DARK / LIGHT THEME
    ===================================================== */

    function updateThemeIcon() {

        if (!themeToggle) return;

        const icon = themeToggle.querySelector("i");

        if (!icon) return;

        if (
            document.body.classList.contains("light-theme")
        ) {

            icon.classList.remove("fa-moon");

            icon.classList.add("fa-sun");

        } else {

            icon.classList.remove("fa-sun");

            icon.classList.add("fa-moon");

        }

    }


    /* Load saved theme */

    const savedTheme =
        localStorage.getItem("portfolio-theme");

    if (savedTheme === "light") {

        document.body.classList.add(
            "light-theme"
        );

    }

    updateThemeIcon();


    /* Toggle theme */

    if (themeToggle) {

        themeToggle.addEventListener(
            "click",
            () => {

                document.body.classList.toggle(
                    "light-theme"
                );

                const isLight =
                    document.body.classList.contains(
                        "light-theme"
                    );

                localStorage.setItem(
                    "portfolio-theme",
                    isLight ? "light" : "dark"
                );

                updateThemeIcon();

            }
        );

    }


    /* =====================================================
       MOBILE MENU
    ===================================================== */

    function openMobileMenu() {

        if (!mobileMenu || !menuToggle) return;

        mobileMenu.classList.add("open");

        menuToggle.setAttribute(
            "aria-label",
            "Close menu"
        );

        const icon =
            menuToggle.querySelector("i");

        if (icon) {

            icon.classList.remove(
                "fa-bars"
            );

            icon.classList.add(
                "fa-xmark"
            );

        }

    }


    function closeMobileMenu() {

        if (!mobileMenu || !menuToggle) return;

        mobileMenu.classList.remove("open");

        menuToggle.setAttribute(
            "aria-label",
            "Open menu"
        );

        const icon =
            menuToggle.querySelector("i");

        if (icon) {

            icon.classList.remove(
                "fa-xmark"
            );

            icon.classList.add(
                "fa-bars"
            );

        }

    }


    if (menuToggle) {

        menuToggle.addEventListener(
            "click",
            () => {

                const isOpen =
                    mobileMenu.classList.contains(
                        "open"
                    );

                if (isOpen) {

                    closeMobileMenu();

                } else {

                    openMobileMenu();

                }

            }
        );

    }


    /* Close mobile menu after clicking a link */

    mobileLinks.forEach(link => {

        link.addEventListener(
            "click",
            () => {

                closeMobileMenu();

            }
        );

    });


    /* Close menu when clicking outside */

    document.addEventListener(
        "click",
        (event) => {

            if (!mobileMenu || !menuToggle) {
                return;
            }

            const clickedInsideMenu =
                mobileMenu.contains(event.target);

            const clickedMenuButton =
                menuToggle.contains(event.target);

            if (
                mobileMenu.classList.contains("open") &&
                !clickedInsideMenu &&
                !clickedMenuButton
            ) {

                closeMobileMenu();

            }

        }
    );


    /* Close mobile menu when resizing to desktop */

    window.addEventListener(
        "resize",
        () => {

            if (window.innerWidth > 760) {

                closeMobileMenu();

            }

        }
    );


    /* =====================================================
       ACTIVE NAVIGATION LINK
    ===================================================== */

    function updateActiveNavigation() {

        let currentSection = "";

        const scrollPosition =
            window.scrollY + 180;


        sections.forEach(section => {

            const sectionTop =
                section.offsetTop;

            const sectionHeight =
                section.offsetHeight;

            const sectionId =
                section.getAttribute("id");

            if (
                scrollPosition >= sectionTop &&
                scrollPosition <
                    sectionTop + sectionHeight
            ) {

                currentSection =
                    sectionId;

            }

        });


        navLinks.forEach(link => {

            link.classList.remove("active");

            const href =
                link.getAttribute("href");

            if (
                href ===
                `#${currentSection}`
            ) {

                link.classList.add("active");

            }

        });

    }


    window.addEventListener(
        "scroll",
        updateActiveNavigation
    );

    updateActiveNavigation();


    /* =====================================================
       SMOOTH SCROLL
    ===================================================== */

    const allAnchorLinks =
        document.querySelectorAll(
            'a[href^="#"]'
        );

    allAnchorLinks.forEach(link => {

        link.addEventListener(
            "click",
            event => {

                const targetId =
                    link.getAttribute("href");

                if (
                    !targetId ||
                    targetId === "#" ||
                    targetId.length < 2
                ) {

                    return;

                }

                const target =
                    document.querySelector(
                        targetId
                    );

                if (!target) return;

                event.preventDefault();

                const navbarHeight =
                    navbar
                        ? navbar.offsetHeight
                        : 0;

                const targetPosition =
                    target.getBoundingClientRect()
                        .top +
                    window.scrollY -
                    navbarHeight;

                window.scrollTo({

                    top: targetPosition,

                    behavior: "smooth"

                });

            }
        );

    });


    /* =====================================================
       SCROLL REVEAL ANIMATION
    ===================================================== */

    const revealElements =
        document.querySelectorAll(

            ".section-heading, " +
            ".about-content, " +
            ".stat-card, " +
            ".education-card, " +
            ".skill-card, " +
            ".project-featured, " +
            ".service-card, " +
            ".contact-wrapper"

        );


    revealElements.forEach(element => {

        element.style.opacity = "0";

        element.style.transform =
            "translateY(30px)";

        element.style.transition =
            "opacity 0.7s ease, transform 0.7s ease";

    });


    const revealObserver =
        new IntersectionObserver(

            (entries, observer) => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) {
                        return;
                    }

                    entry.target.style.opacity = "1";

                    entry.target.style.transform =
                        "translateY(0)";

                    observer.unobserve(
                        entry.target
                    );

                });

            },

            {
                threshold: 0.12,

                rootMargin:
                    "0px 0px -50px 0px"
            }

        );


    revealElements.forEach(element => {

        revealObserver.observe(element);

    });


    /* =====================================================
       STAGGER SKILLS
    ===================================================== */

    const skillCards =
        document.querySelectorAll(
            ".skill-card"
        );

    skillCards.forEach(
        (card, index) => {

            card.style.transitionDelay =
                `${index * 70}ms`;

        }
    );


    /* =====================================================
       STAGGER SERVICES
    ===================================================== */

    const serviceCards =
        document.querySelectorAll(
            ".service-card"
        );

    serviceCards.forEach(
        (card, index) => {

            card.style.transitionDelay =
                `${index * 100}ms`;

        }
    );


    /* =====================================================
       HERO ENTRANCE ANIMATION
    ===================================================== */

    const heroElements = [

        document.querySelector(
            ".availability"
        ),

        document.querySelector(
            ".hero-intro"
        ),

        document.querySelector(
            ".hero-title"
        ),

        document.querySelector(
            ".hero-role"
        ),

        document.querySelector(
            ".hero-description"
        ),

        document.querySelector(
            ".hero-buttons"
        ),

        document.querySelector(
            ".hero-socials"
        ),

        document.querySelector(
            ".hero-visual"
        )

    ];


    heroElements.forEach(
        (element, index) => {

            if (!element) return;

            element.style.opacity = "0";

            element.style.transform =
                "translateY(25px)";

            element.style.transition =
                "opacity 0.8s ease, transform 0.8s ease";

            element.style.transitionDelay =
                `${0.15 + index * 0.1}s`;

        }
    );


    setTimeout(() => {

        heroElements.forEach(
            element => {

                if (!element) return;

                element.style.opacity = "1";

                element.style.transform =
                    "translateY(0)";

            }
        );

    }, 150);


    /* =====================================================
       PROFILE IMAGE PARALLAX
    ===================================================== */

    const profileCard =
        document.querySelector(
            ".profile-card"
        );


    if (
        profileCard &&
        window.matchMedia(
            "(min-width: 1001px)"
        ).matches
    ) {

        document.addEventListener(
            "mousemove",
            event => {

                const x =
                    (
                        event.clientX /
                        window.innerWidth -
                        0.5
                    );

                const y =
                    (
                        event.clientY /
                        window.innerHeight -
                        0.5
                    );

                const rotateX =
                    y * -4;

                const rotateY =
                    x * 5;

                profileCard.style.transform =
                    `rotate(3deg) perspective(900px)
                     rotateX(${rotateX}deg)
                     rotateY(${rotateY}deg)`;

            }
        );

    }


    /* =====================================================
       PROJECT LINK HOVER
       Supports multiple project links
    ===================================================== */

    const projectLinks =
        document.querySelectorAll(
            ".project-link"
        );


    projectLinks.forEach(
        projectLink => {

            projectLink.addEventListener(
                "mouseenter",
                () => {

                    if (
                        projectLink.classList.contains(
                            "project-link-static"
                        )
                    ) {
                        return;
                    }

                    projectLink.style.gap =
                        "15px";

                }
            );


            projectLink.addEventListener(
                "mouseleave",
                () => {

                    if (
                        projectLink.classList.contains(
                            "project-link-static"
                        )
                    ) {
                        return;
                    }

                    projectLink.style.gap =
                        "10px";

                }
            );

        }
    );


    /* =====================================================
       CURRENT YEAR
    ===================================================== */

    if (currentYear) {

        currentYear.textContent =
            new Date().getFullYear();

    }


    /* =====================================================
       ESC KEY
       Close mobile menu
    ===================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (event.key === "Escape") {

                closeMobileMenu();

            }

        }
    );


    /* =====================================================
       PROFILE IMAGE
    ===================================================== */

    const profileImage =
        document.querySelector(
            ".profile-image"
        );

    if (profileImage) {

        profileImage.addEventListener(
            "error",
            () => {

                console.error(
                    "Profile image could not be loaded:",
                    profileImage.src
                );

            }
        );

        profileImage.addEventListener(
            "load",
            () => {

                console.log(
                    "Profile image loaded successfully."
                );

            }
        );

    }


    /* =====================================================
       CONSOLE MESSAGE
    ===================================================== */

    console.log(
        "%cZohaib Nazir — Portfolio",
        "font-size:20px;font-weight:bold;"
    );

    console.log(
        "%cAI Developer & Web Developer & Video Editor",
        "font-size:12px;"
    );

});
