import '../styles/App.css';

document.addEventListener('DOMContentLoaded', () => {

    // Lógica del Header (Scroll reactivo)
    const header = document.getElementById('mainHeader');
    if (header) {
        window.addEventListener('scroll', () => {
            header.classList.toggle('scrolled', window.scrollY > 50);
        }, { passive: true });
    }

    // Menú Móvil Responsive
    const mobileToggle = document.getElementById('mobileNavToggle');
    const mainNav = document.getElementById('mainNav');

    if (mobileToggle && mainNav) {
        mobileToggle.addEventListener('click', () => {
            const isOpen = mobileToggle.classList.toggle('is-active');
            mainNav.classList.toggle('is-active');
            mobileToggle.setAttribute('aria-expanded', String(isOpen));
        });
    }

    // Tracking de Adquisición (WhatsApp)
    const btnWhatsapp = document.querySelector('.btn-whatsapp-app');
    if (btnWhatsapp) {
        btnWhatsapp.addEventListener('click', () => {
            console.group('%c[Jade Core Analytics] App Acquisition', 'color: #4B9F86; font-weight: bold;');
            console.log('Acción: Redirección WhatsApp Corporativo');
            console.log(`Timestamp: ${new Date().toISOString()}`);
            console.groupEnd();
        });
    }

    console.log('%c🌐 [Jade Core Node]: Módulo de Plataforma APP Listo.', 'color: #3B82F6; font-weight: bold;');
});