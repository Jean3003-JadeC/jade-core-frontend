import { JadeCoreHome } from './scripts/home';

document.addEventListener('DOMContentLoaded', () => {

    // Inicialización de la interfaz Home
    JadeCoreHome.init();

    // Lógica del Header (Scroll reactivo)
    const header = document.getElementById('mainHeader');
    if (header) {
        window.addEventListener('scroll', () => {
            header.classList.toggle('scrolled', window.scrollY > 50);
        }, { passive: true });
    }

    // Lógica de Secciones (Scroll Spy y gestión de video)
    const sections = document.querySelectorAll<HTMLElement>('section');
    const navLinks = document.querySelectorAll<HTMLAnchorElement>('.nav-menu__link');

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
    }, { root: null, threshold: 0.15 });

    sections.forEach(section => sectionObserver.observe(section));

    // Animaciones de revelación al hacer scroll
    const animatedElements = document.querySelectorAll('.pillar-card, .ecosystem-card, .resource-card');

    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                animationObserver.unobserve(entry.target); 
            }
        });
    }, { root: null, threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

    animatedElements.forEach(el => animationObserver.observe(el));
    
    console.log('%c🌐 [Jade Core Master Engine]: Ready.', 'color: #4B9F86; font-weight: bold;');
});