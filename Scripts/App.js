/* 📁 Scripts/App.js */

/**
 * @namespace JadeCoreApp
 * @description Maneja la interacción adaptativa y el tracking de eventos del módulo privado.
 */
const JadeCoreApp = (() => {
    'use strict';

    const state = {
        isMobileNavOpen: false
    };

    const DOM = {};

    const cacheDOM = () => {
        DOM.AppNav = document.querySelector('.App-nav');
        DOM.mobileToggle = document.querySelector('.mobile-nav-toggle');
        DOM.btnWhatsapp = document.querySelector('.btn-whatsapp-app');
    };

    const bindEvents = () => {
        if (DOM.mobileToggle) {
            DOM.mobileToggle.addEventListener('click', toggleMobileNavigation);
        }

        if (DOM.btnWhatsapp) {
            DOM.btnWhatsapp.addEventListener('click', logAcquisitionIntent);
        }
    };

    const toggleMobileNavigation = () => {
        state.isMobileNavOpen = !state.isMobileNavOpen;
        if (DOM.AppNav && DOM.mobileToggle) {
            DOM.AppNav.classList.toggle('nav-active', state.isMobileNavOpen);
            DOM.mobileToggle.setAttribute('aria-expanded', state.isMobileNavOpen.toString());
        }
    };

    /**
     * Auditoría técnica de clics para trazabilidad corporativa en la adquisición
     */
    const logAcquisitionIntent = () => {
        console.group(`[Jade Core Analytics] App Acquisition`);
        console.log(`Acción: Redirección WhatsApp Corporativo`);
        console.log(`Timestamp: ${new Date().toISOString()}`);
        console.groupEnd();
    };

    return {
        init: () => {
            console.log('Initializing Jade Core App Coming Soon Module...');
            cacheDOM();
            bindEvents();
        }
    };
})();

document.addEventListener('DOMContentLoaded', () => {
    JadeCoreApp.init();
});