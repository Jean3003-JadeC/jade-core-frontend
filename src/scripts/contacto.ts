/**
 * ==========================================================================
 * JADE CORE - MÓDULO: CONTACTO E INTEGRACIÓN DE SERVICIOS (SPA Version)
 * Componentes: Formulario Clínico, Validación, Simulador de Aranceles
 * ==========================================================================
 */

interface ContactDOM {
    form?: HTMLFormElement | null;
    txtName?: HTMLInputElement | null;
    txtEmail?: HTMLInputElement | null;
    ddlService?: HTMLSelectElement | null;
    txtMessage?: HTMLTextAreaElement | null;
    btnCalculate?: HTMLElement | null;
    lblTotal?: HTMLElement | null;
}

const JadeCoreContact = {
    // 1. SELECTORES DEL DOM
    dom: {} as ContactDOM,

    initSelectors: function() {
        // Mapeado estrictamente a los IDs de tu nuevo index.html
        this.dom.form = document.getElementById('contactForm') as HTMLFormElement;
        this.dom.txtName = document.getElementById('txtName') as HTMLInputElement;
        this.dom.txtEmail = document.getElementById('txtEmail') as HTMLInputElement;
        this.dom.ddlService = document.getElementById('ddlService') as HTMLSelectElement;
        this.dom.txtMessage = document.getElementById('txtMessage') as HTMLTextAreaElement;
        
        // Selectores del simulador unitario
        this.dom.btnCalculate = document.getElementById('btnCalculate');
        this.dom.lblTotal = document.getElementById('lblTotal');
    },

    // 2. ENTRY POINT
    init: function() {
        this.initSelectors();
        this.registerEvents();
        console.log('%c[Jade Core Node]: Módulo de Contacto Inicializado', 'color: #4B9F86;');
    },

    // 3. REGISTRO DE EVENTOS
    registerEvents: function() {
        // Evento principal del formulario
        if (this.dom.form) {
            this.dom.form.addEventListener('submit', (e: Event) => this.handleFormSubmit(e));
            
            // Limpieza reactiva de errores al escribir
            const inputs = [this.dom.txtName, this.dom.txtEmail, this.dom.txtMessage, this.dom.ddlService];
            inputs.forEach(input => {
                if (input) {
                    input.addEventListener('input', (e: Event) => {
                        this.clearFieldError(e.target as HTMLElement);
                    });
                }
            });
        }

        // Evento del simulador de pagos
        if (this.dom.btnCalculate) {
            this.dom.btnCalculate.addEventListener('click', () => this.executePaymentSimulation());
        }
    },

    // 4. VALIDACIÓN DE FORMULARIO CORPORATIVO
    handleFormSubmit: function(event: Event) {
        event.preventDefault();
        let isFormValid = true;

        if (!this.dom.txtName || !this.dom.txtEmail || !this.dom.ddlService || !this.dom.txtMessage) return;

        // Validación de Nombre
        if (this.dom.txtName.value.trim().length < 4) {
            this.setFieldError(this.dom.txtName, 'El nombre institucional debe contener al menos 4 caracteres.');
            isFormValid = false;
        }

        // Validación de Correo
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(this.dom.txtEmail.value.trim())) {
            this.setFieldError(this.dom.txtEmail, 'Ingrese una dirección de correo institucional válida.');
            isFormValid = false;
        }

        // Validación de Servicio
        if (!this.dom.ddlService.value) {
            this.setFieldError(this.dom.ddlService, 'Debe seleccionar un área de requerimiento (Nutrición, Datos o BI).');
            isFormValid = false;
        }

        // Validación de Mensaje
        if (this.dom.txtMessage.value.trim().length < 15) {
            this.setFieldError(this.dom.txtMessage, 'La descripción clínica o corporativa debe ser más detallada (mínimo 15 caracteres).');
            isFormValid = false;
        }

        if (isFormValid) {
            this.processValidSubmission();
        }
    },

    // 5. MANEJO DE ERRORES UI
    setFieldError: function(element: HTMLElement, message: string) {
        element.classList.add('is-invalid');
        const errorSpan = document.getElementById(`error-${element.id}`);
        if (errorSpan) {
            errorSpan.textContent = message;
            errorSpan.style.display = 'block';
        }
    },

    clearFieldError: function(element: HTMLElement) {
        element.classList.remove('is-invalid');
        const errorSpan = document.getElementById(`error-${element.id}`);
        if (errorSpan) {
            errorSpan.textContent = '';
            errorSpan.style.display = 'none';
        }
    },

    // 6. PROCESAMIENTO
    processValidSubmission: function() {
        if (!this.dom.form) return;

        const submitButton = this.dom.form.querySelector('.clinical-form__submit') as HTMLButtonElement;
        if (submitButton) {
            submitButton.disabled = true;
            submitButton.textContent = 'Procesando Encriptación...';
        }

        setTimeout(() => {
            const servicio = this.dom.ddlService?.value.toUpperCase();
            alert(`Solicitud de ${servicio} registrada con éxito.\nUn especialista de Jade Core se comunicará con usted.`);
            
            this.dom.form?.reset();
            
            if (submitButton) {
                submitButton.disabled = false;
                submitButton.textContent = 'Enviar Solicitud de Precisión';
            }
        }, 1500);
    },

    // 7. SIMULADOR UNITARIO DE ARANCELES (Adaptado al nuevo HTML)
    executePaymentSimulation: function() {
        if (!this.dom.lblTotal) return;

        this.dom.lblTotal.textContent = "S/ Consultando BD...";
        this.dom.lblTotal.style.opacity = "0.5";
        
        // Simulación asíncrona de consulta a motor de reglas
        setTimeout(() => {
            // Se puede hacer dinámico leyendo el valor de un select si se desea a futuro
            this.dom.lblTotal!.textContent = "S/ 350.00"; 
            this.dom.lblTotal!.style.opacity = "1";
            console.log("%c[Business Intelligence] Arancel liquidado", "color: #6C757D;");
        }, 850);
    }
};

// EJECUCIÓN DIRECTA: Ya no usamos DOMContentLoaded porque main.ts importa este archivo 
// dinámicamente solo cuando la sección #contacto ya es visible en el DOM.
JadeCoreContact.init();