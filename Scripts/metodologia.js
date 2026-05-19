/**
 * JADE CORE - MÓDULO 4: METODOLOGÍA Y TECNOLOGÍA
 * Arquitectura de Scripts Modulares (Pattern: Namespace)
 * © 2026 Jade Core. Todos los derechos reservados.
 */

var JadeCore = JadeCore || {};

JadeCore.MethodologyModule = (function () {
    'use strict';

    // ==========================================================================
    // Constantes y Selectores del DOM (Mapeo Clínico)
    // ==========================================================================
    const SELECTORS = {
        header: '#mainHeader',
        ecosystemCards: '.ecosystem-card',
        featureBlocks: '.feature-block',
        interactionFlows: '.interaction-flow'
    };

    const CLASSES = {
        headerSticky: 'header--sticky',
        elementVisible: 'is-visible',
        cardHighlight: 'card-highlighted'
    };

    // ==========================================================================
    // Métodos Privados (Lógica Operativa Interna)
    // ==========================================================================

    /**
     * Controla el comportamiento Sticky del Header simétricamente con otros módulos
     */
    const handleStickyHeader = function () {
        const header = document.querySelector(SELECTORS.header);
        if (!header) return;

        if (window.scrollY > 50) {
            header.classList.add(CLASSES.headerSticky);
        } else {
            header.classList.remove(CLASSES.headerSticky);
        }
    };

    /**
     * Inicializa las interacciones cruzadas en el Ecosistema.
     * Al hacer hover o focus en un área, resalta sutilmente su flujo relacional.
     */
    const initEcosystemInteractions = function () {
        const cards = document.querySelectorAll(SELECTORS.ecosystemCards);
        
        cards.forEach(card => {
            // Soporte para accesibilidad y navegación por teclado (Focus)
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
     * Implementa Intersection Observer para transiciones de carga asíncronas y limpias.
     * Mantiene la sobriedad y la estética corporativa sin recurrir a librerías pesadas.
     */
    const initScrollAnimations = function () {
        // Validación de soporte del navegador
        if (!('IntersectionObserver' in window)) {
            // Degradación aceptable: si el navegador es antiguo, muestra todo inmediatamente
            document.querySelectorAll(`${SELECTORS.ecosystemCards}, ${SELECTORS.featureBlocks}`).forEach(el => {
                el.style.opacity = '1';
                el.style.transform = 'none';
            });
            return;
        }

        const observerOptions = {
            root: null, // Viewport
            rootMargin: '0px',
            threshold: 0.15 // Se activa cuando el 15% del elemento es visible
        };

        const appearanceObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add(CLASSES.elementVisible);
                    observer.unobserve(entry.target); // Dejar de observar una vez ejecutado
                }
            });
        }, observerOptions);

        // Registrar elementos a observar
        const elementsToAnimate = document.querySelectorAll(`${SELECTORS.ecosystemCards}, ${SELECTORS.featureBlocks}`);
        elementsToAnimate.forEach(element => {
            // Preparación de estilos base inline previos a la inyección del CSS (opcional/seguridad)
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
            
            appearanceObserver.observe(element);
        });
    };

    // ==========================================================================
    // Métodos Públicos (Interfaz de Configuración del Namespace)
    // ==========================================================================
    return {
        init: function () {
            // Ejecución segura de listeners globales
            window.addEventListener('scroll', handleStickyHeader);
            
            // Inicialización de componentes internos
            initEcosystemInteractions();
            initScrollAnimations();
            
            // Primera ejecución de verificación del header por si recargan a mitad de página
            handleStickyHeader();
            
            console.log('Jade Core: Módulo de Metodología y Tecnología inicializado exitosamente.');
        }
    };

})();

// Inicialización segura una vez el DOM esté completamente estructurado y listo
document.addEventListener('DOMContentLoaded', function () {
    JadeCore.MethodologyModule.init();
});