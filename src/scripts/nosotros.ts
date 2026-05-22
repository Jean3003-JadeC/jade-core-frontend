/**
 * ==========================================================================
 * JADE CORE - MÓDULO: IDENTIDAD / NOSOTROS (SPA Version)
 * Componentes: Animaciones de Pilares y Gráfico de Convergencia
 * ==========================================================================
 */

const sectionNosotros = document.getElementById('nosotros');

if (sectionNosotros) {
    
    // ==========================================================================
    // 1. ANIMACIÓN ESCALONADA DE PILARES CORE (Staggered Fade-In)
    // ==========================================================================
    const pillarCards = sectionNosotros.querySelectorAll('.pillar-card');

    pillarCards.forEach((card, index) => {
        const htmlCard = card as HTMLElement;
        
        // Estado inicial de entrada
        htmlCard.style.opacity = '0';
        htmlCard.style.transform = 'translateY(30px)';
        htmlCard.style.transition = 'opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1), transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';

        // Ejecución en cascada basada en el index (0ms, 150ms, 300ms...)
        setTimeout(() => {
            htmlCard.style.opacity = '1';
            htmlCard.style.transform = 'translateY(0)';
        }, 150 * (index + 1));
    });

    // ==========================================================================
    // 2. RENDERIZADO DEL GRÁFICO INTERACTIVO DEL ECOSISTEMA
    // ==========================================================================
    const ecosystemContainer = sectionNosotros.querySelector('.ecosystem-graphic-placeholder');

    if (ecosystemContainer) {
        // Sanitización del contenedor
        ecosystemContainer.innerHTML = '';

        // Dataset inmutable de los componentes del ecosistema
        const nodesData = [
            { id: 'clinica', label: 'Nutrición Clínica & Renal', desc: 'Evidencia y Soporte Convectivo', color: '#4B9F86' },
            { id: 'datos', label: 'Data Analytics & IA', desc: 'Modelos Predictivos y Automatización', color: '#3B82F6' },
            { id: 'gestion', label: 'Gestión en Salud', desc: 'Optimización de IPRESS / RIS', color: '#8B5CF6' }
        ];

        // Creación del canvas/contenedor flex
        const graphContainer = document.createElement('div');
        graphContainer.className = 'interactive-graph';
        graphContainer.style.display = 'flex';
        graphContainer.style.flexDirection = 'column';
        graphContainer.style.gap = '15px';
        graphContainer.style.width = '100%';
        graphContainer.style.marginTop = '2rem';

        // Generación de Nodos
        nodesData.forEach(node => {
            const nodeElement = document.createElement('div');
            nodeElement.className = 'graph-node';
            nodeElement.setAttribute('data-node-id', node.id);
            
            // Estilos de maquetación base
            nodeElement.style.background = 'rgba(255, 255, 255, 0.03)';
            nodeElement.style.border = `1px solid ${node.color}40`;
            nodeElement.style.padding = '15px';
            nodeElement.style.borderRadius = '6px';
            nodeElement.style.cursor = 'pointer';
            nodeElement.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';

            // Inyección de contenido semántico
            nodeElement.innerHTML = `
                <div style="display: flex; align-items: center; gap: 10px;">
                    <span class="node-indicator" style="width: 10px; height: 10px; background-color: ${node.color}; border-radius: 50%; display: inline-block;"></span>
                    <strong style="font-family: 'Montserrat', sans-serif; font-size: 0.95rem; color: #FFFFFF;">${node.label}</strong>
                </div>
                <p style="margin: 5px 0 0 20px; font-size: 0.8rem; color: #DFE2E4; opacity: 0.8;">${node.desc}</p>
            `;

            // Micro-interacciones vinculadas (Hover)
            nodeElement.addEventListener('mouseenter', () => {
                nodeElement.style.background = 'rgba(255, 255, 255, 0.08)';
                nodeElement.style.border = `1px solid ${node.color}`;
                nodeElement.style.transform = 'translateX(5px)';
                console.log(`%c[Jade Core Audit]: Enlazando analítica -> Flujo: ${node.id}`, 'color: #6C757D;');
            });

            nodeElement.addEventListener('mouseleave', () => {
                nodeElement.style.background = 'rgba(255, 255, 255, 0.03)';
                nodeElement.style.border = `1px solid ${node.color}40`;
                nodeElement.style.transform = 'translateX(0)';
            });

            graphContainer.appendChild(nodeElement);
        });

        // Inyección del validador de estado (Core Status)
        const coreIndicator = document.createElement('div');
        coreIndicator.className = 'graph-core-status';
        coreIndicator.style.marginTop = '15px';
        coreIndicator.style.fontSize = '0.75rem';
        coreIndicator.style.fontFamily = "'Lato', sans-serif";
        coreIndicator.style.color = '#4B9F86';
        coreIndicator.style.textAlign = 'center';
        coreIndicator.style.letterSpacing = '0.1em';
        coreIndicator.innerHTML = '● NÚCLEO CONVERGENTE ACTIVO: ECOSISTEMA DE PRECISIÓN';
        
        graphContainer.appendChild(coreIndicator);
        ecosystemContainer.appendChild(graphContainer);
    }

    console.log('%c[Jade Core Node]: Módulo Identidad / Nosotros Operativo.', 'color: #4B9F86;');
}