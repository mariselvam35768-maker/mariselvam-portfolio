document.addEventListener('DOMContentLoaded', () => {
    // Register GSAP Plugins
    gsap.registerPlugin(ScrollTrigger);

    // 1. Background Canvas Animation (Data Network)
    const canvas = document.getElementById('bg-canvas');
    const ctx = canvas.getContext('2d');
    let particles = [];
    const particleCount = 60;

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    class Particle {
        constructor() {
            this.init();
        }

        init() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.size = Math.random() * 2;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(0, 242, 254, 0.3)';
            ctx.fill();
        }
    }

    function initParticles() {
        particles = [];
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach((p, index) => {
            p.update();
            p.draw();

            for (let j = index + 1; j < particles.length; j++) {
                const p2 = particles[j];
                const dx = p.x - p2.x;
                const dy = p.y - p2.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 150) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(0, 242, 254, ${0.15 * (1 - dist / 150)})`;
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.stroke();
                }
            }
        });
        requestAnimationFrame(animate);
    }

    window.addEventListener('resize', () => {
        resize();
        initParticles();
    });

    resize();
    initParticles();
    animate();

    // 2. Cursor Follower
    const cursor = document.querySelector('.cursor-follower');
    document.addEventListener('mousemove', (e) => {
        gsap.to(cursor, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.1,
            ease: "power2.out"
        });
    });

    // 3. Hero Section Animations
    const heroTl = gsap.timeline();
    heroTl.from(".glass-nav", { y: -30, opacity: 0, duration: 0.6, ease: "power3.out" })
          .from(".role-badge, .hero-status-badge", { 
              y: -15, 
              opacity: 0, 
              stagger: 0.1,
              duration: 0.5, 
              ease: "power2.out" 
          }, "-=0.3")
          .from(".hero h1 span", { 
              y: 30, 
              opacity: 0, 
              duration: 0.8, 
              ease: "power3.out"
          }, "-=0.3")
          .from(".typing-container", { 
              y: 20, 
              opacity: 0, 
              duration: 0.6, 
              ease: "power2.out" 
          }, "-=0.4")
          .from(".hero p", { y: 20, opacity: 0, duration: 0.6, ease: "power2.out" }, "-=0.4")
          .from(".hero-skills, .resume-bar, .hero-socials, .hero-btns", { 
              y: 15, 
              opacity: 0, 
              stagger: 0.08, 
              duration: 0.6, 
              ease: "power2.out" 
          }, "-=0.4")
          .from(".dashboard-card", { 
              x: 30, 
              scale: 0.95, 
              opacity: 0, 
              duration: 0.8, 
              ease: "power3.out" 
          }, "-=0.8");




    // 4. Scroll Reveal Animations
    const sectionTitles = document.querySelectorAll('.section-title');
    sectionTitles.forEach(title => {
        gsap.from(title, {
            scrollTrigger: {
                trigger: title,
                start: "top 85%",
                toggleActions: "play none none reverse"
            },
            y: 40,
            opacity: 0,
            duration: 1,
            ease: "power4.out"
        });
    });

    // 5. About Section reveal
    gsap.from(".about-text p", {
        scrollTrigger: {
            trigger: ".about-text",
            start: "top 80%"
        },
        x: -40,
        opacity: 0,
        stagger: 0.2,
        duration: 1,
        ease: "power3.out"
    });

    gsap.from(".timeline-item", {
        scrollTrigger: {
            trigger: ".education-timeline",
            start: "top 80%"
        },
        x: 40,
        opacity: 0,
        stagger: 0.3,
        duration: 1,
        ease: "power3.out"
    });

    // 6. Interactive Skill Cards
    gsap.utils.toArray(".skill-card").forEach((card, i) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: "top 90%",
                toggleActions: "play none none none"
            },
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out",
            delay: (i % 3) * 0.1
        });

        // Hover effect using GSAP
        card.addEventListener('mouseenter', () => {
            gsap.to(card, { y: -10, scale: 1.05, duration: 0.4, ease: "power2.out" });
        });
        card.addEventListener('mouseleave', () => {
            gsap.to(card, { y: 0, scale: 1, duration: 0.4, ease: "power2.out" });
        });
    });

    // 7. Project Cards Reveal
    gsap.utils.toArray(".project-card").forEach((card, i) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: "top 85%"
            },
            y: 50,
            opacity: 0,
            duration: 1,
            ease: "expo.out",
            delay: (i % 2) * 0.2
        });
    });

    // 8. Nav Background Color Change on Scroll
    const nav = document.querySelector('.glass-nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // 9. Typewriter Animation (Dynamic Roles)
    const typedTextSpan = document.querySelector(".typed-text");
    const cursorSpan = document.querySelector(".cursor");

    const textArray = ["Data Analyst", "Python Developer", "Full Stack Developer"];
    const typingDelay = 100;
    const erasingDelay = 60;
    const newTextDelay = 2000; // 2 seconds delay between texts
    let textArrayIndex = 0;
    let charIndex = 0;

    function type() {
        if (charIndex < textArray[textArrayIndex].length) {
            if (!cursorSpan.classList.contains("typing")) {
                cursorSpan.classList.add("typing");
            }
            typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, typingDelay);
        } else {
            cursorSpan.classList.remove("typing");
            setTimeout(erase, newTextDelay);
        }
    }

    function erase() {
        if (charIndex > 0) {
            if (!cursorSpan.classList.contains("typing")) {
                cursorSpan.classList.add("typing");
            }
            typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(erase, erasingDelay);
        } else {
            cursorSpan.classList.remove("typing");
            textArrayIndex++;
            if (textArrayIndex >= textArray.length) {
                textArrayIndex = 0;
            }
            setTimeout(type, typingDelay + 500);
        }
    }

    // Start typing after initial GSAP animation completes
    if (typedTextSpan) {
        setTimeout(type, 1800);
    }

    // Refresh ScrollTrigger
    ScrollTrigger.refresh();
});
