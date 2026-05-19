/**
 * ==========================================================================
 * JADE CORE - MÓDULO 8: LEGAL Y PRIVACIDAD
 * Patrón de Arquitectura: Namespace Pattern (Producción Core)
 * Componentes: Menú Responsive UI, ScrollSpy Autónomo, Consentimiento Informado
 * ==========================================================================
 */

const JadeCoreLegal = {
    // 1. ESTADO INTERNO DE COMPLIANCE (STATE MANAGEMENT)
    state: {
        hasAcceptedTerms: false,
        hasAcceptedDataProcessing: false,
        hasAcceptedAIModelTraining: false,
        lastUpdate: '2026-05-18'
    },

    // 2. CACHE DEL DOM (DOM SELECTORS)
    dom: {},

    initSelectors: function() {
        // Selectores de Infraestructura Global (Navbar Móvil)
        this.dom.navToggle = document.querySelector('.mobile-nav-toggle');
        this.dom.navMenu = document.querySelector('.nav-menu');

        // Selectores del Formulario Regulatorio
        this.dom.form = document.getElementById('legalForm');
        this.dom.chkTerms = document.getElementById('chkTerms');
        this.dom.chkData = document.getElementById('chkData');
        this.dom.chkAI = document.getElementById('chkAI');
        this.dom.btnRevoke = document.getElementById('btnRevokeConsent');
        
        // Selectores para ScrollSpy e Interfaz
        this.dom.navLinks = document.querySelectorAll('.legal-nav__link');
        this.dom.sections = document.querySelectorAll('.legal-card');
    },

    // 3. PUNTO DE ENTRADA (ENTRY POINT)
    init: function() {
        this.initSelectors();
        this.loadStoredConsent();
        this.registerEvents();
        this.initScrollSpy();
    },

    // 4. REGISTRO DE EVENTOS (EVENT BINDING)
    registerEvents: function() {
        // Evento de Interfaz: Menú Adaptativo
        if (this.dom.navToggle && this.dom.navMenu) {
            this.dom.navToggle.addEventListener('click', () => this.handleMenuToggle());
        }

        // Eventos del Formulario de Consentimiento
        if (this.dom.form) {
            this.dom.form.addEventListener('submit', (e) => this.handleConsentSubmit(e));
        }
        if (this.dom.btnRevoke) {
            this.dom.btnRevoke.addEventListener('click', () => this.handleConsentRevocation());
        }
        
        // Limpieza de estados de error dinámicos
        const checkboxes = [this.dom.chkTerms, this.dom.chkData];
        checkboxes.forEach(checkbox => {
            if (checkbox) {
                checkbox.addEventListener('change', (e) => this.clearFieldError(e.target));
            }
        });

        // Sincronización de ScrollSpy en tiempo de ejecución
        window.addEventListener('scroll', () => this.runScrollSpy());
    },

    // 5. CONTROLADOR DEL MENÚ RESPONSIVE INTERACTIVO
    handleMenuToggle: function() {
        const isOpen = this.dom.navMenu.classList.contains('nav-active');
        
        if (isOpen) {
            this.dom.navMenu.classList.remove('nav-active');
            this.dom.navToggle.classList.remove('nav-active');
            this.dom.navToggle.setAttribute('aria-expanded', 'false');
        } else {
            this.dom.navMenu.classList.add('nav-active');
            this.dom.navToggle.classList.add('nav-active');
            this.dom.navToggle.setAttribute('aria-expanded', 'true');
        }
    },

    // 6. MOTOR SCROLLSPY (DETECCIÓN DE SECCIÓN ACTIVA EN LECTURA)
    runScrollSpy: function() {
        let currentSectionId = '';
        // Offset de precisión compensatorio por la altura del Navbar Fijo (80px) + margen prudencial
        const scrollPosition = window.scrollY + 120; 

        this.dom.sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        if (currentSectionId) {
            this.dom.navLinks.forEach(link => {
                link.classList.remove('is-active');
                if (link.getAttribute('href') === `#${currentSectionId}`) {
                    link.classList.add('is-active');
                }
            });
        }
    },

    initScrollSpy: function() {
        this.runScrollSpy();
    },

    // 7. LÓGICA DE PERSISTENCIA (LOCALSTORAGE SANITIZADO)
    loadStoredConsent: function() {
        const localData = localStorage.getItem('JadeCore_Consent_Manifest');
        if (localData) {
            try {
                const parsed = JSON.parse(localData);
                this.state = { ...this.state, ...parsed };
                
                // Sincronizar UI con el estado recuperado
                if (this.dom.chkTerms) this.dom.chkTerms.checked = this.state.hasAcceptedTerms;
                if (this.dom.chkData) this.dom.chkData.checked = this.state.hasAcceptedDataProcessing;
                if (this.dom.chkAI) this.dom.chkAI.checked = this.state.hasAcceptedAIModelTraining;
            } catch (error) {
                console.error("Error en la lectura del manifiesto de consentimiento seguro:", error);
            }
        }
    },

    // 8. CONTROLADOR DE ENVÍO Y VALIDACIÓN REGULATORIA
    handleConsentSubmit: function(event) {
        event.preventDefault();
        let isFormValid = true;

        // Validación imperativa de términos generales
        if (!this.dom.chkTerms.checked) {
            this.setFieldError(this.dom.chkTerms, 'Debe aceptar los Términos y Condiciones corporativos para continuar.');
            isFormValid = false;
        }

        // Validación imperativa de tratamiento de información clínica
        if (!this.dom.chkData.checked) {
            this.setFieldError(this.dom.chkData, 'Se requiere su autorización explícita para procesar datos de salud.');
            isFormValid = false;
        }

        if (isFormValid) {
            // Sincronizar el DOM con el estado lógico
            this.state.hasAcceptedTerms = this.dom.chkTerms.checked;
            this.state.hasAcceptedDataProcessing = this.dom.chkData.checked;
            this.state.hasAcceptedAIModelTraining = this.dom.chkAI.checked;

            // Almacenamiento seguro del manifiesto normativo
            localStorage.setItem('JadeCore_Consent_Manifest', JSON.stringify(this.state));
            
            alert('Preferencias de Consentimiento Actualizadas.\nEl manifiesto legal ha sido registrado y guardado de manera segura.');
        }
    },

    // 9. REVOCACIÓN TOTAL DE PERMISOS (DERECHOS ARCO)
    handleConsentRevocation: function() {
        const confirmRevoke = confirm(
            'ADVERTENCIA DE SEGURIDAD CLÍNICA:\n\n' +
            'Al revocar los permisos generales, se suspenderá de forma inmediata el acceso automatizado a su App del Paciente, interconsultas de telemedicina y la generación de métricas de soporte renal.\n\n' +
            '¿Desea ejercer su derecho de revocación de tratamiento de datos?'
        );

        if (confirmRevoke) {
            this.state.hasAcceptedTerms = false;
            this.state.hasAcceptedDataProcessing = false;
            this.state.hasAcceptedAIModelTraining = false;

            localStorage.removeItem('JadeCore_Consent_Manifest');
            this.dom.form.reset();
            
            alert('Permisos revocados con éxito. Se han purgado los registros de consentimiento locales.');
        }
    },

    // Manejo de Interfaces de Error
    setFieldError: function(element, message) {
        if (!element) return;
        const errorSpan = document.getElementById(`error-${element.id}`);
        if (errorSpan) {
            errorSpan.textContent = message;
        }
    },

    clearFieldError: function(element) {
        if (!element) return;
        const errorSpan = document.getElementById(`error-${element.id}`);
        if (errorSpan) {
            errorSpan.textContent = '';
        }
    }
};

// Inicialización del módulo una vez cargado el árbol DOM
document.addEventListener('DOMContentLoaded', () => {
    JadeCoreLegal.init();
});