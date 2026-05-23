/**
 * ==========================================================================
 * JADE CORE - MÓDULO: APP (Plataforma Digital)
 * Controlador exclusivo para App.html
 * ==========================================================================
 */

// 1. IMPORTACIÓN DEL DISEÑO
import '../styles/App.css';

document.addEventListener('DOMContentLoaded', () => {
    
    // =========================================================
    // 2. LÓGICA DEL HEADER (Scroll Reactivo Sincronizado)
    // =========================================================
    const header = document.getElementById('mainHeader');
    if (header) {
        window.addEventListener('scroll', () => {
            // Usa el mismo umbral (50px) que la landing page para consistencia visual
            header.classList.toggle('scrolled', window.scrollY > 50);
        }, { passive: true });
    }

    // =========================================================
    // 3. MENÚ MÓVIL RESPONSIVE (Estandarizado)
    // =========================================================
    const mobileToggle = document.getElementById('mobileNavToggle');
    const mainNav = document.getElementById('mainNav');

    if (mobileToggle && mainNav) {
        mobileToggle.addEventListener('click', () => {
            // Utilizamos .is-active en lugar del antiguo .nav-active/.toggle-active
            const isOpen = mobileToggle.classList.toggle('is-active');
            mainNav.classList.toggle('is-active');
            
            // Mantener accesibilidad estricta
            mobileToggle.setAttribute('aria-expanded', String(isOpen));
        });
    }

    // =========================================================
    // 4. AUDITORÍA TÉCNICA Y TRACKING (Rescue del código antiguo)
    // =========================================================
    const btnWhatsapp = document.querySelector('.btn-whatsapp-app');
    if (btnWhatsapp) {
        btnWhatsapp.addEventListener('click', () => {
            console.group(`%c[Jade Core Analytics] App Acquisition`, 'color: #4B9F86; font-weight: bold;');
            console.log(`Acción: Redirección WhatsApp Corporativo`);
            console.log(`Timestamp: ${new Date().toISOString()}`);
            console.groupEnd();
        });
    }

    // =========================================================
    console.log('%c🌐 [Jade Core Node]: Módulo de Plataforma APP Listo.', 'color: #3B82F6; font-weight: bold;');
});