/**
 * ==========================================================================
 * JADE CORE - MÓDULO: HOME / NAVEGACIÓN GLOBAL (SPA Version)
 * Componentes: Menú Responsive Corporativo
 * ==========================================================================
 */

interface HomeDOM {
    navMenu?: HTMLElement | null;
    mobileToggle?: HTMLElement | null;
}

const JadeCoreHome = {
    // 1. SELECTORES DEL DOM
    dom: {} as HomeDOM,

    initSelectors: function() {
        // Mapeado a los IDs del nuevo header en index.html
        this.dom.mobileToggle = document.getElementById('mobileNavToggle');
        this.dom.navMenu = document.getElementById('mainNav');
    },

    // 2. ENTRY POINT
    init: function() {
        this.initSelectors();
        this.registerEvents();
        console.log('%c[Jade Core Node]: Módulo Home / UI Inicializado', 'color: #4B9F86;');
    },

    // 3. REGISTRO DE EVENTOS
    registerEvents: function() {
        if (this.dom.mobileToggle && this.dom.navMenu) {
            this.dom.mobileToggle.addEventListener('click', () => this.toggleMobileNavigation());
        }
    },

    // 4. CONTROLADOR DEL MENÚ RESPONSIVE
    toggleMobileNavigation: function() {
        if (!this.dom.mobileToggle || !this.dom.navMenu) return;

        // Alternar la clase 'is-active' según tu nuevo CSS
        const isOpen = this.dom.mobileToggle.classList.toggle('is-active');
        this.dom.navMenu.classList.toggle('is-active');
        
        // Mantener accesibilidad estricta
        this.dom.mobileToggle.setAttribute('aria-expanded', String(isOpen));
    }
};

// EJECUCIÓN DIRECTA: 
// Sin DOMContentLoaded, ya que main.ts importa este módulo dinámicamente
// cuando la sección #home es visible.
JadeCoreHome.init();