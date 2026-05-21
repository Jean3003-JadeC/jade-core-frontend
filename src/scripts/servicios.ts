/**
 * ==========================================================================
 * JADE CORE - MÓDULO SERVICIOS (Namespace Pattern)
 * ==========================================================================
 * Arquitectura de software de alta precisión para el control de la interfaz 
 * de servicios, menú responsive analítico y efectos transicionales clínicos.
 */

const JadeCoreServicios = {
    
    /**
     * Capa de Abstracción del DOM (Centralización de Selectores)
     */
    DOM: {
        header: '#mainHeader',
        nav: '#mainNav',
        navToggle: '.mobile-nav-toggle',
        cards: '.service-card',
        container: '.services-grid-container'
    },

    /**
     * Estado Interno Encapsulado del Módulo
     */
    state: {
        isHeaderSticky: false,
        isNavActive: false,
        activeServiceId: null as string | null
    },

    /**
     * Método Inicializador Único de la Capa de Comportamiento
     */
    init: function() {
        // Garantizar la ejecución únicamente cuando el árbol del DOM esté construido
        document.addEventListener('DOMContentLoaded', () => {
            this.bindEvents();
            this.initSequentialFadeIn();
        });
    },

    /**
     * Registro Centralizado de Manejadores de Eventos (Capa de Conectividad)
     */
    bindEvents: function() {
        // Control del Scroll para el Sticky Header
        window.addEventListener('scroll', () => this.handleScroll());

        // Control del Menú Desplegable Móvil
        const toggleBtn = document.querySelector(this.DOM.navToggle);
        if (toggleBtn) {
            toggleBtn.addEventListener('click', () => this.handleNavToggle());
        }

        // Control Analítico de Interacción en Tarjetas Clínicas
        const cards = document.querySelectorAll(this.DOM.cards);
        cards.forEach(card => {
            card.addEventListener('mouseenter', (e: Event) => this.handleCardFocus(e));
            card.addEventListener('mouseleave', () => this.handleCardBlur());
        });
    },

    /**
     * Gestión Optimizada del Estado del Header en Scroll
     */
    handleScroll: function() {
        const header = document.querySelector(this.DOM.header) as HTMLElement | null;
        if (!header) return;

        const scrollThreshold = 50;
        const currentScroll = window.scrollY;

        if (currentScroll > scrollThreshold && !this.state.isHeaderSticky) {
            header.classList.add('header-scrolled');
            header.style.boxShadow = '0 4px 20px rgba(74, 77, 80, 0.08)';
            this.state.isHeaderSticky = true;
        } else if (currentScroll <= scrollThreshold && this.state.isHeaderSticky) {
            header.classList.remove('header-scrolled');
            header.style.boxShadow = 'none';
            this.state.isHeaderSticky = false;
        }
    },

    /**
     * Control del Menú Móvil Adaptable e Indicadores A11y
     */
    handleNavToggle: function() {
        const nav = document.querySelector(this.DOM.nav);
        const toggleBtn = document.querySelector(this.DOM.navToggle);
        
        if (!nav || !toggleBtn) return;

        // Inversión atómica del estado lógico
        this.state.isNavActive = !this.state.isNavActive;

        if (this.state.isNavActive) {
            nav.classList.add('nav-active');
            toggleBtn.setAttribute('aria-expanded', 'true');
        } else {
            nav.classList.remove('nav-active');
            toggleBtn.setAttribute('aria-expanded', 'false');
        }
    },

    /**
     * Carga Cascada Elegante para Componentes Clínicos
     */
    initSequentialFadeIn: function() {
        const cards = document.querySelectorAll(this.DOM.cards);
        if (!cards.length) return;

        // Inyección de estados de transición controlados por hardware castéandolos a HTMLElement
        cards.forEach((card, index) => {
            const htmlCard = card as HTMLElement;
            htmlCard.style.opacity = '0';
            htmlCard.style.transform = 'translateY(24px)';
            htmlCard.style.transition = 'opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1), transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            
            // Renderizado secuencial con retraso incremental (150ms)
            setTimeout(() => {
                htmlCard.style.opacity = '1';
                htmlCard.style.transform = 'translateY(0)';
            }, index * 150);
        });
    },

    /**
     * Registro de Entrada de Enfoque en Servicios
     */
    handleCardFocus: function(event: Event) {
        const currentTarget = event.currentTarget as HTMLElement;
        if (currentTarget) {
            this.state.activeServiceId = currentTarget.id;
        }
    },

    /**
     * Restauración del Estado de Enfoque
     */
    handleCardBlur: function() {
        this.state.activeServiceId = null;
    }
};

// Congelar el Namespace para asegurar la inmutabilidad y mitigar mutaciones externas
Object.freeze(JadeCoreServicios);

// Inicialización controlada del módulo de forma segura
JadeCoreServicios.init();