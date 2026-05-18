/**
 * JADE CORE - Lógica de Interactividad y Funciones Clínico-Tecnológicas
 * Archivo: funciones.js
 * Carpeta: /Scripts/
 */

document.addEventListener("DOMContentLoaded", function () {
    
    // ==========================================================================
    // 1. CONFIGURACIÓN DEL STICKY HEADER DINÁMICO
    // ==========================================================================
    const header = document.querySelector("header");
    const scrollUmbral = 50; // Pixeles a partir de los cuales cambia el header

    window.addEventListener("scroll", function () {
        if (window.scrollY > scrollUmbral) {
            header.classList.add("header-scrolled");
            // Nota: La clase 'header-scrolled' la puedes usar en CSS para 
            // reducir la altura a 70px o cambiar opacidades si lo deseas.
        } else {
            header.classList.remove("header-scrolled");
        }
    });

    // ==========================================================================
    // 2. NAVEGACIÓN ACTIVA (Scroll Spy)
    // ==========================================================================
    const secciones = document.querySelectorAll("main > section");
    const enlacesNav = document.querySelectorAll("header nav ul li a");

    window.addEventListener("scroll", function () {
        let seccionActual = "";
        
        secciones.forEach(seccion => {
            const seccionTop = seccion.offsetTop;
            const seccionHeight = seccion.clientHeight;
            
            // Evaluamos si el scroll actual se encuentra dentro del rango de la sección
            if (window.scrollY >= (seccionTop - 120)) {
                seccionActual = seccion.getAttribute("id");
            }
        });

        enlacesNav.forEach(enlace => {
            enlace.parentElement.classList.remove("active");
            if (enlace.getAttribute("href") === `#${seccionActual}`) {
                enlace.parentElement.classList.add("active");
            }
        });
    });

    // ==========================================================================
    // 3. VALIDACIÓN ESTRICTA Y SEGMENTACIÓN DEL FORMULARIO DE CONTACTO
    // ==========================================================================
    const formularioContacto = document.querySelector("#contacto-formulario form");

    if (formularioContacto) {
        formularioContacto.addEventListener("submit", function (evento) {
            evento.preventDefault(); // Detener el envío por defecto para validar

            // Captura de campos
            const nombre = document.getElementById("nombre").value.trim();
            const correo = document.getElementById("correo").value.trim();
            const requerimiento = document.getElementById("tipo-requerimiento").value;
            const mensaje = document.getElementById("mensaje").value.trim();

            // Expresión regular para validación rigurosa de correo electrónico
            const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            // Validaciones de seguridad y completitud
            if (nombre === "" || nombre.length < 3) {
                alert("Por favor, ingrese un nombre válido (mínimo 3 caracteres).");
                document.getElementById("nombre").focus();
                return;
            }

            if (!regexCorreo.test(correo)) {
                alert("Por favor, ingrese una dirección de correo electrónico válida.");
                document.getElementById("correo").focus();
                return;
            }

            if (mensaje === "" || mensaje.length < 10) {
                alert("Por favor, detalle su mensaje o requerimiento con mayor precisión (mínimo 10 caracteres).");
                document.getElementById("mensaje").focus();
                return;
            }

            // Flujo lógico de enrutamiento según el área corporativa seleccionada
            console.log(`%c[Jade Core Log] Procesando solicitud para el área: ${requerimiento.toUpperCase()}`, "color: #4B9F86; font-weight: bold;");
            
            // Simulación de envío exitoso a través de infraestructura de datos
            mostrarMensajeExito(nombre, requerimiento);
            formularioContacto.reset();
        });
    }

    /**
     * Función auxiliar para dar feedback visual premium al usuario tras el envío
     */
    function mostrarMensajeExito(usuario, area) {
        let mensajeCanal = "";
        
        switch (area) {
            case "clinica":
                mensajeCanal = "Su solicitud ha sido derivada al departamento de Nutrición Clínica y Renal. Un especialista evaluará sus datos a la brevedad.";
                break;
            case "data":
                mensajeCanal = "Solicitud recibida por el área de Ingeniería de Datos e IA. Nos comunicaremos para estructurar los flujos solicitados.";
                break;
            case "gestion":
                mensajeCanal = "Consulta enviada a Gestión en Salud. Un auditor estratégico preparará la propuesta para su IPRESS / RIS.";
                break;
            default:
                mensajeCanal = "Su solicitud ha sido registrada en el ecosistema central de Jade Core.";
        }

        alert(`¡Muchas gracias, ${usuario}!\n\n${mensajeCanal}\n\nCódigo de seguimiento generado en consola.`);
    }

    // ==========================================================================
    // 4. SIMULACIÓN DE DESCARGA SEGURA DE RECURSOS DESTACADOS
    // ==========================================================================
    const tarjetasRecursos = document.querySelectorAll(".bloque-recursos ul li");

    tarjetasRecursos.forEach(tarjeta => {
        tarjeta.style.cursor = "pointer"; // Cambiamos el cursor para denotar interacción
        
        tarjeta.addEventListener("click", function () {
            const etiqueta = this.querySelector("label");
            const recursoNombre = etiqueta ? etiqueta.textContent : "Recurso Técnico";
            
            // Simulación de descarga e interacción en logs para auditoría de BI
            console.log(`%c[BI Analytics] Descarga iniciada: ${recursoNombre}`, "color: #6C757D;");
            alert(`Iniciando la descarga segura del documento:\n"${recursoNombre}"\n\nEl archivo PDF se guardará en su dispositivo.`);
        });
    });
});