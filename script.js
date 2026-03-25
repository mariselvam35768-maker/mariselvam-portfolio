document.addEventListener('DOMContentLoaded', () => {
    // Register GSAP Plugins
    gsap.registerPlugin(ScrollTrigger);

    // 1. Cursor Follower
    const cursor = document.querySelector('.cursor-follower');
    document.addEventListener('mousemove', (e) => {
        gsap.to(cursor, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.1,
            ease: "power2.out"
        });
    });

    // 2. Hero Section Animations
    const heroTl = gsap.timeline();
    heroTl.from(".logo", { y: -20, opacity: 0, duration: 0.8, ease: "power3.out" })
          .from(".nav-links li", { y: -20, opacity: 0, stagger: 0.1, duration: 0.5 }, "-=0.4")
          .from(".hero h1 span", { opacity: 0, scale: 0.8, duration: 1, ease: "back.out(1.7)" })
          .from(".hero p", { y: 20, opacity: 0, duration: 0.8 }, "-=0.6")
          .from(".hero-btns .btn", { x: -20, opacity: 0, stagger: 0.2, duration: 0.8 }, "-=0.4");

    // 3. Scroll Reveal Animations
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        const title = section.querySelector('.section-title');
        
        if (title) {
            gsap.from(title, {
                scrollTrigger: {
                    trigger: title,
                    start: "top 90%",
                    toggleActions: "play none none reverse"
                },
                y: 30,
                opacity: 0,
                duration: 1,
                ease: "power3.out"
            });
        }
    });

    // 4. About Section - Text and Timeline
    gsap.from(".about-text p", {
        scrollTrigger: {
            trigger: ".about-text",
            start: "top 80%"
        },
        x: -50,
        opacity: 0,
        stagger: 0.3,
        duration: 1,
        ease: "power3.out"
    });

    gsap.from(".timeline-item", {
        scrollTrigger: {
            trigger: ".education-timeline",
            start: "top 80%"
        },
        x: 50,
        opacity: 0,
        stagger: 0.4,
        duration: 1,
        ease: "power3.out"
    });

    // 5. Skills Cards - Individual Reveal
    gsap.utils.toArray(".skill-card").forEach((card, i) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: "top bottom-=50",
                toggleActions: "play none none none"
            },
            scale: 0.8,
            opacity: 0,
            duration: 0.6,
            ease: "back.out(1.2)",
            delay: i % 3 * 0.1 // Small stagger based on row position
        });
    });

    // 6. Project Cards - Zoom In Stagger
    gsap.utils.toArray(".project-card").forEach((card, i) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: "top bottom-=50",
                toggleActions: "play none none none"
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
            delay: i % 2 * 0.1
        });
    });

    // Refresh ScrollTrigger after all initializations
    ScrollTrigger.refresh();

    // 7. Robust Fallback: Force visibility after 3 seconds if animations don't trigger
    setTimeout(() => {
        gsap.to(".skill-card, .project-card, .section-title, .about-text p, .timeline-item", { 
            opacity: 1, 
            scale: 1, 
            y: 0, 
            x: 0,
            duration: 0.5, 
            overwrite: 'auto',
            stagger: 0.05
        });
    }, 3000);

    // 8. Contact Info Reveal
    gsap.from(".contact-box", {
        scrollTrigger: {
            trigger: ".contact-box",
            start: "top 85%"
        },
        y: 40,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out"
    });

    // 8. Nav Background Color Change on Scroll
    window.addEventListener('scroll', () => {
        const nav = document.querySelector('.glass-nav');
        if (window.scrollY > 50) {
            nav.style.padding = "0.8rem 0";
            nav.style.backgroundColor = "rgba(15, 23, 42, 0.95)";
        } else {
            nav.style.padding = "1.2rem 0";
            nav.style.backgroundColor = "rgba(15, 23, 42, 0.8)";
        }
    });
});
