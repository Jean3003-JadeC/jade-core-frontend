/**
 * ==========================================================================
 * JADE CORE - MÓDULO UNIFICADO: HOME (index.html)
 * Integra lógica de: Navegación, Nosotros, Servicios, Recursos y Contacto.
 * ==========================================================================
 */

// --------------------------------------------------------------------------
// 1. NAVEGACIÓN Y MENÚ MÓVIL
// --------------------------------------------------------------------------
const JadeCoreHome = {
    dom: {
        mobileToggle: document.getElementById('mobileNavToggle'),
        navMenu: document.getElementById('mainNav')
    },
    init: function() {
        if (this.dom.mobileToggle && this.dom.navMenu) {
            this.dom.mobileToggle.addEventListener('click', () => {
                const isOpen = this.dom.mobileToggle!.classList.toggle('is-active');
                this.dom.navMenu!.classList.toggle('is-active');
                this.dom.mobileToggle!.setAttribute('aria-expanded', String(isOpen));
            });
        }
    }
};
JadeCoreHome.init();

// --------------------------------------------------------------------------
// 2. SECCIÓN NOSOTROS (Identidad Core & Gráfico Interactivo)
// --------------------------------------------------------------------------
const sectionNosotros = document.getElementById('nosotros');
if (sectionNosotros) {
    // Animación escalonada de Pilares Core
    const pillarCards = sectionNosotros.querySelectorAll('.pillar-card');
    pillarCards.forEach((card, index) => {
        const htmlCard = card as HTMLElement;
        htmlCard.style.opacity = '0';
        htmlCard.style.transform = 'translateY(30px)';
        htmlCard.style.transition = 'opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1), transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        
        setTimeout(() => {
            htmlCard.style.opacity = '1';
            htmlCard.style.transform = 'translateY(0)';
        }, 150 * (index + 1));
    });

    // Gráfico de Convergencia (Nodos interactivos)
    const ecosystemContainer = sectionNosotros.querySelector('.ecosystem-graphic-placeholder');
    if (ecosystemContainer) {
        ecosystemContainer.innerHTML = ''; // Limpieza

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
        graphContainer.style.marginTop = '2rem';

        nodesData.forEach(node => {
            const nodeElement = document.createElement('div');
            nodeElement.className = 'graph-node';
            nodeElement.setAttribute('data-node-id', node.id);
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

            nodeElement.addEventListener('mouseenter', () => {
                nodeElement.style.background = 'rgba(255, 255, 255, 0.08)';
                nodeElement.style.border = `1px solid ${node.color}`;
                nodeElement.style.transform = 'translateX(5px)';
            });

            nodeElement.addEventListener('mouseleave', () => {
                nodeElement.style.background = 'rgba(255, 255, 255, 0.03)';
                nodeElement.style.border = `1px solid ${node.color}40`;
                nodeElement.style.transform = 'translateX(0)';
            });

            graphContainer.appendChild(nodeElement);
        });

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
}

// --------------------------------------------------------------------------
// 3. SECCIÓN SERVICIOS Y RECURSOS (Lógica de Filtrado Compartida)
// --------------------------------------------------------------------------
function initSection(sectionId: string) {
    const section = document.getElementById(sectionId);
    if (!section) return;

    const filterButtons = section.querySelectorAll('.filter-btn');
    const resourceCards = section.querySelectorAll('.resource-card');

    // Cascada de carga elegante
    resourceCards.forEach((card, index) => {
        const htmlCard = card as HTMLElement;
        htmlCard.style.opacity = '0';
        htmlCard.style.transform = 'translateY(24px)';
        htmlCard.style.transition = 'opacity 0.4s ease-out, transform 0.4s ease-out';
        htmlCard.style.display = 'flex'; 

        setTimeout(() => {
            htmlCard.style.opacity = '1';
            htmlCard.style.transform = 'translateY(0)';
        }, 120 * (index + 1));
    });

    // Lógica de filtrado
    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const target = e.target as HTMLElement;

                if (target.classList.contains('active')) return;

                filterButtons.forEach(btn => {
                    btn.classList.remove('active');
                    btn.setAttribute('aria-selected', 'false');
                });
                target.classList.add('active');
                target.setAttribute('aria-selected', 'true');

                const selectedFilter = target.getAttribute('data-filter');

                resourceCards.forEach(card => {
                    const htmlCard = card as HTMLElement;
                    const cardCategory = htmlCard.getAttribute('data-category');

                    if (selectedFilter === 'all' || cardCategory === selectedFilter) {
                        htmlCard.style.display = 'flex';
                        setTimeout(() => {
                            htmlCard.style.opacity = '1';
                            htmlCard.style.transform = 'translateY(0)';
                        }, 20); 
                    } else {
                        htmlCard.style.opacity = '0';
                        htmlCard.style.transform = 'translateY(10px)';
                        setTimeout(() => {
                            htmlCard.style.display = 'none';
                        }, 400); 
                    }
                });
            });
        });
    }
}
initSection('servicios');
initSection('recursos');

// Tracking de Descargas en Recursos
const sectionRecursos = document.getElementById('recursos');
if(sectionRecursos) {
    const downloadLinks = sectionRecursos.querySelectorAll('.btn-download');
    downloadLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const target = e.target as HTMLElement;
            const docName = target.closest('.card-content')?.querySelector('.card-title')?.textContent || 'Documento Clínico';
            console.log(`%c[BI Data Log] Extracción registrada: ${docName}`, 'color: #4B9F86; font-weight: bold;');
        });
    });
}

// --------------------------------------------------------------------------
// 4. SECCIÓN CONTACTO (Formulario & Aranceles)
// --------------------------------------------------------------------------
const JadeCoreContact = {
    dom: {
        form: document.getElementById('contactForm') as HTMLFormElement,
        txtName: document.getElementById('txtName') as HTMLInputElement,
        txtEmail: document.getElementById('txtEmail') as HTMLInputElement,
        ddlService: document.getElementById('ddlService') as HTMLSelectElement,
        txtMessage: document.getElementById('txtMessage') as HTMLTextAreaElement,
        btnCalculate: document.getElementById('btnCalculate'),
        lblTotal: document.getElementById('lblTotal')
    },
    
    init: function() {
        if(this.dom.form) {
            this.dom.form.addEventListener('submit', (e) => this.handleFormSubmit(e));
            
            const inputs = [this.dom.txtName, this.dom.txtEmail, this.dom.txtMessage, this.dom.ddlService];
            inputs.forEach(input => {
                if (input) input.addEventListener('input', (e) => this.clearFieldError(e.target as HTMLElement));
            });
        }

        if(this.dom.btnCalculate) {
            this.dom.btnCalculate.addEventListener('click', () => this.executePaymentSimulation());
        }
    },

    handleFormSubmit: function(event: Event) {
        event.preventDefault();
        let isFormValid = true;

        if (this.dom.txtName.value.trim().length < 4) {
            this.setFieldError(this.dom.txtName, 'El nombre debe contener al menos 4 caracteres.');
            isFormValid = false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(this.dom.txtEmail.value.trim())) {
            this.setFieldError(this.dom.txtEmail, 'Ingrese un correo válido.');
            isFormValid = false;
        }

        if (!this.dom.ddlService.value) {
            this.setFieldError(this.dom.ddlService, 'Seleccione un área de requerimiento.');
            isFormValid = false;
        }

        if (this.dom.txtMessage.value.trim().length < 15) {
            this.setFieldError(this.dom.txtMessage, 'Descripción muy corta (mínimo 15 caracteres).');
            isFormValid = false;
        }

        if (isFormValid) {
            const btn = this.dom.form.querySelector('.clinical-form__submit') as HTMLButtonElement;
            if(btn) { btn.disabled = true; btn.textContent = 'Procesando...'; }
            
            setTimeout(() => {
                alert(`Solicitud registrada con éxito.`);
                this.dom.form.reset();
                if(btn) { btn.disabled = false; btn.textContent = 'Enviar Solicitud'; }
            }, 1500);
        }
    },

    setFieldError: function(element: HTMLElement, message: string) {
        element.classList.add('is-invalid');
        const err = document.getElementById(`error-${element.id}`);
        if(err) { err.textContent = message; err.style.display = 'block'; }
    },
    
    clearFieldError: function(element: HTMLElement) {
        element.classList.remove('is-invalid');
        const err = document.getElementById(`error-${element.id}`);
        if(err) { err.textContent = ''; err.style.display = 'none'; }
    },

    executePaymentSimulation: function() {
        if (!this.dom.lblTotal) return;
        this.dom.lblTotal.textContent = "S/ Consultando BD...";
        this.dom.lblTotal.style.opacity = "0.5";
        
        setTimeout(() => {
            this.dom.lblTotal!.textContent = "S/ 350.00"; 
            this.dom.lblTotal!.style.opacity = "1";
        }, 850);
    }
};
JadeCoreContact.init();

console.log('%c[Jade Core Node]: Módulo unificado HOME Inicializado', 'color: #4B9F86;');
// =========================================================
// 5. RENDERIZADO ANALÍTICO DE NODOS (Simulación IPRESS)
// =========================================================
function initDataNodes() {
    const container = document.getElementById('canvas-3d-container');
    if (!container) return;

    // Quitamos el texto de fondo
    container.style.setProperty('content', 'none');
    
    // Creamos el lienzo
    const canvas = document.createElement('canvas');
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.borderRadius = '8px';
    container.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Ajuste de pantalla
    let width = container.clientWidth;
    let height = container.clientHeight;
    canvas.width = width;
    canvas.height = height;

    window.addEventListener('resize', () => {
        width = container.clientWidth;
        height = container.clientHeight;
        canvas.width = width;
        canvas.height = height;
    });

    interface IpressData {
        id: string;
        name: string;
        chronicPatients: number;
        avgEGFR: number; 
    }

    const mockRISData: IpressData[] = [
        { id: 'HNCASE', name: 'Hospital Nacional CASE', chronicPatients: 450, avgEGFR: 45 }, 
        { id: 'JLYR', name: 'Hospital Base JLBYR', chronicPatients: 320, avgEGFR: 55 },      
        { id: 'SAB', name: 'CAP III Sabandía', chronicPatients: 150, avgEGFR: 75 },          
        { id: 'APL', name: 'Centro Médico Aplao', chronicPatients: 85, avgEGFR: 68 },        
        { id: 'MEL', name: 'CAP III Melitón Salas', chronicPatients: 210, avgEGFR: 60 },     
        { id: 'MIR', name: 'CAP III Miraflores', chronicPatients: 190, avgEGFR: 58 },        
        { id: 'HUN', name: 'Policlínico Metropolitano', chronicPatients: 280, avgEGFR: 52 }, 
        { id: 'YUR', name: 'CAP II Yura', chronicPatients: 60, avgEGFR: 80 }                 
    ];

    const expandedData: IpressData[] = [];
    for(let i = 0; i < 6; i++) {
        mockRISData.forEach(node => expandedData.push({...node, id: `${node.id}-${i}`}));
    }

    let mouse = { x: -1000, y: -1000 };
    container.addEventListener('mousemove', (e) => {
        const rect = container.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
    });
    container.addEventListener('mouseleave', () => {
        mouse = { x: -1000, y: -1000 };
    });

    class DataNode {
        x: number;
        y: number;
        vx: number;
        vy: number;
        data: IpressData;
        radius: number;
        color: string;

        constructor(dataRecord: IpressData) {
            this.data = dataRecord;
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = (Math.random() - 0.5) * 0.3; 
            this.vy = (Math.random() - 0.5) * 0.3;
            
            this.radius = Math.max(3, dataRecord.chronicPatients / 35); 
            
            if (dataRecord.avgEGFR < 50) {
                this.color = '#000000'; 
            } else if (dataRecord.avgEGFR < 65) {
                this.color = '#060c72'; 
            } else {
                this.color = '#4B9F86'; 
            }
        }

        update() {
            if (this.x < 0 || this.x > width) this.vx *= -1;
            if (this.y < 0 || this.y > height) this.vy *= -1;
            this.x += this.vx;
            this.y += this.vy;
        }

        draw() {
            if (!ctx) return;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
        }
    }

    const nodes: DataNode[] = expandedData.map(record => new DataNode(record));

    function animate() {
        if (!ctx) return;
        ctx.clearRect(0, 0, width, height);

        let hoveredNode: DataNode | null = null;

        for (let i = 0; i < nodes.length; i++) {
            nodes[i].update();
            nodes[i].draw();

            for (let j = i; j < nodes.length; j++) {
                const dx = nodes[i].x - nodes[j].x;
                const dy = nodes[i].y - nodes[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 100) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(108, 117, 125, ${0.5 - distance / 200})`; 
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(nodes[i].x, nodes[i].y);
                    ctx.lineTo(nodes[j].x, nodes[j].y);
                    ctx.stroke();
                }
            }

            const mouseDx = nodes[i].x - mouse.x;
            const mouseDy = nodes[i].y - mouse.y;
            const mouseDistance = Math.sqrt(mouseDx * mouseDx + mouseDy * mouseDy);
            
            if (mouseDistance < 100) {
                ctx.beginPath();
                ctx.strokeStyle = nodes[i].color; 
                ctx.globalAlpha = 0.8 - mouseDistance / 100;
                ctx.lineWidth = 1;
                ctx.moveTo(nodes[i].x, nodes[i].y);
                ctx.lineTo(mouse.x, mouse.y);
                ctx.stroke();
                ctx.globalAlpha = 1.0; 
            }

            if (mouseDistance < nodes[i].radius + 5) {
                hoveredNode = nodes[i];
            }
        }

        if (hoveredNode) {
            ctx.fillStyle = 'rgba(74, 77, 80, 0.95)'; 
            
            const boxWidth = 220;
            const boxHeight = 65;
            const boxX = hoveredNode.x + 15;
            const boxY = hoveredNode.y - boxHeight / 2;
            
            ctx.beginPath();
            ctx.roundRect(boxX, boxY, boxWidth, boxHeight, 6);
            ctx.fill();

            ctx.fillStyle = '#FFFFFF';
            ctx.font = 'bold 12px Montserrat, sans-serif';
            ctx.fillText(hoveredNode.data.name, boxX + 12, boxY + 22);
            
            ctx.font = '11px Open Sans, sans-serif';
            ctx.fillStyle = '#A0AEC0'; 
            ctx.fillText(`Pacientes Crónicos: ${hoveredNode.data.chronicPatients}`, boxX + 12, boxY + 40);
            
            ctx.fillStyle = hoveredNode.color;
            ctx.fillText(`Promedio eGFR: ${hoveredNode.data.avgEGFR} mL/min`, boxX + 12, boxY + 56);
        }

        requestAnimationFrame(animate);
    }

    animate();
}

// Ejecutamos la animación al final del script
initDataNodes();