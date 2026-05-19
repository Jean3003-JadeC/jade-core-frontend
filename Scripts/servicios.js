/**
 * ==========================================================================
 * JADE CORE - MÓDULO SERVICIOS (Namespace Pattern)
 * ==========================================================================
 * Arquitectura de código limpia para la gestión de efectos interactivos,
 * Sticky Header y cargas secuenciales estructuradas.
 */

// Declaración del Namespace para el módulo de servicios
const JadeCoreServices = {
    
    // Configuración de selectores reutilizables
    selectors: {
        header: '#mainHeader',
        cards: '.service-card',
        container: '.services-grid-container'
    },

    // Estado interno del módulo si fuera necesario escalar
    state: {
        isHeaderSticky: false,
        activeService: null
    },

    /**
     * Método inicializador del módulo
     */
    init: function() {
        // Ejecutar tareas una vez que el DOM esté completamente listo
        document.addEventListener('DOMContentLoaded', () => {
            this.initStickyHeader();
            this.initSequentialFadeIn();
            this.initInteractivity();
        });
    },

    /**
     * Control del Sticky Header con optimización de rendimiento
     */
    initStickyHeader: function() {
        const header = document.querySelector(this.selectors.header);
        if (!header) return;

        const scrollThreshold = 50;

        window.addEventListener('scroll', () => {
            const currentScroll = window.scrollY;

            if (currentScroll > scrollThreshold && !this.state.isHeaderSticky) {
                header.classList.add('header-scrolled');
                // Ajuste sutil de diseño mediante JS si es necesario
                header.style.boxShadow = '0 4px 20px rgba(74, 77, 80, 0.1)';
                this.state.isHeaderSticky = true;
            } else if (currentScroll <= scrollThreshold && this.state.isHeaderSticky) {
                header.classList.remove('header-scrolled');
                header.style.boxShadow = 'none';
                this.state.isHeaderSticky = false;
            }
        });
    },

    /**
     * Carga secuencial y elegante de las tarjetas de servicios (Efecto clínico/limpio)
     */
    initSequentialFadeIn: function() {
        const cards = document.querySelectorAll(this.selectors.cards);
        if (!cards.length) return;

        // Configuramos los estilos iniciales de opacidad mediante JS 
        // para asegurar la accesibilidad si el JS está desactivado.
        cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s cubic-bezier(0.25, 0.8, 0.25, 1)';
            
            // Disparo secuencial controlado (efecto cascada sutil)
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 150); // 150ms de retraso entre cada tarjeta
        });
    },

    /**
     * Interactividad interna de las tarjetas para futuras expansiones de datos
     */
    initInteractivity: function() {
        const cards = document.querySelectorAll(this.selectors.cards);
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', (e) => {
                this.state.activeService = e.currentTarget.id;
                // Aquí se pueden disparar logs analíticos internos si fuera necesario
            });

            card.addEventListener('mouseleave', () => {
                this.state.activeService = null;
            });
        });
    }
};

// Congelar el objeto del Namespace para asegurar la inmutabilidad del patrón
Object.freeze(JadeCoreServices);

// Ejecución única de la inicialización del módulo
JadeCoreServices.init();