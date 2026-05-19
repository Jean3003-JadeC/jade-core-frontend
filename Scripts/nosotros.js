/**
 * Jade Core - Módulo "Quiénes Somos" (Nosotros)
 * Arquitectura de JavaScript Avanzada y Modular
 */

document.addEventListener('DOMContentLoaded', () => {
    // Inicialización de módulos internos
    JadeCoreAbout.initTeamAnimations();
    JadeCoreAbout.renderInteractiveEcosystem();
});

const JadeCoreAbout = {

    /**
     * Módulo 1: Animaciones secuenciales para las tarjetas del equipo
     */
    initTeamAnimations: function() {
        const teamCards = document.querySelectorAll('.team-card');
        
        if (teamCards.length === 0) return;

        // Configuración inicial de estilos para la animación mediante JS (opacidad y posición)
        teamCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';

            // Efecto staggered (escalonado) basado en el índice de la tarjeta
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 150 * (index + 1));
        });

        // Micro-interacción: Evento click en los tags para feedback clínico
        const memberTags = document.querySelectorAll('.member-tag');
        memberTags.forEach(tag => {
            tag.style.cursor = 'pointer';
            tag.addEventListener('click', (e) => {
                const specialty = e.target.textContent;
                console.log(`[Jade Core Audit]: Consulta de especialidad orientada a: ${specialty}`);
                // Aquí se puede extender para abrir un modal con flujogramas o certificaciones del área
            });
        });
    },

    /**
     * Módulo 2: Renderizado del Gráfico Interactivo del Ecosistema
     * Sustituye el placeholder estático por una estructura visual de nodos interconectados
     */
    renderInteractiveEcosystem: function() {
        const container = document.querySelector('.ecosystem-graphic-placeholder');
        
        if (!container) return;

        // Limpiamos el texto del placeholder
        container.innerHTML = '';

        // Estructura de datos del ecosistema de Jade Core
        const nodesData = [
            { id: 'clinica', label: 'Nutrición Clínica & Renal', desc: 'Evidencia y Soporte Convectivo', color: '#4B9F86' },
            { id: 'datos', label: 'Data Analytics & IA', desc: 'Modelos Predictivos y Automatización', color: '#3B82F6' },
            { id: 'gestion', label: 'Gestión en Salud', desc: 'Optimización de IPRESS / RIS', color: '#8B5CF6' }
        ];

        // Crear contenedor interno del gráfico con estilos CSS encapsulados en JS
        const graphContainer = document.createElement('div');
        graphContainer.className = 'interactive-graph';
        graphContainer.style.display = 'flex';
        graphContainer.style.flexDirection = 'column';
        graphContainer.style.gap = '15px';
        graphContainer.style.width = '100%';

        // Generar los nodos interactivos
        nodesData.forEach(node => {
            const nodeElement = document.createElement('div');
            nodeElement.className = 'graph-node';
            nodeElement.setAttribute('data-node-id', node.id);
            
            // Estilos estructurados del nodo
            nodeElement.style.background = 'rgba(255, 255, 255, 0.03)';
            nodeElement.style.border = `1px solid ${node.color}40`; // Opacidad del 25% al borde
            nodeElement.style.padding = '15px';
            nodeElement.style.borderRadius = '6px';
            nodeElement.style.cursor = 'pointer';
            nodeElement.style.transition = 'all 0.3s ease';

            nodeElement.innerHTML = `
                <div style="display: flex; align-items: center; gap: 10px;">
                    <span class="node-indicator" style="width: 10px; height: 10px; background-color: ${node.color}; border-radius: 50%; display: inline-block;"></span>
                    <strong style="font-family: 'Montserrat', sans-serif; font-size: 0.95rem; color: #FFFFFF;">${node.label}</strong>
                </div>
                <p style="margin: 5px 0 0 20px; font-size: 0.8rem; color: #DFE2E4; opacity: 0.8;">${node.desc}</p>
            `;

            // Efectos Hover dinámicos manejados por JS
            nodeElement.addEventListener('mouseenter', () => {
                nodeElement.style.background = 'rgba(255, 255, 255, 0.08)';
                nodeElement.style.border = `1px solid ${node.color}`;
                nodeElement.style.transform = 'translateX(5px)';
                JadeCoreAbout.highlightNodeConnection(node.id);
            });

            nodeElement.addEventListener('mouseleave', () => {
                nodeElement.style.background = 'rgba(255, 255, 255, 0.03)';
                nodeElement.style.border = `1px solid ${node.color}40`;
                nodeElement.style.transform = 'translateX(0)';
            });

            graphContainer.appendChild(nodeElement);
        });

        // Inyección de un validador central de convergencia en el DOM
        const coreIndicator = document.createElement('div');
        coreIndicator.className = 'graph-core-status';
        coreIndicator.style.marginTop = '10px';
        coreIndicator.style.fontSize = '0.75rem';
        coreIndicator.style.fontFamily = "'Lato', sans-serif";
        coreIndicator.style.color = 'var(--organic-emerald)';
        coreIndicator.style.textAlign = 'center';
        coreIndicator.style.letterSpacing = '0.1em';
        coreIndicator.innerHTML = '● NÚCLEO CONVERGENTE ACTIVO: TRATAMIENTO DE PRECISIÓN';
        
        graphContainer.appendChild(coreIndicator);
        container.appendChild(graphContainer);
    },

    /**
     * Helper: Simula la intercomunicación entre las áreas al hacer hover (Auditoría del sistema)
     */
    highlightNodeConnection: function(nodeId) {
        // En logs internos mantenemos la trazabilidad del flujo de datos
        console.log(`[Jade Core Ecosistema]: Enlazando analítica desde el nodo clínico -> Flujo: ${nodeId}`);
    }
};