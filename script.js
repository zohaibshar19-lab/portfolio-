/* =========================================================
   ZOHAIB NAZIR - PORTFOLIO
   Optimized JavaScript
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
       Faster than the previous 500ms artificial delay.
    ===================================================== */

    const hideLoader = () => {
        if (pageLoader) {
            pageLoader.classList.add("loaded");
        }
    };

    if (document.readyState === "complete") {
        requestAnimationFrame(hideLoader);
    } else {
        window.addEventListener("load", () => {
            requestAnimationFrame(hideLoader);
        }, { once: true });
    }


    /* =====================================================
       NAVBAR SCROLL EFFECT
    ===================================================== */

    let navbarTicking = false;

    function handleNavbarScroll() {

        if (!navbar) {
            return;
        }

        const isScrolled = window.scrollY > 50;

        navbar.classList.toggle(
            "scrolled",
            isScrolled
        );
    }

    function onScroll() {

        if (navbarTicking) {
            return;
        }

        navbarTicking = true;

        requestAnimationFrame(() => {
            handleNavbarScroll();
            updateActiveNavigation();

            navbarTicking = false;
        });
    }

    window.addEventListener(
        "scroll",
        onScroll,
        { passive: true }
    );

    handleNavbarScroll();


    /* =====================================================
       DARK / LIGHT THEME
    ===================================================== */

    function updateThemeIcon() {

        if (!themeToggle) {
            return;
        }

        const icon = themeToggle.querySelector("i");

        if (!icon) {
            return;
        }

        const isLight =
            document.body.classList.contains(
                "light-theme"
            );

        icon.classList.toggle(
            "fa-sun",
            isLight
        );

        icon.classList.toggle(
            "fa-moon",
            !isLight
        );
    }


    /* Load saved theme */

    try {

        const savedTheme =
            localStorage.getItem("portfolio-theme");

        if (savedTheme === "light") {

            document.body.classList.add(
                "light-theme"
            );
        }

    } catch (error) {
        // Ignore localStorage errors.
    }

    updateThemeIcon();


    /* Toggle theme */

    if (themeToggle) {

        themeToggle.addEventListener(
            "click",
            () => {

                const isLight =
                    document.body.classList.toggle(
                        "light-theme"
                    );

                try {

                    localStorage.setItem(
                        "portfolio-theme",
                        isLight
                            ? "light"
                            : "dark"
                    );

                } catch (error) {
                    // Ignore localStorage errors.
                }

                updateThemeIcon();
            }
        );
    }


    /* =====================================================
       MOBILE MENU
    ===================================================== */

    function setMenuState(isOpen) {

        if (!mobileMenu || !menuToggle) {
            return;
        }

        mobileMenu.classList.toggle(
            "open",
            isOpen
        );

        menuToggle.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

        menuToggle.setAttribute(
            "aria-label",
            isOpen
                ? "Close menu"
                : "Open menu"
        );

        const icon =
            menuToggle.querySelector("i");

        if (!icon) {
            return;
        }

        icon.classList.toggle(
            "fa-xmark",
            isOpen
        );

        icon.classList.toggle(
            "fa-bars",
            !isOpen
        );
    }


    function openMobileMenu() {
        setMenuState(true);
    }


    function closeMobileMenu() {
        setMenuState(false);
    }


    if (menuToggle) {

        menuToggle.addEventListener(
            "click",
            () => {

                const isOpen =
                    mobileMenu &&
                    mobileMenu.classList.contains(
                        "open"
                    );

                setMenuState(!isOpen);
            }
        );
    }


    /* Close menu after clicking a link */

    mobileLinks.forEach(link => {

        link.addEventListener(
            "click",
            closeMobileMenu
        );

    });


    /* Close menu when clicking outside */

    document.addEventListener(
        "click",
        event => {

            if (!mobileMenu || !menuToggle) {
                return;
            }

            if (
                !mobileMenu.classList.contains(
                    "open"
                )
            ) {
                return;
            }

            const clickedInsideMenu =
                mobileMenu.contains(
                    event.target
                );

            const clickedMenuButton =
                menuToggle.contains(
                    event.target
                );

            if (
                !clickedInsideMenu &&
                !clickedMenuButton
            ) {
                closeMobileMenu();
            }
        }
    );


    /* Close menu when switching to desktop */

    window.addEventListener(
        "resize",
        () => {

            if (window.innerWidth > 760) {
                closeMobileMenu();
            }
        },
        { passive: true }
    );


    /* =====================================================
       ACTIVE NAVIGATION
    ===================================================== */

    let currentSection = "";

    function updateActiveNavigation() {

        if (!sections.length) {
            return;
        }

        const scrollPosition =
            window.scrollY + 180;

        let activeSection = "";

        sections.forEach(section => {

            const sectionTop =
                section.offsetTop;

            const sectionHeight =
                section.offsetHeight;

            if (
                scrollPosition >= sectionTop &&
                scrollPosition <
                    sectionTop + sectionHeight
            ) {
                activeSection =
                    section.id;
            }
        });

        if (activeSection === currentSection) {
            return;
        }

        currentSection = activeSection;

        navLinks.forEach(link => {

            const href =
                link.getAttribute("href");

            link.classList.toggle(
                "active",
                href === `#${currentSection}`
            );
        });
    }

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
                    document.getElementById(
                        targetId.substring(1)
                    );

                if (!target) {
                    return;
                }

                event.preventDefault();

                const navbarHeight =
                    navbar
                        ? navbar.offsetHeight
                        : 0;

                const targetPosition =
                    target.getBoundingClientRect().top +
                    window.scrollY -
                    navbarHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: "smooth"
                });

                closeMobileMenu();
            }
        );

    });


    /* =====================================================
       SCROLL REVEAL ANIMATION
    ===================================================== */

    const revealElements =
        document.querySelectorAll(
            [
                ".section-heading",
                ".about-content",
                ".stat-card",
                ".education-card",
                ".skill-card",
                ".project-featured",
                ".service-card",
                ".contact-wrapper"
            ].join(", ")
        );


    /*
       Only use JavaScript reveal effects if the browser
       supports IntersectionObserver.
    */

    if ("IntersectionObserver" in window) {

        revealElements.forEach(element => {

            element.classList.add(
                "reveal-ready"
            );

        });


        const revealObserver =
            new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach(entry => {

                        if (!entry.isIntersecting) {
                            return;
                        }

                        entry.target.classList.add(
                            "revealed"
                        );

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

    }


    /* =====================================================
       STAGGER SKILLS
    ===================================================== */

    const skillCards =
        document.querySelectorAll(
            ".skill-card"
        );

    skillCards.forEach(
        (card, index) => {

            card.style.setProperty(
                "--reveal-delay",
                `${index * 70}ms`
            );
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

            card.style.setProperty(
                "--reveal-delay",
                `${index * 100}ms`
            );
        }
    );


    /* =====================================================
       HERO ENTRANCE ANIMATION
    ===================================================== */

    const heroElements = [
        document.querySelector(".availability"),
        document.querySelector(".hero-intro"),
        document.querySelector(".hero-title"),
        document.querySelector(".hero-role"),
        document.querySelector(".hero-description"),
        document.querySelector(".hero-buttons"),
        document.querySelector(".hero-content > .contact-socials"),
        document.querySelector(".hero-visual")
    ].filter(Boolean);


    heroElements.forEach(
        (element, index) => {

            element.classList.add(
                "hero-animate"
            );

            element.style.setProperty(
                "--hero-delay",
                `${150 + index * 100}ms`
            );
        }
    );


    requestAnimationFrame(() => {

        requestAnimationFrame(() => {

            heroElements.forEach(
                element => {

                    element.classList.add(
                        "hero-visible"
                    );
                }
            );

        });

    });


    /* =====================================================
       PROFILE IMAGE PARALLAX
       Only enabled on larger screens.
    ===================================================== */

    const profileCard =
        document.querySelector(
            ".profile-card"
        );

    const desktopQuery =
        window.matchMedia(
            "(min-width: 1001px)"
        );


    if (
        profileCard &&
        desktopQuery.matches
    ) {

        let mouseTicking = false;

        document.addEventListener(
            "mousemove",
            event => {

                if (mouseTicking) {
                    return;
                }

                mouseTicking = true;

                requestAnimationFrame(() => {

                    const x =
                        event.clientX /
                        window.innerWidth -
                        0.5;

                    const y =
                        event.clientY /
                        window.innerHeight -
                        0.5;

                    const rotateX =
                        y * -4;

                    const rotateY =
                        x * 5;

                    profileCard.style.transform =
                        `rotate(3deg) perspective(900px)
                         rotateX(${rotateX}deg)
                         rotateY(${rotateY}deg)`;

                    mouseTicking = false;
                });

            },
            { passive: true }
        );
    }


    /* =====================================================
       PROJECT LINK HOVER
       CSS handles the hover animation now.
       No mouseenter/mouseleave JavaScript needed.
    ===================================================== */


    /* =====================================================
       CURRENT YEAR
    ===================================================== */

    if (currentYear) {

        currentYear.textContent =
            new Date().getFullYear();
    }


    /* =====================================================
       ESC KEY
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
       PROFILE IMAGE ERROR HANDLING
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
            },
            { once: true }
        );
    }


    /* =====================================================
       CONSOLE MESSAGE
    ===================================================== */

    console.log(
        "%cZohaib Nazir - Portfolio",
        "font-size:20px;font-weight:bold;"
    );

    console.log(
        "%cAI Developer & Web Developer & Video Editor",
        "font-size:12px;"
    );

});
