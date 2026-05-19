/**
 * ==========================================================================
 * COMPONENTE JAVASCRIPT: RECURSOS Y EVIDENCIA - JADE CORE
 * Patrón de Diseño: Namespace Computacional Seguro (Aislado)
 * Alcance: Control de renderizado, filtrado reactivo, transiciones analíticas 
 *          y gestión del menú adaptativo (UI/UX).
 * ==========================================================================
 */

// Declaración del Namespace Institucional unificado
var JadeCore = JadeCore || {};

JadeCore.ResourcesModule = (function () {
    'use strict';

    // --- CONTEXTO Y SELECTORES PRIVADOS DEL MÓDULO (AUDITADOS) ---
    const DOM = {
        filters: document.querySelectorAll('.filter-btn'),
        cards: document.querySelectorAll('.resource-card'),
        grid: document.querySelector('.resources-grid'),
        navToggle: document.querySelector('.mobile-nav-toggle'),
        navigation: document.querySelector('.main-navigation')
    };

    /**
     * Inicializa el observador de intersección nativo (IntersectionObserver)
     * para manejar efectos de revelado clínico sutiles en la carga y scroll.
     */
    const _initScrollAnimations = function () {
        if (!('IntersectionObserver' in window)) {
            // Fallback inmediato para navegadores legacy sin soporte analítico
            DOM.cards.forEach(card => card.classList.add('fade-in'));
            return;
        }

        const observerOptions = {
            root: null, // Ventana gráfica (Viewport)
            rootMargin: '0px 0px -50px 0px', // Disparo anticipado antes de la entrada total
            threshold: 0.15 // 15% del componente visible en pantalla
        };

        const cardObserver = new IntersectionObserver(function (entries, observer) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const card = entry.target;
                    card.classList.add('fade-in');
                    // Una vez revelado, se remueve el nodo del pipeline del observador
                    observer.unobserve(card);
                }
            });
        }, observerOptions);

        DOM.cards.forEach(card => cardObserver.observe(card));
    };

    /**
     * Gestiona la lógica transaccional de filtrado sobre el DOM.
     * @param {string} targetCategory - Categoría seleccionada por el usuario.
     */
    const _filterRepository = function (targetCategory) {
        DOM.cards.forEach(card => {
            const cardCategory = card.getAttribute('data-category');

            // Lógica de visualización adaptativa y síncrona
            if (targetCategory === 'all' || cardCategory === targetCategory) {
                card.style.display = 'flex';
                // Retardo forzado para inyectar la animación CSS de forma fluida
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 10);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(10px)';
                card.style.display = 'none';
            }
        });
    };

    /**
     * Controla el despliegue del menú de navegación en dispositivos móviles
     * y actualiza de forma síncrona los estados de accesibilidad ARIA.
     */
    const _toggleMobileNavigation = function () {
        if (!DOM.navToggle || !DOM.navigation) return;

        const isExpanded = DOM.navToggle.getAttribute('aria-expanded') === 'true';
        
        // Mutación de estados semánticos y visuales
        DOM.navToggle.setAttribute('aria-expanded', !isExpanded);
        DOM.navigation.classList.toggle('nav-active');
    };

    /**
     * Orquesta y vincula los manejadores de eventos funcionales en la UI.
     */
    const _bindEvents = function () {
        // Evento 1: Control de Menú de Navegación Móvil
        if (DOM.navToggle) {
            DOM.navToggle.addEventListener('click', function (e) {
                e.stopPropagation();
                _toggleMobileNavigation();
            });
        }

        // Cierre automático del menú móvil al hacer clic fuera del contenedor (UX)
        document.addEventListener('click', function (e) {
            if (DOM.navigation && DOM.navigation.classList.contains('nav-active')) {
                if (!DOM.navigation.contains(e.target) && !DOM.navToggle.contains(e.target)) {
                    _toggleMobileNavigation();
                }
            }
        });

        // Evento 2: Control de Filtros del Repositorio Clínico
        DOM.filters.forEach(button => {
            button.addEventListener('click', function (e) {
                e.preventDefault();

                // Validación de redundancia operativa
                if (this.classList.contains('active')) return;

                // Actualización semántica del estado de los botones (Accesibilidad ARIA)
                DOM.filters.forEach(btn => {
                    btn.classList.remove('active');
                    btn.setAttribute('aria-selected', 'false');
                });

                this.classList.add('active');
                this.setAttribute('aria-selected', 'true');

                // Ejecución del algoritmo de filtrado analítico
                const selectedFilter = this.getAttribute('data-filter');
                _filterRepository(selectedFilter);
            });
        });
    };

    // --- INTERFAZ PÚBLICA EXCLUSIVA (API DEL MÓDULO) ---
    return {
        init: function () {
            _initScrollAnimations();
            _bindEvents();
        }
    };

})();

// Inicialización controlada una vez que la estructura del DOM está completamente parseada
document.addEventListener('DOMContentLoaded', function () {
    JadeCore.ResourcesModule.init();
});