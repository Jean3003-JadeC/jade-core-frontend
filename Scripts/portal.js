/* 📁 Scripts/portal.js */

/**
 * @namespace JadeCorePortal
 * @description Módulo de control del área privada para Pacientes e Instituciones (RIS/IPRESS).
 * Mantiene el estado de la vista activa y simula comportamientos de una SPA mediante manipulación semántica.
 */
const JadeCorePortal = (() => {
    'use strict';

    // ==========================================================================
    // ESTADO PRIVADO DEL MÓDULO (State Management)
    // ==========================================================================
    const state = {
        currentView: 'view-paciente', // Estado inicial por defecto
        isUserAuthenticated: true,
        sessionTimeout: 1800000       // 30 minutos de inactividad
    };

    // Mapeo de selectores DOM críticos para evitar consultas repetitivas
    const DOM = {};

    // ==========================================================================
    // MÉTODOS PRIVADOS (Core Logic)
    // ==========================================================================
    
    /**
     * Cachea los elementos del DOM necesarios para el módulo.
     */
    const cacheDOM = () => {
        DOM.navTabs = document.querySelectorAll('.nav-tab');
        DOM.views = document.querySelectorAll('.portal-view');
        DOM.btnLogout = document.getElementById('btn-logout');
        
        // Contenedores analíticos para inyección de datos dinámicos o componentes visuales
        DOM.chartPaciente = document.getElementById('chart-paciente-composicion');
        DOM.chartCorporativo = document.getElementById('chart-corp-epidemiologia');
        DOM.btnDownloads = document.querySelectorAll('.btn-download');
    };

    /**
     * Vincula los listeners de eventos a los elementos del DOM correspondientes.
     */
    const bindEvents = () => {
        // Manejador para conmutación de vistas (SPA Tabs)
        DOM.navTabs.forEach(tab => {
            tab.addEventListener('click', (e) => {
                const targetViewId = e.currentTarget.getAttribute('data-target');
                if (targetViewId && targetViewId !== state.currentView) {
                    switchView(targetViewId);
                }
            });
        });

        // Control de cierre de sesión con confirmación clínica / auditoría
        if (DOM.btnLogout) {
            DOM.btnLogout.addEventListener('click', handleLogout);
        }

        // Simulación de descargas seguras de reportes estructurados (Hoja Gerencial)
        DOM.btnDownloads.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const reportName = e.currentTarget.closest('li').querySelector('strong').textContent;
                exportReportData(reportName);
            });
        });
    };

    /**
     * Controla la conmutación semántica y visual de las vistas del portal.
     * @param {string} targetViewId - ID de la sección del DOM a mostrar.
     */
    const switchView = (targetViewId) => {
        // 1. Actualizar estado lógico
        state.currentView = targetViewId;

        // 2. Transición visual de los botones de navegación (Tabs)
        DOM.navTabs.forEach(tab => {
            if (tab.getAttribute('data-target') === targetViewId) {
                tab.classList.add('active');
                tab.setAttribute('aria-selected', 'true');
            } else {
                tab.classList.remove('active');
                tab.setAttribute('aria-selected', 'false');
            }
        });

        // 3. Conmutación semántica de contenedores mediante Atributos Aria y Hidden
        DOM.views.forEach(view => {
            if (view.id === targetViewId) {
                view.removeAttribute('hidden');
                view.setAttribute('aria-hidden', 'false');
                // Disparador de renderizado bajo demanda al entrar a la vista específica
                triggerViewAnalysis(targetViewId);
            } else {
                view.setAttribute('hidden', '');
                view.setAttribute('aria-hidden', 'true');
            }
        });
    };

    /**
     * Ejecuta o inicializa cargas analíticas específicas según la vista activa.
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
     * Simula la inyección de la curva de evolución clínica para pacientes renales.
     */
    const renderPacienteAnalytics = () => {
        if (!DOM.chartPaciente) return;
        
        // Simulamos un delay de carga asíncrona de datos de laboratorio
        setTimeout(() => {
            DOM.chartPaciente.innerHTML = `
                <div style="width: 100%; text-align: left; padding: 0 1rem;">
                    <p style="color: var(--organic-emerald); font-weight: 700; margin-bottom: 0.5rem;">✔ Tendencia de Masa Celular Activa Estable</p>
                    <p style="font-size: 0.85rem; color: var(--clinical-graphite);">Último control bioimpedancia: <strong>Estable (Variación &lt; 1.2% respecto al mes anterior)</strong></p>
                    <div style="background: var(--border-color); height: 8px; border-radius: 4px; margin-top: 1rem; overflow: hidden;">
                        <div style="background: var(--organic-emerald); width: 78%; height: 100%;"></div>
                    </div>
                    <small style="display: block; margin-top: 0.5rem; color: var(--data-slate); font-size: 0.75rem;">Mapeo temporal procesado automáticamente por la IA de Jade Core.</small>
                </div>
            `;
        }, 350);
    };

    /**
     * Simula la inicialización de los modelos predictivos epidemiológicos RIS/IPRESS.
     */
    const renderCorporativoBI = () => {
        if (!DOM.chartCorporativo) return;

        setTimeout(() => {
            DOM.chartCorporativo.innerHTML = `
                <div style="width: 100%; text-align: left; padding: 0 1rem;">
                    <p style="color: var(--clinical-graphite); font-weight: 700; margin-bottom: 0.5rem;">📊 Distribución de Carga Epidemiológica (Presión RIS)</p>
                    <ul style="list-style: none; font-size: 0.85rem; display: flex; flex-direction: column; gap: 0.4rem;">
                        <li>• Centro Médico Aplao (Prevalencia ERC): <strong style="color: var(--alert-red);">14.2% (Crítico)</strong></li>
                        <li>• Red Sabandía (Monitoreo Preventivo): <strong style="color: var(--organic-emerald);">5.8% (Controlado)</strong></li>
                        <li>• José Luis Bustamante (Filtro Preventivo): <strong>8.3% (Estable)</strong></li>
                    </ul>
                    <small style="display: block; margin-top: 0.8rem; color: var(--data-slate); font-size: 0.75rem;">Datos estructurados mapeados en base a la Hoja Gerencial integrada.</small>
                </div>
            `;
        }, 400);
    };

    /**
     * Procesa la descarga y auditoría de los reportes descargados.
     * @param {string} reportName 
     */
    const exportReportData = (reportName) => {
        console.group(`[Jade Core Security Audit] Exportación de Datos`);
        console.log(`Documento solicitado: ${reportName}`);
        console.log(`Timestamp: ${new Date().toISOString()}`);
        console.log(`Estado: Autenticado - Token Activo`);
        console.groupEnd();
        
        alert(`Iniciando la exportación segura del documento:\n"${reportName}"\n\nEl archivo estructurado se descargará cumpliendo con los estándares de interoperabilidad clínica.`);
    };

    /**
     * Destruye la sesión de forma limpia borrando el estado local.
     */
    const handleLogout = () => {
        if (confirm('¿Está seguro de que desea cerrar su sesión en el entorno seguro de Jade Core?')) {
            state.isUserAuthenticated = false;
            console.log('Sesión cerrada correctamente. Redireccionando a entorno público...');
            // Aquí iría el callback de redirección oficial:
            // window.location.href = './home.html';
            alert('Sesión finalizada con éxito de manera segura.');
        }
    };

    // ==========================================================================
    // MÉTODOS PÚBLICOS (API del Namespace)
    // ==========================================================================
    return {
        /**
         * Método de arranque único del módulo.
         */
        init: () => {
            console.log('Initializing Jade Core Private Portal Module [v1.0.0]...');
            cacheDOM();
            bindEvents();
            
            // Forzar el render inicial de la vista por defecto (Paciente)
            triggerViewAnalysis(state.currentView);
        }
    };
})();

// Inicialización segura cuando el DOM está completamente estructurado
document.addEventListener('DOMContentLoaded', () => {
    JadeCorePortal.init();
});