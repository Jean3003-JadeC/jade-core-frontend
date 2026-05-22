/**
 * ==========================================================================
 * JADE CORE - MÓDULO: RECURSOS Y EVIDENCIA (SPA Version)
 * Componentes: Filtrado del Repositorio Clínico, Descargas y Animaciones
 * ==========================================================================
 */

const sectionRecursos = document.getElementById('recursos');

if (sectionRecursos) {
    // 1. SELECTORES AISLADOS (Búsqueda exclusiva dentro de #recursos)
    const filterButtons = sectionRecursos.querySelectorAll('.filter-btn');
    const resourceCards = sectionRecursos.querySelectorAll('.resource-card');
    const downloadLinks = sectionRecursos.querySelectorAll('.btn-download');

    // 2. ANIMACIÓN ESCALONADA NATIVA (Staggered Fade-In)
    // Se ejecuta de inmediato porque main.ts carga este script cuando la sección es visible
    resourceCards.forEach((card, index) => {
        const htmlCard = card as HTMLElement;
        
        // Configuración inicial de estilo en línea para la transición
        htmlCard.style.opacity = '0';
        htmlCard.style.transform = 'translateY(20px)';
        htmlCard.style.transition = 'opacity 0.4s ease-out, transform 0.4s ease-out';
        htmlCard.style.display = 'flex'; 

        setTimeout(() => {
            htmlCard.style.opacity = '1';
            htmlCard.style.transform = 'translateY(0)';
        }, 120 * (index + 1));
    });

    // 3. LÓGICA DE FILTRADO REACTIVO
    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const target = e.target as HTMLElement;

                // Evitar ciclos si ya está activo
                if (target.classList.contains('active')) return;

                // Actualizar estado visual y semántico (ARIA) de los botones
                filterButtons.forEach(btn => {
                    btn.classList.remove('active');
                    btn.setAttribute('aria-selected', 'false');
                });
                target.classList.add('active');
                target.setAttribute('aria-selected', 'true');

                const selectedFilter = target.getAttribute('data-filter');

                // Filtrar el repositorio con transiciones
                resourceCards.forEach(card => {
                    const htmlCard = card as HTMLElement;
                    const cardCategory = htmlCard.getAttribute('data-category');

                    if (selectedFilter === 'all' || cardCategory === selectedFilter) {
                        htmlCard.style.display = 'flex';
                        // Pequeño retardo para que el DOM registre el display flex antes de animar opacidad
                        setTimeout(() => {
                            htmlCard.style.opacity = '1';
                            htmlCard.style.transform = 'translateY(0)';
                        }, 20); 
                    } else {
                        htmlCard.style.opacity = '0';
                        htmlCard.style.transform = 'translateY(10px)';
                        // Ocultar del flujo del DOM luego de la transición visual
                        setTimeout(() => {
                            htmlCard.style.display = 'none';
                        }, 400); 
                    }
                });
            });
        });
    }

    // 4. TRACKING ANALÍTICO DE DESCARGAS (Documentos Técnicos)
    if (downloadLinks.length > 0) {
        downloadLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const target = e.target as HTMLElement;
                // Buscar el título dinámicamente navegando por los nodos padres
                const docName = target.closest('.card-content')?.querySelector('.card-title')?.textContent || 'Documento Clínico';
                
                console.log(`%c[BI Data Log] Extracción registrada: ${docName}`, 'color: #4B9F86; font-weight: bold;');
            });
        });
    }

    console.log('%c[Jade Core Node]: Módulo Recursos / Repositorio Clínico Operativo.', 'color: #4B9F86;');
}