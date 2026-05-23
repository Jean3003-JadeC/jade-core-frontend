import './styles/home.css';

document.addEventListener('DOMContentLoaded', () => {
    // =========================================================
    // 1. LÓGICA DEL HEADER (Scroll)
    // =========================================================
    const header = document.getElementById('mainHeader');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // =========================================================
    // 2. LÓGICA DE SECCIONES (Intersection Observer)
    // =========================================================
    const sections = document.querySelectorAll<HTMLElement>('section');
    const navLinks = document.querySelectorAll<HTMLAnchorElement>('.nav-menu__link');
    const loadedModules = new Set<string>();

    const observerOptions: IntersectionObserverInit = {
        root: null,
        threshold: 0.15
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            const id = entry.target.getAttribute('id');
            if (!id) return;

            if (entry.isIntersecting) {
                navLinks.forEach((link) => {
                    const href = link.getAttribute('href');
                    if (href === `#${id}`) {
                        link.classList.add('is-active');
                        link.setAttribute('aria-current', 'page');
                    } else {
                        link.classList.remove('is-active');
                        link.removeAttribute('aria-current');
                    }
                });

                if (!loadedModules.has(id)) {
                    switch (id) {
                        case 'home':
                            import('./scripts/home').then(() => console.log('🏠 [Jade Core]: Módulo Home listo.'));
                            break;
                        // ... (tus otros case) ...
                        case 'contacto':
                            import('./scripts/contacto').then(() => console.log('📊 [Jade Core]: Módulo Contacto listo.'));
                            break;
                    }
                    loadedModules.add(id);
                }
            }

            const video = entry.target.querySelector<HTMLVideoElement>('video');
            if (video) {
                if (entry.isIntersecting) {
                    video.play().catch(() => {});
                } else {
                    video.pause();
                }
            }
        });
    }, observerOptions);

    sections.forEach(section => sectionObserver.observe(section));

    // =========================================================
    // 3. ANIMACIONES DE REVELACIÓN (Aparición fluida)
    // =========================================================
    // Seleccionamos las tarjetas que queremos animar
    const animatedElements = document.querySelectorAll('.pillar-card, .ecosystem-card, .resource-card');

    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                // Añade la clase que dispara el CSS
                entry.target.classList.add('is-visible');
                
                // Dejamos de observar el elemento para que la animación solo ocurra la primera vez
                animationObserver.unobserve(entry.target); 
            }
        });
    }, {
        root: null,
        threshold: 0.1, // Se activa cuando el 10% de la tarjeta es visible
        rootMargin: "0px 0px -50px 0px" // Margen para que se anime un poco antes de llegar al centro
    });

    animatedElements.forEach(el => animationObserver.observe(el));
    
    // =========================================================
    console.log('%c🌐 [Jade Core Master Engine]: Ready.', 'color: #4B9F86; font-weight: bold;');
});