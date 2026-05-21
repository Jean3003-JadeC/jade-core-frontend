/**
 * ==========================================================================
 * JADE CORE - CENTRAL DE ENTRADA MAESTRA (Vite Entry Point)
 * ==========================================================================
 * Archivo: main.ts
 * Descripción: Orquestación centralizada e inyección segura de sistemas de 
 * diseño y módulos lógicos mediante aserción del entorno del DOM.
 */

// --------------------------------------------------------------------------
// 1. CAPA DE INYECCIÓN GLOBAL DE SISTEMAS DE DISEÑO (CSS Módulos - Carpetas Corregidas)
// --------------------------------------------------------------------------
// Sincronización estricta con el directorio físico "styles" en minúsculas.
import './styles/home.css';        // Estilos de la sección de Inicio (index)
import './styles/App.css';         // Interfaz del entorno de simulación (Portal)
import './styles/contacto.css';    // Estilos del módulo de integración y formularios
import './styles/legal.css';       // Estilos del marco regulatorio e IPRESS
import './styles/metodologia.css'; // Estilos del flujo de trabajo y tecnología
import './styles/nosotros.css';    // Estilos de la sección de identidad institucional
import './styles/recursos.css';    // Estilos del centro de evidencia científica
import './styles/servicios.css';   // Estilos del catálogo clínico y renal

// --------------------------------------------------------------------------
// 2. CAPA DE EJECUCIÓN CONDICIONAL (Orquestación Segura del DOM)
// --------------------------------------------------------------------------
// Evitamos excepciones de puntero nulo (Null Pointer Exceptions) evaluando 
// la existencia de los selectores antes de inicializar los módulos lógicos.

document.addEventListener('DOMContentLoaded', () => {
    
    // MÓDULO: PORTAL DE LA APP
    if (document.body.classList.contains('clinical-env') || document.querySelector('.App-portal-core')) {
        import('./scripts/App')
            .then(() => console.log('🚀 [Jade Core]: Módulo lógico de la App inicializado.'))
            .catch(err => console.error('Error al cargar el script de la App:', err));
    }

    // MÓDULO: FORMULARIO DE CONTACTO
    if (document.querySelector('.contact-container') || document.getElementById('contactForm')) {
        import('./scripts/contacto')
            .then(() => console.log('📊 [Jade Core]: Módulo de contacto y pasarela de pagos inicializado.'))
            .catch(err => console.error('Error al cargar el script de contacto:', err));
    }

    // MÓDULO: PÁGINA DE INICIO (HOME / INDEX)
    if (document.querySelector('.hero-section')) {
        import('./scripts/home')
            .then(() => console.log('🏠 [Jade Core]: Módulo lógico de Inicio inicializado.'))
            .catch(err => console.error('Error al cargar el script de Inicio:', err));
    }

    // MÓDULO: CATÁLOGO DE SERVICIOS
    if (document.querySelector('.services-page-container')) {
        import('./scripts/servicios')
            .then(() => console.log('🔬 [Jade Core]: Catálogo de servicios especializado activo.'));
    }

    // MÓDULO: MARCO LEGAL
    if (document.querySelector('.legal-container')) {
        import('./scripts/legal')
            .then(() => console.log('🏛️ [Jade Core]: Protocolos de gobierno de datos y consentimiento activos.'));
    }

    // MÓDULOS RESTANTES (Nosotros, Metodología, Recursos)
    if (document.querySelector('.about-page')) import('./scripts/nosotros');
    if (document.querySelector('.methodology-flow')) import('./scripts/metodologia');
    if (document.querySelector('.clinical-context')) import('./scripts/recursos');

    console.log('%c🌐 [Jade Core Eco]: Capa lúdico-reactiva y enrutamiento unificado.', 'color: #4B9F86; font-weight: bold;');
});