/**
 * Jade Core - Módulo "Quiénes Somos" (Nosotros)
 * Arquitectura de JavaScript Avanzada, Modular y Basada en Namespace Pattern
 */

// 1. DEFINICIÓN DE LA INTERFAZ PARA EL CACHE DEL DOM
interface AboutDOM {
    mainHeader: HTMLElement | null;
    navNavigation: HTMLElement | null;
    navToggle: HTMLElement | null;
    teamCards: NodeListOf<HTMLElement>;
    memberTags: NodeListOf<HTMLElement>;
    ecosystemContainer: HTMLElement | null;
}

const JadeCoreAbout = {
    
    /**
     * Cache estático de selectores del DOM para optimización de rendimiento
     */
    DOM: {} as AboutDOM,

    initSelectors: function() {
        this.DOM.mainHeader = document.querySelector('#mainHeader');
        this.DOM.navNavigation = document.querySelector('#mainNavigation');
        this.DOM.navToggle = document.querySelector('.mobile-nav-toggle');
        this.DOM.teamCards = document.querySelectorAll('.team-card');
        this.DOM.memberTags = document.querySelectorAll('.member-tag');
        this.DOM.ecosystemContainer = document.querySelector('.ecosystem-graphic-placeholder');
    },

    /**
     * Método principal de inicialización y orquestación
     */
    init: function() {
        this.initSelectors();
        this.initTeamAnimations();
        this.renderInteractiveEcosystem();
        this.bindEvents();
    },

    /**
     * Registro centralizado de manejadores de eventos (Event Listeners)
     */
    bindEvents: function() {
        // Control interactivo del menú de navegación móvil (Capa 3)
        if (this.DOM.navToggle && this.DOM.navNavigation) {
            this.DOM.navToggle.addEventListener('click', () => {
                // Validación de seguridad para asegurar que los elementos existan al hacer click
                if (!this.DOM.navToggle || !this.DOM.navNavigation) return;

                const isExpanded = this.DOM.navToggle.getAttribute('aria-expanded') === 'true';
                
                // Toggle de clases CSS gobernadas por transiciones Bezier
                this.DOM.navNavigation.classList.toggle('nav-active');
                this.DOM.navToggle.setAttribute('aria-expanded', String(!isExpanded));
                this.DOM.navToggle.classList.toggle('toggle-active');
            });
        }

        // Micro-interacciones con los tags de especialidades clínicas
        if (this.DOM.memberTags && this.DOM.memberTags.length > 0) {
            this.DOM.memberTags.forEach(tag => {
                tag.style.cursor = 'pointer';
                tag.addEventListener('click', (e: Event) => {
                    // Convertimos e.target a HTMLElement para poder leer su contenido de texto de forma segura
                    const target = e.target as HTMLElement;
                    if (target) {
                        const specialty = (target.textContent || '').trim();
                        this.auditLog(`Consulta de especialidad orientada a: ${specialty}`);
                    }
                });
            });
        }
    },

    /**
     * Módulo 1: Animaciones secuenciales (Staggered Fade-In) para perfiles
     */
    initTeamAnimations: function() {
        if (!this.DOM.teamCards || this.DOM.teamCards.length === 0) return;

        this.DOM.teamCards.forEach((card, index) => {
            // Estado inicial controlado nativamente antes del despliegue secuencial
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';

            // Carga escalonada secuencial limpia basada en hilos de tiempo asíncronos
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 150 * (index + 1));
        });
    },

    /**
     * Módulo 2: Renderizado dinámico del Gráfico Interactivo del Ecosistema
     */
    renderInteractiveEcosystem: function() {
        if (!this.DOM.ecosystemContainer) return;

        // Sanitización explícita del contenedor estructural
        this.DOM.ecosystemContainer.innerHTML = '';

        // Dataset inmutable de los componentes del ecosistema Jade Core
        const nodesData = [
            { id: 'clinica', label: 'Nutrición Clínica & Renal', desc: 'Evidencia y Soporte Convectivo', color: '#4B9F86' },
            { id: 'datos', label: 'Data Analytics & IA', desc: 'Modelos Predictivos y Automatización', color: '#3B82F6' },
            { id: 'gestion', label: 'Gestión en Salud', desc: 'Optimización de IPRESS / RIS', color: '#8B5CF6' }
        ];

        const graphContainer = document.createElement('div');
        graphContainer.className = 'interactive-graph';
        graphContainer.style.display = 'flex';
        graphContainer.style.flexDirection = 'column';
        graphContainer.style.gap = '15px';
        graphContainer.style.width = '100%';

        nodesData.forEach(node => {
            const nodeElement = document.createElement('div');
            nodeElement.className = 'graph-node';
            nodeElement.setAttribute('data-node-id', node.id);
            
            // Estilos de maquetación estructural del nodo
            nodeElement.style.background = 'rgba(255, 255, 255, 0.03)';
            nodeElement.style.border = `1px solid ${node.color}40`;
            nodeElement.style.padding = '15px';
            nodeElement.style.borderRadius = '6px';
            nodeElement.style.cursor = 'pointer';
            nodeElement.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';

            nodeElement.innerHTML = `
                <div style="display: flex; align-items: center; gap: 10px;">
                    <span class="node-indicator" style="width: 10px; height: 10px; background-color: ${node.color}; border-radius: 50%; display: inline-block;"></span>
                    <strong style="font-family: 'Montserrat', sans-serif; font-size: 0.95rem; color: #FFFFFF;">${node.label}</strong>
                </div>
                <p style="margin: 5px 0 0 20px; font-size: 0.8rem; color: #DFE2E4; opacity: 0.8;">${node.desc}</p>
            `;

            // Eventos dinámicos vinculados con aislamiento contextual
            nodeElement.addEventListener('mouseenter', () => {
                nodeElement.style.background = 'rgba(255, 255, 255, 0.08)';
                nodeElement.style.border = `1px solid ${node.color}`;
                nodeElement.style.transform = 'translateX(5px)';
                this.highlightNodeConnection(node.id);
            });

            nodeElement.addEventListener('mouseleave', () => {
                nodeElement.style.background = 'rgba(255, 255, 255, 0.03)';
                nodeElement.style.border = `1px solid ${node.color}40`;
                nodeElement.style.transform = 'translateX(0)';
            });

            graphContainer.appendChild(nodeElement);
        });

        // Inyección del validador de estado e hilos de convergencia
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
        this.DOM.ecosystemContainer.appendChild(graphContainer);
    },

    /**
     * Intercomunicación de nodos de datos (Simulación analítica)
     */
    highlightNodeConnection: function(nodeId: string) {
        this.auditLog(`Enlazando analítica desde el nodo clínico -> Flujo: ${nodeId}`);
    },

    /**
     * Sistema centralizado de logs internos para auditoría del ecosistema
     */
    auditLog: function(message: string) {
        console.log(`[Jade Core Audit]: ${message}`);
    }
};

// Inicialización unificada del módulo al confirmar la carga del DOM
document.addEventListener('DOMContentLoaded', () => {
    JadeCoreAbout.init();
});