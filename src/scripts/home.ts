/**
 * JADE CORE - Módulo Sanitario Avanzado e Infraestructura de Datos
 * Archivo: home.ts
 * Patrón: Namespace Encapsulado (JadeCoreHome)
 */

// 1. INTERFAZ PARA EL CONTROL ESTRICTO DE ELEMENTOS DEL DOM
interface HomeDOM {
    header: HTMLElement | null;
    navMenu: HTMLElement | null;
    mobileToggle: HTMLElement | null;
    formContacto: HTMLFormElement | null;
    recursoItems: NodeListOf<HTMLElement>;
    statNumbers: NodeListOf<HTMLElement>;
}

const JadeCoreHome = {
    // 2. CACHE DEL DOM CENTRALIZADO - Tipado con la interfaz superior
    DOM: {} as HomeDOM,

    // Variables de configuración de estado
    config: {
        scrollUmbral: 50,
        animacionDuracion: 2000 // Milisegundos para los contadores de impacto
    },

    initSelectors: function () {
        this.DOM.header = document.querySelector("header");
        this.DOM.navMenu = document.querySelector(".nav-menu");
        this.DOM.mobileToggle = document.querySelector(".mobile-nav-toggle");
        this.DOM.formContacto = document.querySelector("#contacto-formulario form") as HTMLFormElement;
        this.DOM.recursoItems = document.querySelectorAll(".recurso-item");
        this.DOM.statNumbers = document.querySelectorAll(".stat-number");
    },

    /**
     * Inicializador maestro del módulo Home
     */
    init: function () {
        this.initSelectors();
        this.bindEvents();
        this.initStickyHeader();
        this.initContadoresDinamicos();
    },

    /**
     * Registro centralizado de manejadores de eventos (Event Listeners)
     */
    bindEvents: function () {
        // Control de navegación móvil
        if (this.DOM.mobileToggle && this.DOM.navMenu) {
            this.DOM.mobileToggle.addEventListener("click", () => this.toggleMobileNavigation());
        }

        // Manejo del envío del formulario de ingesta clínica
        if (this.DOM.formContacto) {
            this.DOM.formContacto.addEventListener("submit", (e: Event) => this.procesarFormulario(e));
        }

        // Descarga de documentos técnicos y evidencias
        if (this.DOM.recursoItems && this.DOM.recursoItems.length > 0) {
            this.DOM.recursoItems.forEach(item => {
                item.addEventListener("click", () => this.ejecutarDescargaSegura(item));
            });
        }
    },

    /**
     * 1. GESTIÓN INTERACTIVA DEL MENU MOVIL (Hamburguesa a Cruz)
     */
    toggleMobileNavigation: function () {
        if (!this.DOM.mobileToggle || !this.DOM.navMenu) return;

        const isOpen = this.DOM.mobileToggle.classList.toggle("open");
        this.DOM.navMenu.classList.toggle("nav-active", isOpen);
        
        // Atributo de accesibilidad convertido explícitamente a String
        this.DOM.mobileToggle.setAttribute("aria-expanded", String(isOpen));
    },

    /**
     * 2. CONTROL COMPACTO DEL STICKY HEADER (Scroll Monitor)
     */
    initStickyHeader: function () {
        const evaluarScroll = () => {
            if (!this.DOM.header) return;

            if (window.scrollY > this.config.scrollUmbral) {
                this.DOM.header.classList.add("header-scrolled");
            } else {
                this.DOM.header.classList.remove("header-scrolled");
            }
        };

        window.addEventListener("scroll", evaluarScroll);
        // Evaluación inmediata por si la página se recarga con scroll activo
        evaluarScroll();
    },

    /**
     * 3. ALGORITMO DE ANIMACIÓN PARA CONTADORES ESTADÍSTICOS DE RENDIMIENTO
     */
    initContadoresDinamicos: function () {
        if (!this.DOM.statNumbers || this.DOM.statNumbers.length === 0) return;

        // API de Intersection Observer para disparar la animación solo cuando es visible en pantalla
        const observerOptions = { threshold: 0.2, rootMargin: "0px" };
        
        const observer = new IntersectionObserver((entries, observerInstance) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animarContador(entry.target);
                    observerInstance.unobserve(entry.target); // Detener observación una vez ejecutado
                }
            });
        }, observerOptions);

        this.DOM.statNumbers.forEach(stat => observer.observe(stat));
    },

    animarContador: function (elemento: Element) {
        const limiteMaximo = parseInt(elemento.getAttribute("data-target") || "0", 10);
        if (isNaN(limiteMaximo)) return;

        let tiempoInicio: number | null = null;

        const pasoAnimacion = (timestamp: number) => {
            if (!tiempoInicio) tiempoInicio = timestamp;
            const tiempoTranscurrido = timestamp - tiempoInicio;
            
            // Fracción de progreso basada en una curva lineal fluida
            const progreso = Math.min(tiempoTranscurrido / this.config.animacionDuracion, 1);
            const valorActual = Math.floor(progreso * limiteMaximo);

            elemento.textContent = valorActual.toLocaleString();

            if (progreso < 1) {
                requestAnimationFrame(pasoAnimacion);
            } else {
                elemento.textContent = limiteMaximo.toLocaleString() + (limiteMaximo === 14 ? "" : "+");
            }
        };

        requestAnimationFrame(pasoAnimacion);
    },

    /**
     * 4. VALIDACIÓN RIGUROSA E INGESTA DE FORMULARIO DE SERVICIOS
     */
    procesarFormulario: function (evento: Event) {
        evento.preventDefault();

        const inputNombre = document.getElementById("nombre") as HTMLInputElement;
        const inputCorreo = document.getElementById("correo") as HTMLInputElement;
        const inputRequerimiento = document.getElementById("tipo-requerimiento") as HTMLSelectElement;
        const inputMensaje = document.getElementById("mensaje") as HTMLInputElement;

        if (!inputNombre || !inputCorreo || !inputRequerimiento || !inputMensaje) return;

        const nombre = inputNombre.value.trim();
        const correo = inputCorreo.value.trim();
        const requerimiento = inputRequerimiento.value;
        const mensaje = inputMensaje.value.trim();

        // Regex estricta para validación de nodos de correo corporativo/sanitario
        const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (nombre.length < 3) {
            alert("Por favor, ingrese un nombre o institución válido (mínimo 3 caracteres).");
            inputNombre.focus();
            return;
        }

        if (!regexCorreo.test(correo)) {
            alert("Por favor, ingrese un correo electrónico corporativo o institucional válido.");
            inputCorreo.focus();
            return;
        }

        if (requerimiento === "") {
            alert("Por favor, seleccione el direccionamiento de su requerimiento.");
            inputRequerimiento.focus();
            return;
        }

        if (mensaje.length < 15) {
            alert("Especifique con mayor claridad el alcance de su solicitud (mínimo 15 caracteres).");
            inputMensaje.focus();
            return;
        }

        // Traza analítica de datos en consola
        console.log(`%c[Jade Core Node] Ingestando requerimiento sector: ${requerimiento.toUpperCase()}`, "color: #4B9F86; font-weight: bold;");
        
        this.emitirFeedbackExito(nombre, requerimiento);
        this.DOM.formContacto?.reset();
    },

    emitirFeedbackExito: function (usuario: string, area: string) {
        let canalAsignado = "";

        switch (area) {
            case "clinica":
                canalAsignado = "Departamento de Nutrición Clínica y Soporte Renal Especializado. Un especialista clínico evaluará los antecedentes.";
                break;
            case "data":
                canalAsignado = "Área de Ingeniería de Datos & Arquitectura de IA. Se ha generado un ticket para estructurar la automatización solicitada.";
                break;
            case "gestion":
                canalAsignado = "División de Gestión en Salud y Auditoría Estratégica IPRESS. Un consultor sénior preparará el análisis de Hoja Gerencial.";
                break;
            default:
                canalAsignado = "Ecosistema Central de Operaciones Jade Core.";
        }

        alert(`¡Registro Exitoso, ${usuario}!\n\nSu solicitud ha sido direccionada a:\n${canalAsignado}\n\nCódigo de transacción procesado en logs.`);
    },

    /**
     * 5. DESCARGA AUDITABLE DE RECURSOS TÉCNICOS
     */
    ejecutarDescargaSegura: function (elemento: HTMLElement) {
        const documentoCodigo = elemento.getAttribute("data-doc");
        const tituloContenedor = elemento.querySelector(".recurso-title");
        const nombreDocumento = tituloContenedor ? tituloContenedor.textContent : "Documento Técnico";

        // Registro logs para la auditoría de Business Intelligence (BI) de la plataforma
        console.log(`%c[BI Data Log] Interacción registrada - Descarga: ${documentoCodigo}`, "color: #6C757D; font-style: italic;");
        
        alert(`Iniciando conexión segura con el servidor de archivos...\nDescargando: "${nombreDocumento}"\n\nEl archivo se almacenará de forma automatizada en su dispositivo.`);
    }
};

// Inicialización del Namespace al cargar la estructura del DOM
document.addEventListener("DOMContentLoaded", () => {
    JadeCoreHome.init();
});