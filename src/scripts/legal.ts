/**
 * ==========================================================================
 * JADE CORE - MÓDULO LEGAL (legal.ts)
 * Sincronizado con legal.css y la arquitectura de Jade Core.
 * ==========================================================================
 */

import '../styles/legal.css';

const JadeCoreLegal = {
    dom: {
        navToggle: document.querySelector('.mobile-nav-toggle'),
        navMenu: document.querySelector('.nav-menu'),
        form: document.getElementById('legalForm') as HTMLFormElement,
        navLinks: document.querySelectorAll('.legal-nav__link'),
        sections: document.querySelectorAll('.legal-card')
    },

    init: function() {
        this.registerEvents();
        this.initScrollSpy();
        console.log('%c[Jade Core Node]: Módulo Legal Operativo.', 'color: #4B9F86;');
    },

    registerEvents: function() {
        // 1. Menú Móvil (Usando las clases exactas de tu legal.css: .nav-active y .toggle-active)
        if (this.dom.navToggle && this.dom.navMenu) {
            this.dom.navToggle.addEventListener('click', () => {
                const isActive = this.dom.navToggle!.classList.toggle('toggle-active');
                this.dom.navMenu!.classList.toggle('nav-active', isActive);
                this.dom.navToggle!.setAttribute('aria-expanded', String(isActive));
            });
        }

        // 2. Formulario Legal
        this.dom.form?.addEventListener('submit', (e) => this.handleConsentSubmit(e));
        document.getElementById('btnRevokeConsent')?.addEventListener('click', () => this.handleConsentRevocation());
    },

    // Motor de ScrollSpy para el índice lateral
    initScrollSpy: function() {
        window.addEventListener('scroll', () => {
            let current = '';
            this.dom.sections.forEach(section => {
                const sectionTop = (section as HTMLElement).offsetTop;
                if (window.scrollY >= sectionTop - 150) {
                    current = section.getAttribute('id') || '';
                }
            });

            this.dom.navLinks.forEach(link => {
                link.classList.remove('is-active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('is-active');
                }
            });
        }, { passive: true });
    },

    handleConsentSubmit: function(e: Event) {
        e.preventDefault();
        const chkTerms = document.getElementById('chkTerms') as HTMLInputElement;
        const chkData = document.getElementById('chkData') as HTMLInputElement;

        if (!chkTerms.checked || !chkData.checked) {
            alert('Es obligatorio aceptar los Términos y el tratamiento de datos.');
            return;
        }

        localStorage.setItem('JadeCore_Consent_Manifest', JSON.stringify({ accepted: true }));
        alert('Preferencias de privacidad guardadas.');
    },

    handleConsentRevocation: function() {
        if(confirm('¿Revocar permisos? Esto limitará el acceso a la plataforma.')) {
            localStorage.removeItem('JadeCore_Consent_Manifest');
            this.dom.form?.reset();
            alert('Consentimiento revocado.');
        }
    }
};

document.addEventListener('DOMContentLoaded', () => JadeCoreLegal.init());