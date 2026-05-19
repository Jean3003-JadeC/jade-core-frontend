/**
 * ==========================================================================
 * JADE CORE - MÓDULO 8: LEGAL Y PRIVACIDAD
 * Patrón de Arquitectura: Namespace Pattern
 * Componentes: Sistema de ScrollSpy Autónomo, Gestión de Consentimiento Informado
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

    // 2. CACHE DEL DOM
    dom: {},

    initSelectors: function() {
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
        if (this.dom.form) {
            this.loadStoredConsent();
            this.registerEvents();
            this.initScrollSpy();
        }
    },

    // 4. REGISTRO DE EVENTOS (EVENT BINDING)
    registerEvents: function() {
        this.dom.form.addEventListener('submit', (e) => this.handleConsentSubmit(e));
        this.dom.btnRevoke.addEventListener('click', () => this.handleConsentRevocation());
        
        // Limpieza de estados de error dinámicos
        [this.dom.chkTerms, this.dom.chkData].forEach(checkbox => {
            checkbox.addEventListener('change', (e) => this.clearFieldError(e.target));
        });

        // Sincronización nativa de ScrollSpy en el evento de scroll general
        window.addEventListener('scroll', () => this.runScrollSpy());
    },

    // 5. MOTOR SCROLLSPY (DETECCIÓN DE SECCIÓN ACTIVA)
    runScrollSpy: function() {
        let currentSectionId = '';
        const scrollPosition = window.scrollY + 100; // Offset para mejorar la precisión del trigger visual

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

    // Ejecución inicial preventiva por si el usuario recarga la página en una sección intermedia
    initScrollSpy: function() {
        this.runScrollSpy();
    },

    // 6. LOGICA DE PERSISTENCIA (LOCALSTORAGE SANITIZADO)
    loadStoredConsent: function() {
        const localData = localStorage.getItem('JadeCore_Consent_Manifest');
        if (localData) {
            try {
                const parsed = JSON.parse(localData);
                this.state = { ...this.state, ...parsed };
                
                // Reflejar estado persistido directamente en los elementos del DOM
                this.dom.chkTerms.checked = this.state.hasAcceptedTerms;
                this.dom.chkData.checked = this.state.hasAcceptedDataProcessing;
                this.dom.chkAI.checked = this.state.hasAcceptedAIModelTraining;
            } catch (error) {
                console.error("Error en la lectura del manifiesto de consentimiento seguro:", error);
            }
        }
    },

    // 7. CONTROLADOR DE ENVÍO Y VALIDACIÓN REGULATORIA
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
            
            alert('Preferencias de Consentimiento Actualizadas.\nEl manifiesto legal ha sido registrado y encriptado en su sesión local.');
        }
    },

    // 8. REVOCACIÓN TOTAL DE PERMISOS (DERECHOS ARCO)
    handleConsentRevocation: function() {
        const confirmRevoke = confirm(
            'ADVERTENCIA DE SEGURIDAD CLÍNICA:\n\n' +
            'Al revocar los permisos generales, se suspenderá de forma inmediata el acceso automatizado a su Portal del Paciente, interconsultas de telemedicina y la generación de métricas de soporte renal.\n\n' +
            '¿Desea ejercer su derecho de revocación de tratamiento de datos?'
        );

        if (confirmRevoke) {
            // Reset de estados
            this.state.hasAcceptedTerms = false;
            this.state.hasAcceptedDataProcessing = false;
            this.state.hasAcceptedAIModelTraining = false;

            localStorage.removeItem('JadeCore_Consent_Manifest');
            this.dom.form.reset();
            
            alert('Permisos revocados con éxito. Se han purgado los registros de consentimiento del cliente.');
        }
    },

    // Manejo de Errores Visuales
    setFieldError: function(element, message) {
        const errorSpan = document.getElementById(`error-${element.id}`);
        if (errorSpan) {
            errorSpan.textContent = message;
        }
    },

    clearFieldError: function(element) {
        const errorSpan = document.getElementById(`error-${element.id}`);
        if (errorSpan) {
            errorSpan.textContent = '';
        }
    }
};

// Inicialización del script cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    JadeCoreLegal.init();
});