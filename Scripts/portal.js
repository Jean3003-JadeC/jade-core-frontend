/* 📁 Scripts/portal.js */

/**
 * @namespace JadeCorePortal
 * @description Módulo de control de alta precisión para el área privada de Jade Core.
 * Gobierna el ciclo de vida de la simulación SPA, el menú adaptativo institucional y las capas analíticas.
 */
const JadeCorePortal = (() => {
    'use strict';

    // ==========================================================================
    // ESTADO PRIVADO DEL MÓDULO (State Management)
    // ==========================================================================
    const state = {
        currentView: 'view-paciente', // Perfil por defecto en la inicialización
        isUserAuthenticated: true,
        isMobileNavOpen: false
    };

    // Almacenamiento en caché de selectores del DOM para optimización de memoria
    const DOM = {};

    // ==========================================================================
    // MÉTODOS PRIVADOS (Core Logic)
    // ==========================================================================
    
    /**
     * Cachea los nodos críticos del DOM una sola vez durante el ciclo de arranque.
     */
    const cacheDOM = () => {
        DOM.portalNav = document.querySelector('.portal-nav');
        DOM.navTabs = document.querySelectorAll('.nav-tab');
        DOM.mobileToggle = document.querySelector('.mobile-nav-toggle');
        DOM.views = document.querySelectorAll('.portal-view');
        DOM.btnLogout = document.getElementById('btn-logout');
        
        // Contenedores analíticos asíncronos
        DOM.chartPaciente = document.getElementById('chart-paciente-composicion');
        DOM.chartCorporativo = document.getElementById('chart-corp-epidemiologia');
        DOM.btnDownloads = document.querySelectorAll('.btn-download');
    };

    /**
     * Registra y centraliza los escuchadores de eventos del ecosistema privado.
     */
    const bindEvents = () => {
        // Manejador de la Barra de Navegación Adaptativa (Mobile Toggle)
        if (DOM.mobileToggle) {
            DOM.mobileToggle.addEventListener('click', toggleMobileNavigation);
        }

        // Conmutador del Motor SPA (Tabs)
        DOM.navTabs.forEach(tab => {
            tab.addEventListener('click', (e) => {
                const targetViewId = e.currentTarget.getAttribute('data-target');
                
                // Salvaguarda: Evitar re-renderizado si la vista ya está activa
                if (targetViewId && targetViewId !== state.currentView) {
                    switchView(targetViewId);
                }
                
                // Cerrar el menú automáticamente si se selecciona una pestaña en móvil
                if (state.isMobileNavOpen) {
                    toggleMobileNavigation();
                }
            });
        });

        // Control de Cierre de Sesión Auditado
        if (DOM.btnLogout) {
            DOM.btnLogout.addEventListener('click', handleLogout);
        }

        // Intercepción Segura de Descarga de Datos Clínicos e Institucionales
        DOM.btnDownloads.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const reportTitle = e.currentTarget.closest('li').querySelector('strong').textContent;
                exportReportData(reportTitle);
            });
        });
    };

    /**
     * Controla la apertura y cierre del menú responsive actualizando los estados ARIA.
     */
    const toggleMobileNavigation = () => {
        state.isMobileNavOpen = !state.isMobileNavOpen;
        
        if (DOM.portalNav && DOM.mobileToggle) {
            DOM.portalNav.classList.toggle('nav-active', state.isMobileNavOpen);
            DOM.mobileToggle.setAttribute('aria-expanded', state.isMobileNavOpen.toString());
        }
    };

    /**
     * Gobierna la conmutación semántica de contenedores bajo la simulación SPA.
     * @param {string} targetViewId - Identificador de la sección destino.
     */
    const switchView = (targetViewId) => {
        state.currentView = targetViewId;

        // 1. Mutación de estados visuales y semánticos en las pestañas
        DOM.navTabs.forEach(tab => {
            const isActive = tab.getAttribute('data-target') === targetViewId;
            tab.classList.toggle('active', isActive);
            tab.setAttribute('aria-selected', isActive.toString());
        });

        // 2. Manipulación semántica e inyección en el árbol de renderizado
        DOM.views.forEach(view => {
            if (view.id === targetViewId) {
                view.removeAttribute('hidden');
                view.setAttribute('aria-hidden', 'false');
                triggerViewAnalysis(targetViewId); // Carga diferida bajo demanda
            } else {
                view.setAttribute('hidden', '');
                view.setAttribute('aria-hidden', 'true');
            }
        });
    };

    /**
     * Enruta los disparadores analíticos específicos según el entorno privado seleccionado.
     * @param {string} viewId 
     */
    const triggerViewAnalysis = (viewId) => {
        if (viewId === 'view-paciente') {
            renderPacienteAnalytics();
        } else if (viewId === 'view-corporativo') {
            renderCorporativoBI();
        }
    };

    /**
     * Inyecta de forma asíncrona los datos e indicadores de la evolución metabólica renal.
     */
    const renderPacienteAnalytics = () => {
        if (!DOM.chartPaciente) return;
        
        setTimeout(() => {
            DOM.chartPaciente.innerHTML = `
                <div style="width: 100%; text-align: left; padding: 0 0.5rem;">
                    <p style="color: var(--organic-emerald); font-weight: 700; margin-bottom: 0.5rem; font-family: var(--font-primary); font-size: 0.9rem;">✔ TENDENCIA DE MASA CELULAR ACTIVA ESTABLE</p>
                    <p style="font-size: 0.85rem; color: var(--clinical-graphite); font-family: var(--font-reading);">
                        Último control bioimpedancia multi-frecuencia: <strong>Estable (Variación &lt; 1.2% frente a línea base)</strong>.
                    </p>
                    <div style="background: var(--border-color); height: 6px; border-radius: 3px; margin-top: 1rem; overflow: hidden;">
                        <div style="background: var(--organic-emerald); width: 78%; height: 100%; transition: width 0.8s ease;"></div>
                    </div>
                    <small style="display: block; margin-top: 0.6rem; color: var(--data-slate); font-size: 0.75rem; font-family: var(--font-secondary);">
                        Mapeo analítico de precisión procesado de forma automatizada por el motor criptográfico de Jade Core.
                    </small>
                </div>
            `;
        }, 300);
    };

    /**
     * Inyecta el cuadro predictivo de la distribución de carga epidemiológica para las IPRESS asesoradas.
     */
    const renderCorporativoBI = () => {
        if (!DOM.chartCorporativo) return;

        setTimeout(() => {
            DOM.chartCorporativo.innerHTML = `
                <div style="width: 100%; text-align: left; padding: 0 0.5rem;">
                    <p style="color: var(--clinical-graphite); font-weight: 700; margin-bottom: 0.75rem; font-family: var(--font-primary); font-size: 0.9rem;">📊 PRESIÓN ASISTENCIAL DE LA RED (PREVALENCIA ERC)</p>
                    <ul style="list-style: none; font-size: 0.85rem; display: flex; flex-direction: column; gap: 0.5rem; font-family: var(--font-reading);">
                        <li style="display: flex; justify-content: space-between; border-bottom: 1px solid var(--border-color); padding-bottom: 0.25rem;">
                            <span>• Centro Médico Aplao (EsSalud)</span> <strong style="color: var(--alert-red);">14.2% (Crítico)</strong>
                        </li>
                        <li style="display: flex; justify-content: space-between; border-bottom: 1px solid var(--border-color); padding-bottom: 0.25rem;">
                            <span>• Red Sabandía (Prevención)</span> <strong style="color: var(--organic-emerald);">5.8% (Bajo Control)</strong>
                        </li>
                        <li style="display: flex; justify-content: space-between;">
                            <span>• José Luis Bustamante y Rivero</span> <strong>8.3% (Estable)</strong>
                        </li>
                    </ul>
                    <small style="display: block; margin-top: 0.75rem; color: var(--data-slate); font-size: 0.75rem; font-family: var(--font-secondary);">
                        Consolidación de datos cruzados e indicadores inferenciales extraídos de la Hoja Gerencial institucional.
                    </small>
                </div>
            `;
        }, 300);
    };

    /**
     * Simula y registra en consola con fines de auditoría legal y cifrado las peticiones de descarga.
     * @param {string} reportTitle 
     */
    const exportReportData = (reportTitle) => {
        console.group(`[Jade Core Security Audit] Exportación Autorizada`);
        console.log(`Documento: ${reportTitle}`);
        console.log(`Timestamp ISO: ${new Date().toISOString()}`);
        console.log(`Operador: Autenticado - Cifrado SSL/TLS Activo`);
        console.groupEnd();
        
        alert(`Iniciando canalización y empaquetamiento seguro para:\n"${reportTitle}"\n\nEl archivo estructurado se descargará en estricto cumplimiento con la normativa de confidencialidad y portabilidad de datos de salud.`);
    };

    /**
     * Destruye el estado de sesión local y simula la reconexión al entorno público.
     */
    const handleLogout = () => {
        if (confirm('¿Desea cerrar su sesión de forma segura y abandonar el entorno cifrado de Jade Core?')) {
            state.isUserAuthenticated = false;
            console.log('Sesión revocada de forma segura. Redireccionando a la raíz del ecosistema...');
            alert('Sesión finalizada con éxito. Su token de acceso ha sido destruido de forma segura.');
            // Redirección homologada con la estructura del ecosistema:
            window.location.href = 'home.html';
        }
    };

    // ==========================================================================
    // API PÚBLICA DEL NAMESPACE
    // ==========================================================================
    return {
        /**
         * Inicializador único del módulo privado.
         */
        init: () => {
            console.log('Initializing Jade Core Private Portal System [v1.1.0]...');
            cacheDOM();
            bindEvents();
            
            // Renderizado forzado de la vista predeterminada de control
            triggerViewAnalysis(state.currentView);
        }
    };
})();

// Inicialización controlada una vez estructurado el árbol semántico del DOM
document.addEventListener('DOMContentLoaded', () => {
    JadeCorePortal.init();
});