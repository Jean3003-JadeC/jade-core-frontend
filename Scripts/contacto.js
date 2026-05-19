/**
 * ==========================================================================
 * JADE CORE - MÓDULO 7: CONTACTO E INTEGRACIÓN DE SERVICIOS
 * Patrón de Arquitectura: Namespace Pattern (Producción Core)
 * Componentes: Menú Responsive UI, Formulario Dinámico, Validación, Simulador
 * ==========================================================================
 */

const JadeCoreContact = {
    // 1. ESTADO INTERNO DEL MÓDULO (STATE MANAGEMENT)
    state: {
        selectedRequirement: '',
        selectedServicePrice: 0,
        taxRate: 0.18 // IGV de precisión para la legislación nacional
    },

    // 2. SELECTORES DE ELEMENTOS DEL DOM (CACHE DOM)
    dom: {},

    initSelectors: function() {
        // Selectores de Infraestructura Global (Navbar Móvil)
        this.dom.navToggle = document.querySelector('.mobile-nav-toggle');
        this.dom.navMenu = document.querySelector('.nav-menu');

        // Selectores del Formulario Clínico
        this.dom.form = document.getElementById('contactForm');
        this.dom.userName = document.getElementById('userName');
        this.dom.userEmail = document.getElementById('userEmail');
        this.dom.requirementType = document.getElementById('requirementType');
        this.dom.dynamicFieldsContainer = document.getElementById('dynamicFieldsContainer');
        this.dom.message = document.getElementById('message');
        
        // Selectores del Simulador de Pagos
        this.dom.serviceSelect = document.getElementById('serviceSelect');
        this.dom.paymentSummary = document.getElementById('paymentSummary');
        this.dom.summarySubtotal = document.getElementById('summarySubtotal');
        this.dom.summaryTax = document.getElementById('summaryTax');
        this.dom.summaryTotal = document.getElementById('summaryTotal');
        this.dom.btnGeneratePayment = document.getElementById('btnGeneratePayment');
    },

    // 3. MÉTODO DE INICIALIZACIÓN (ENTRY POINT)
    init: function() {
        this.initSelectors();
        this.registerEvents();
    },

    // 4. REGISTRO DE ESCUCHADORES DE EVENTOS (EVENT BINDING)
    registerEvents: function() {
        // Evento de Interfaz: Menú Adaptativo
        if (this.dom.navToggle && this.dom.navMenu) {
            this.dom.navToggle.addEventListener('click', () => this.handleMenuToggle());
        }

        // Eventos del Formulario Clínico
        if (this.dom.form) {
            this.dom.requirementType.addEventListener('change', (e) => this.handleRequirementChange(e));
            this.dom.form.addEventListener('submit', (e) => this.handleFormSubmit(e));
            
            // Limpieza reactiva de estados inválidos en inputs
            const inputs = [this.dom.userName, this.dom.userEmail, this.dom.message, this.dom.requirementType];
            inputs.forEach(input => {
                if (input) {
                    input.addEventListener('input', (e) => this.clearFieldError(e.target));
                }
            });
        }

        // Eventos del Simulador de Transacciones
        if (this.dom.serviceSelect) {
            this.dom.serviceSelect.addEventListener('change', (e) => this.handleServiceSelection(e));
        }
        if (this.dom.btnGeneratePayment) {
            this.dom.btnGeneratePayment.addEventListener('click', () => this.executePaymentSimulation());
        }
    },

    // 5. CONTROLADOR DEL MENÚ RESPONSIVE INTERACTIVO
    handleMenuToggle: function() {
        const isOpen = this.dom.navMenu.classList.contains('nav-active');
        
        if (isOpen) {
            this.dom.navMenu.classList.remove('nav-active');
            this.dom.navToggle.classList.remove('nav-active');
            this.dom.navToggle.setAttribute('aria-expanded', 'false');
        } else {
            this.dom.navMenu.classList.add('nav-active');
            this.dom.navToggle.classList.add('nav-active');
            this.dom.navToggle.setAttribute('aria-expanded', 'true');
        }
    },

    // 6. LÓGICA DE CAMPOS CONDICIONALES / DINÁMICOS
    handleRequirementChange: function(event) {
        this.state.selectedRequirement = event.target.value;
        let dynamicHTML = '';

        switch(this.state.selectedRequirement) {
            case 'nutricion_renal':
                dynamicHTML = `
                    <div class="form-group" style="animation: fadeIn 0.3s ease-out forwards;">
                        <label for="clinicalHistory" class="clinical-form__label">¿Cuenta con Diagnóstico o Interconsulta Médica previa?</label>
                        <select id="clinicalHistory" name="clinicalHistory" class="clinical-form__select">
                            <option value="si">Sí, cuento con informe de nefrología / soporte</option>
                            <option value="no">No, requiero evaluación diagnóstica inicial</option>
                        </select>
                    </div>
                `;
                break;
            case 'auditoria_gestion':
                dynamicHTML = `
                    <div class="form-group" style="animation: fadeIn 0.3s ease-out forwards;">
                        <label for="ipressType" class="clinical-form__label">Tipo de Establecimiento Sanitario (IPRESS)</label>
                        <input type="text" id="ipressType" name="ipressType" class="clinical-form__input" placeholder="Ej. Centro Médico, Red Asistencial, Clínica Privada">
                    </div>
                `;
                break;
            case 'integracion_ia':
                dynamicHTML = `
                    <div class="form-group" style="animation: fadeIn 0.3s ease-out forwards;">
                        <label for="dataSource" class="clinical-form__label">Origen o Infraestructura de Datos Base</label>
                        <select id="dataSource" name="dataSource" class="clinical-form__select">
                            <option value="sql_emr">Bases de Datos Relacionales / Historias Clínicas Electrónicas</option>
                            <option value="hojas_gerenciales">Hojas Gerenciales / Matrices Estadísticas Excel</option>
                            <option value="no_estructurado">Datos No Estructurados / APIs de Terceros</option>
                        </select>
                    </div>
                `;
                break;
            default:
                dynamicHTML = '';
        }

        this.dom.dynamicFieldsContainer.innerHTML = dynamicHTML;
    },

    // 7. CONTROLADOR DE VALIDACIÓN DE FORMULARIO CORPORATIVO
    handleFormSubmit: function(event) {
        event.preventDefault();
        let isFormValid = true;

        if (this.dom.userName.value.trim().length < 4) {
            this.setFieldError(this.dom.userName, 'El nombre institucional o personal debe contener al menos 4 caracteres.');
            isFormValid = false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(this.dom.userEmail.value.trim())) {
            this.setFieldError(this.dom.userEmail, 'Ingrese una dirección de correo electrónico institucional válida.');
            isFormValid = false;
        }

        if (!this.dom.requirementType.value) {
            this.setFieldError(this.dom.requirementType, 'Debe seleccionar un área de requerimiento de Jade Core.');
            isFormValid = false;
        }

        if (this.dom.message.value.trim().length < 15) {
            this.setFieldError(this.dom.message, 'La descripción del caso clínico o corporativo debe ser más detallada (mínimo 15 caracteres).');
            isFormValid = false;
        }

        if (isFormValid) {
            this.processValidSubmission();
        }
    },

    setFieldError: function(element, message) {
        element.classList.add('is-invalid');
        const errorSpan = document.getElementById(`error-${element.id}`);
        if (errorSpan) {
            errorSpan.textContent = message;
        }
    },

    clearFieldError: function(element) {
        element.classList.remove('is-invalid');
        const errorSpan = document.getElementById(`error-${element.id}`);
        if (errorSpan) {
            errorSpan.textContent = '';
        }
    },

    processValidSubmission: function() {
        const submitButton = this.dom.form.querySelector('.clinical-form__submit');
        submitButton.disabled = true;
        submitButton.textContent = 'Procesando e Encriptando Solicitud...';

        setTimeout(() => {
            alert(`Solicitud registrada con éxito.\nUn especialista de la división de Jade Core se comunicará con usted de forma prioritaria.`);
            this.dom.form.reset();
            this.dom.dynamicFieldsContainer.innerHTML = '';
            submitButton.disabled = false;
            submitButton.textContent = 'Procesando e Iniciar Solicitud';
        }, 1500);
    },

    // 8. MOTOR LÓGICO DEL SIMULADOR DE ARANCELES Y FACTURACIÓN
    handleServiceSelection: function(event) {
        const value = parseFloat(event.target.value);
        this.state.selectedServicePrice = value;

        if (value > 0) {
            const total = this.state.selectedServicePrice;
            const subtotal = total / (1 + this.state.taxRate);
            const tax = total - subtotal;

            this.dom.summarySubtotal.textContent = `S/ ${subtotal.toFixed(2)}`;
            this.dom.summaryTax.textContent = `S/ ${tax.toFixed(2)}`;
            this.dom.summaryTotal.textContent = `S/ ${total.toFixed(2)}`;

            this.dom.paymentSummary.style.display = 'flex';
        } else {
            this.dom.paymentSummary.style.display = 'none';
        }
    },

    executePaymentSimulation: function() {
        const selectedText = this.dom.serviceSelect.options[this.dom.serviceSelect.selectedIndex].text;
        const finalAmount = this.state.selectedServicePrice.toFixed(2);
        
        alert(`ORDEN DE LIQUIDACIÓN GENERADA\n\nConcepto: ${selectedText}\nMonto Total: S/ ${finalAmount}\n\nUtilice el código de transacción para liquidar mediante Yape o PagoEfectivo.`);
    }
};

// Inicialización segura del ciclo de vida del módulo una vez cargado el DOM
document.addEventListener('DOMContentLoaded', () => {
    JadeCoreContact.init();
});