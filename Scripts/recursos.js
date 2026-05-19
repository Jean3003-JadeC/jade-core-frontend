/**
 * ==========================================================================
 * COMPONENTE JAVASCRIPT: RECURSOS Y EVIDENCIA - JADE CORE
 * Patrón de Diseño: Namespace Computacional Seguro
 * Alcance: Control de renderizado, filtrado reactivo y estados de la UI.
 * ==========================================================================
 */

// Declaración del Namespace Institucional si no existe en el ecosistema global
var JadeCore = JadeCore || {};

JadeCore.ResourcesModule = (function () {
    'use strict';

    // --- CONTEXTO Y SELECTORES PRIVADOS DEL MÓDULO ---
    const DOM = {
        filters: document.querySelectorAll('.filter-btn'),
        cards: document.querySelectorAll('.resource-card'),
        grid: document.querySelector('.resources-grid')
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

            // Lógica de visualización adaptativa
            if (targetCategory === 'all' || cardCategory === targetCategory) {
                // Restauramos la visibilidad estructural y aplicamos transición suave
                card.style.display = 'flex';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 10);
            } else {
                // Desvanecimiento y remoción del flujo del DOM
                card.style.opacity = '0';
                card.style.transform = 'translateY(10px)';
                card.style.display = 'none';
            }
        });
    };

    /**
     * Orquesta y vincula los manejadores de eventos funcionales en la UI.
     */
    const _bindEvents = function () {
        DOM.filters.forEach(button => {
            button.addEventListener('click', function (e) {
                e.preventDefault();

                // Validación de redundancia (Evita re-filtrar si ya está activo)
                if (this.classList.contains('active')) return;

                // Actualización semántica del estado de los botones (Accesibilidad ARIA)
                DOM.filters.forEach(btn => {
                    btn.classList.remove('active');
                    btn.setAttribute('aria-selected', 'false');
                });

                this.classList.add('active');
                this.setAttribute('aria-selected', 'true');

                // Ejecución del algoritmo de filtrado
                const selectedFilter = this.getAttribute('data-filter');
                _filterRepository(selectedFilter);
            });
        });
    };

    // --- INTERFAZ PÚBLICA EXCLUSIVA (API DEL MÓDULO) ---
    return {
        init: function () {
            // Inicialización de componentes internos blindados
            _initScrollAnimations();
            _bindEvents();
        }
    };

})();

// Ejecución segura una vez que la estructura del DOM está completamente parseada
document.addEventListener('DOMContentLoaded', function () {
    JadeCore.ResourcesModule.init();
});