/**
 * ==========================================================================
 * JADE CORE - MÓDULO: SERVICIOS (SPA Version)
 * Componentes: Filtrado del Portafolio Corporativo y Transiciones Analíticas
 * ==========================================================================
 */

const sectionServicios = document.getElementById('servicios');

if (sectionServicios) {
    // 1. SELECTORES AISLADOS (Búsqueda exclusiva dentro de #servicios)
    const filterButtons = sectionServicios.querySelectorAll('.filter-btn');
    const resourceCards = sectionServicios.querySelectorAll('.resource-card');

    // 2. CASCADA DE CARGA ELEGANTE (Staggered Fade-In)
    // Se ejecuta asíncronamente cuando el módulo es inyectado por main.ts
    resourceCards.forEach((card, index) => {
        const htmlCard = card as HTMLElement;
        
        // Estado inicial de transición por hardware
        htmlCard.style.opacity = '0';
        htmlCard.style.transform = 'translateY(24px)';
        htmlCard.style.transition = 'opacity 0.4s ease-out, transform 0.4s ease-out';
        htmlCard.style.display = 'flex'; 

        // Renderizado secuencial (120ms incremental)
        setTimeout(() => {
            htmlCard.style.opacity = '1';
            htmlCard.style.transform = 'translateY(0)';
        }, 120 * (index + 1));
    });

    // 3. LÓGICA DE FILTRADO REACTIVO Y ANIMADO
    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const target = e.target as HTMLElement;

                // Evitar reprocesamiento si el nodo ya está activo
                if (target.classList.contains('active')) return;

                // Actualización atómica de estados (Visual y ARIA)
                filterButtons.forEach(btn => {
                    btn.classList.remove('active');
                    btn.setAttribute('aria-selected', 'false');
                });
                target.classList.add('active');
                target.setAttribute('aria-selected', 'true');

                const selectedFilter = target.getAttribute('data-filter');

                // Motor de filtrado con transiciones matemáticas
                resourceCards.forEach(card => {
                    const htmlCard = card as HTMLElement;
                    const cardCategory = htmlCard.getAttribute('data-category');

                    if (selectedFilter === 'all' || cardCategory === selectedFilter) {
                        htmlCard.style.display = 'flex';
                        // Retraso en milisegundos para permitir el repintado del DOM
                        setTimeout(() => {
                            htmlCard.style.opacity = '1';
                            htmlCard.style.transform = 'translateY(0)';
                        }, 20); 
                    } else {
                        htmlCard.style.opacity = '0';
                        htmlCard.style.transform = 'translateY(10px)';
                        // Ocultar nodo tras finalizar la curva de opacidad
                        setTimeout(() => {
                            htmlCard.style.display = 'none';
                        }, 400); 
                    }
                });
            });
        });
    }

    // 4. MICRO-INTERACCIONES (Tracking Analítico Silencioso)
    // Adaptación de tu antiguo handleCardFocus para la nueva arquitectura
    resourceCards.forEach(card => {
        card.addEventListener('mouseenter', (e) => {
            const target = e.currentTarget as HTMLElement;
            const category = target.getAttribute('data-category') || 'Desconocida';
            // Traza de auditoría opcional para métricas de interacción
            // console.log(`%c[Focus Analítico]: Evaluando servicio -> ${category}`, 'color: #6C757D; font-size: 0.8em;');
        });
    });

    console.log('%c[Jade Core Node]: Módulo Portafolio de Servicios Operativo.', 'color: #4B9F86;');
}