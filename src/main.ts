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
                // Actualizar enlaces de navegación activos de la landing
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

                // Carga dinámica exclusiva de los módulos de la landing
                if (!loadedModules.has(id)) {
                    switch (id) {
                        case 'home':
                            import('./scripts/home').then(() => console.log('🏠 [Jade Core]: Módulo Home listo.'));
                            break;
                        case 'nosotros':
                            import('./scripts/nosotros').then(() => console.log('🧬 [Jade Core]: Módulo Nosotros listo.'));
                            break;
                        case 'servicios':
                            import('./scripts/servicios').then(() => console.log('🔬 [Jade Core]: Módulo Servicios listo.'));
                            break;
                        case 'metodologia':
                            import('./scripts/metodologia').then(() => console.log('⚙️ [Jade Core]: Módulo Metodología listo.'));
                            break;
                        case 'recursos':
                            import('./scripts/recursos').then(() => console.log('📚 [Jade Core]: Módulo Recursos listo.'));
                            break;
                        case 'contacto':
                            import('./scripts/contacto').then(() => console.log('📊 [Jade Core]: Módulo Contacto listo.'));
                            break;
                    }
                    loadedModules.add(id);
                }
            }

            // Reproducción automática de videos en secciones activas
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
    
    console.log('%c🌐 [Jade Core Master Engine]: Ready.', 'color: #4B9F86; font-weight: bold;');
});