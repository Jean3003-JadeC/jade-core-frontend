/**
 * JADE CORE - MÓDULO 4: METODOLOGÍA Y TECNOLOGÍA
 * Arquitectura de Scripts Modulares (Pattern: Namespace - Refactorizado)
 * Auditoría Técnica: Capa 3 - Control de Scope e Interacción Móvil Global
 * © 2026 Jade Core. Todos los derechos reservados.
 */

// 1. DECLARACIÓN DEL NAMESPACE GLOBAL COMPATIBLE CON TYPESCRIPT
interface JadeCoreNamespace {
    MethodologyModule?: {
        init: () => void;
    };
}

const JadeCore: JadeCoreNamespace = (window as any).JadeCore || {};
(window as any).JadeCore = JadeCore;

JadeCore.MethodologyModule = (function () {
    'use strict';

    // ==========================================================================
    // Centralización de Selectores y Clases de Control (DOM Mapping)
    // ==========================================================================
    const DOM = {
        header: '#mainHeader',
        nav: '#mainNav',
        navToggle: '#mobileNavToggle',
        ecosystemCards: '.ecosystem-card',
        featureBlocks: '.feature-block'
    };

    const CLASSES = {
        headerSticky: 'header--sticky',
        navActive: 'nav-active',
        toggleActive: 'toggle-active',
        elementVisible: 'is-visible',
        cardHighlight: 'card-highlighted'
    };

    // ==========================================================================
    // Métodos Privados (Lógica Operativa Interna)
    // ==========================================================================

    /**
     * Controla el comportamiento Sticky del Header síncronamente con el viewport
     */
    const handleStickyHeader = function () {
        const header = document.querySelector(DOM.header);
        if (!header) return;

        if (window.scrollY > 50) {
            header.classList.add(CLASSES.headerSticky);
        } else {
            header.classList.remove(CLASSES.headerSticky);
        }
    };

    /**
     * Gestiona la apertura, cierre y accesibilidad del Menú Responsive Móvil
     */
    const initMobileMenu = function () {
        const toggle = document.querySelector(DOM.navToggle) as HTMLElement;
        const nav = document.querySelector(DOM.nav) as HTMLElement;

        if (!toggle || !nav) return;

        toggle.addEventListener('click', function () {
            const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
            
            // Mutación de clases controladas por la Capa 2 (CSS)
            toggle.classList.toggle(CLASSES.toggleActive);
            nav.classList.toggle(CLASSES.navActive);
            
            // Actualización de estado semántico convertido explícitamente a texto
            toggle.setAttribute('aria-expanded', String(!isExpanded));
        });

        // Cierre automático si se hace click en un enlace interno (Navegación Intrapágina)
        const navLinks = nav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                toggle.classList.remove(CLASSES.toggleActive);
                nav.classList.remove(CLASSES.navActive);
                toggle.setAttribute('aria-expanded', 'false');
            });
        });
    };

    /**
     * Inicializa las interacciones cruzadas en la matriz del Ecosistema.
     * Habilita el soporte WCAG para navegación fluida por teclado.
     */
    const initEcosystemInteractions = function () {
        const cards = document.querySelectorAll(DOM.ecosystemCards);
        if (!cards.length) return;
        
        cards.forEach(card => {
            card.setAttribute('tabindex', '0');

            const triggerHighlight = () => card.classList.add(CLASSES.cardHighlight);
            const removeHighlight = () => card.classList.remove(CLASSES.cardHighlight);

            card.addEventListener('mouseenter', triggerHighlight);
            card.addEventListener('mouseleave', removeHighlight);
            card.addEventListener('focus', triggerHighlight);
            card.addEventListener('blur', removeHighlight);
        });
    };

    /**
     * Implementa Intersection Observer para efectos de carga asíncronos nativos
     */
    const initScrollAnimations = function () {
        const elementsToAnimate = document.querySelectorAll(`${DOM.ecosystemCards}, ${DOM.featureBlocks}`);
        if (!elementsToAnimate.length) return;

        if (!('IntersectionObserver' in window)) {
            // Degradación aceptable para navegadores sin soporte legacy casting a HTMLElement
            elementsToAnimate.forEach(el => {
                const htmlEl = el as HTMLElement;
                htmlEl.style.opacity = '1';
                htmlEl.style.transform = 'none';
            });
            return;
        }

        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.15
        };

        const appearanceObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add(CLASSES.elementVisible);
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        elementsToAnimate.forEach(element => {
            // Convertimos el elemento genérico a HTMLElement para poder acceder a la propiedad .style
            const htmlElement = element as HTMLElement;
            htmlElement.style.opacity = '0';
            htmlElement.style.transform = 'translateY(20px)';
            htmlElement.style.transition = 'opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1), transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            
            appearanceObserver.observe(htmlElement);
        });
    };

    /**
     * Centralización de Listeners y Vinculación de Eventos Globales
     */
    const bindEvents = function () {
        window.addEventListener('scroll', handleStickyHeader);
        // Ejecución inmediata preventiva por si el viewport inicia con scroll activo
        handleStickyHeader();
    };

    // ==========================================================================
    // Métodos Públicos (Exposición del Contenedor del Módulo)
    // ==========================================================================
    return {
        init: function () {
            bindEvents();
            initMobileMenu();
            initEcosystemInteractions();
            initScrollAnimations();
            
            console.log('Jade Core [Módulo Metodología]: Auditoría técnica aplicada. Ciclo de vida activo.');
        }
    };

})();

// Inicialización controlada una vez confirmada la construcción del DOM árbol
document.addEventListener('DOMContentLoaded', function () {
    if (JadeCore.MethodologyModule) {
        JadeCore.MethodologyModule.init();
    }
});