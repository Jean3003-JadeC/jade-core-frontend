/**
 * ==========================================================================
 * JADE CORE - MASTER ENGINE (main.ts)
 * Orquestador Global de la Landing Page (index.html)
 * ==========================================================================
 */

// 1. IMPORTACIÓN DIRECTA DEL CEREBRO
// Garantiza que la UI (menú móvil) y validaciones funcionen independientemente 
// de la sección en la que el usuario aterrice al cargar la página.
import { JadeCoreHome } from './scripts/home';

document.addEventListener('DOMContentLoaded', () => {

    // INICIALIZACIÓN DE INTERFAZ HOME (Garantiza existencia del DOM)
    // =========================================================
    JadeCoreHome.init();

    // =========================================================
    // 2. LÓGICA DEL HEADER (Scroll Reactivo)
    // =========================================================
    const header = document.getElementById('mainHeader');
    if (header) {
        window.addEventListener('scroll', () => {
            header.classList.toggle('scrolled', window.scrollY > 50);
        }, { passive: true });
    }

    // =========================================================
    // 3. LÓGICA DE SECCIONES (Scroll Spy & Ahorro de Recursos)
    // =========================================================
    const sections = document.querySelectorAll<HTMLElement>('section');
    const navLinks = document.querySelectorAll<HTMLAnchorElement>('.nav-menu__link');

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
    // 4. ANIMACIONES DE REVELACIÓN (Aparición por Hardware)
    // =========================================================
    const animatedElements = document.querySelectorAll('.pillar-card, .ecosystem-card, .resource-card');

    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                animationObserver.unobserve(entry.target); 
            }
        });
    }, {
        root: null,
        threshold: 0.1, 
        rootMargin: "0px 0px -50px 0px"
    });

    animatedElements.forEach(el => animationObserver.observe(el));
    
    console.log('%c🌐 [Jade Core Master Engine]: Ready & Optimized.', 'color: #4B9F86; font-weight: bold;');
});