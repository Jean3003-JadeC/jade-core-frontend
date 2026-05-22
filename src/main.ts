// --------------------------------------------------------------------------
// 1. ELIMINACIÓN DE IMPORTACIONES GLOBALES DE CSS
// --------------------------------------------------------------------------
// Explicación: Hemos retirado los imports de CSS de la cabecera. 
// Ahora cada módulo inyectará su propio archivo CSS de forma aislada,
// eliminando las colisiones de diseño y el parpadeo visual en desarrollo.

// --------------------------------------------------------------------------
// 2. CAPA DE EJECUCIÓN CONDICIONAL Y LOGÍSTICA DE RECURSOS
// --------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
    
    // MÓDULO: PORTAL DE LA APP
    if (document.body.classList.contains('clinical-env') || document.querySelector('.App-portal-core')) {
        // Inyectamos primero el CSS crítico de este entorno para evitar saltos de diseño
        import('./styles/App.css');
        // Cargamos la lógica asíncrona del script
        import('./scripts/App')
            .then(() => console.log('🚀 [Jade Core]: Módulo lógico y diseño de la App inicializados.'))
            .catch(err => console.error('Error al cargar la App:', err));
    }

    // MÓDULO: FORMULARIO DE CONTACTO
    if (document.querySelector('.contact-container') || document.getElementById('contactForm')) {
        import('./styles/contacto.css');
        import('./scripts/contacto')
            .then(() => console.log('📊 [Jade Core]: Módulo de contacto y pasarela de pagos activos.'))
            .catch(err => console.error('Error al cargar contacto:', err));
    }

    // MÓDULO: PÁGINA DE INICIO (HOME / INDEX)
    if (document.querySelector('.hero-section')) {
        import('./styles/home.css');
        import('./scripts/home')
            .then(() => console.log('🏠 [Jade Core]: Módulo de Inicio y diseño Home renderizados.'))
            .catch(err => console.error('Error al cargar Inicio:', err));
    }

    // MÓDULO: CATÁLOGO DE SERVICIOS
    if (document.querySelector('.services-page-container')) {
        import('./styles/servicios.css');
        import('./scripts/servicios')
            .then(() => console.log('🔬 [Jade Core]: Catálogo de servicios especializado y estilos activos.'));
    }

    // MÓDULO: MARCO LEGAL
    if (document.querySelector('.legal-container')) {
        import('./styles/legal.css');
        import('./scripts/legal')
            .then(() => console.log('🏛️ [Jade Core]: Protocolos de gobierno de datos y estilos legales activos.'));
    }

    // MÓDULOS MULTIPÁGINA: NOSOTROS, METODOLOGÍA Y RECURSOS
    if (document.querySelector('.about-page')) {
        import('./styles/nosotros.css');
        import('./scripts/nosotros');
    }
    
    if (document.querySelector('.methodology-flow')) {
        import('./styles/metodologia.css');
        import('./scripts/metodologia');
    }
    
    if (document.querySelector('.clinical-context')) {
        import('./styles/recursos.css');
        import('./scripts/recursos');
    }

    console.log('%c🌐 [Jade Core Eco]: Capa lúdico-reactiva y enrutamiento unificado.', 'color: #4B9F86; font-weight: bold;');
});