/**
 * ==========================================================================
 * JADE CORE - MÓDULO: METODOLOGÍA (SPA Version)
 * Componentes: Flujo operativo de Ingeniería Sanitaria e Interacciones
 * ==========================================================================
 */

const sectionMetodologia = document.getElementById('metodologia');

if (sectionMetodologia) {
    // 1. Seleccionamos exclusivamente las tarjetas dentro de esta sección
    const ecosystemCards = sectionMetodologia.querySelectorAll('.ecosystem-card');

    // 2. Interacciones de Accesibilidad y Hover (Soporte WCAG)
    ecosystemCards.forEach((card) => {
        // Permitir navegación por teclado
        card.setAttribute('tabindex', '0');

        // Controladores de clases para iluminación
        const triggerHighlight = () => card.classList.add('card-highlighted');
        const removeHighlight = () => card.classList.remove('card-highlighted');

        card.addEventListener('mouseenter', triggerHighlight);
        card.addEventListener('mouseleave', removeHighlight);
        card.addEventListener('focus', triggerHighlight);
        card.addEventListener('blur', removeHighlight);
    });

    // 3. Animación de Entrada Asíncrona (Staggered Fade-In)
    // Se ejecuta al instante porque el script se carga justo cuando la sección es visible
    ecosystemCards.forEach((card, index) => {
        const htmlCard = card as HTMLElement;
        
        // Estado inicial de la tarjeta
        htmlCard.style.opacity = '0';
        htmlCard.style.transform = 'translateY(20px)';
        htmlCard.style.transition = 'opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1), transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';

        // Ejecución en cascada: la fase 1 carga a los 0ms, fase 2 a los 200ms, fase 3 a los 400ms...
        setTimeout(() => {
            htmlCard.style.opacity = '1';
            htmlCard.style.transform = 'translateY(0)';
        }, index * 200); 
    });

    console.log('%c[Jade Core Node]: Módulo Metodología (Flujo Analítico) Operativo.', 'color: #4B9F86;');
}