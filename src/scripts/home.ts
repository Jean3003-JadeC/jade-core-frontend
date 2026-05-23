/**
 * ==========================================================================
 * JADE CORE - MÓDULO: HOME / NAVEGACIÓN GLOBAL (SPA Version)
 * Componentes: Menú Responsive Corporativo
 * ==========================================================================
 */

interface HomeDOM {
    navMenu?: HTMLElement | null;
    mobileToggle?: HTMLElement | null;
}

const JadeCoreHome = {
    // 1. SELECTORES DEL DOM
    dom: {} as HomeDOM,

    initSelectors: function() {
        // Mapeado a los IDs del nuevo header en index.html
        this.dom.mobileToggle = document.getElementById('mobileNavToggle');
        this.dom.navMenu = document.getElementById('mainNav');
    },

    // 2. ENTRY POINT
    init: function() {
        this.initSelectors();
        this.registerEvents();
        console.log('%c[Jade Core Node]: Módulo Home / UI Inicializado', 'color: #4B9F86;');
    },

    // 3. REGISTRO DE EVENTOS
    registerEvents: function() {
        if (this.dom.mobileToggle && this.dom.navMenu) {
            this.dom.mobileToggle.addEventListener('click', () => this.toggleMobileNavigation());
        }
    },

    // 4. CONTROLADOR DEL MENÚ RESPONSIVE
    toggleMobileNavigation: function() {
        if (!this.dom.mobileToggle || !this.dom.navMenu) return;

        // Alternar la clase 'is-active' según tu nuevo CSS
        const isOpen = this.dom.mobileToggle.classList.toggle('is-active');
        this.dom.navMenu.classList.toggle('is-active');
        
        // Mantener accesibilidad estricta
        this.dom.mobileToggle.setAttribute('aria-expanded', String(isOpen));
    }
};

// EJECUCIÓN DIRECTA MENÚ
JadeCoreHome.init();


/**
 * ==========================================================================
 * JADE CORE - HOME SCRIPT
 * Módulo: Renderizado Analítico de Nodos (Simulación IPRESS Interactiva)
 * ==========================================================================
 */

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

    // =========================================================
    // 1. DATA FICTICIA INYECTADA (MOCK JSON)
    // =========================================================
    interface IpressData {
        id: string;
        name: string;
        chronicPatients: number;
        avgEGFR: number; 
    }

    // Datos simulados listos para visualizar en el tooltip
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

    // Multiplicamos los datos simulando múltiples pacientes por centro para que el lienzo se vea lleno
    const expandedData: IpressData[] = [];
    for(let i = 0; i < 6; i++) {
        mockRISData.forEach(node => expandedData.push({...node, id: `${node.id}-${i}`}));
    }

    // =========================================================
    // 2. INTERACCIÓN DEL MOUSE
    // =========================================================
    let mouse = { x: -1000, y: -1000 };
    container.addEventListener('mousemove', (e) => {
        const rect = container.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
    });
    container.addEventListener('mouseleave', () => {
        mouse = { x: -1000, y: -1000 };
    });

    // =========================================================
    // 3. CONSTRUCTOR LÓGICO DEL NODO
    // =========================================================
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
            
            // Lógica visual: El tamaño depende de la cantidad de pacientes
            this.radius = Math.max(3, dataRecord.chronicPatients / 35); 
            
            // Lógica visual: El color depende del nivel de filtrado (eGFR)
            if (dataRecord.avgEGFR < 50) {
                this.color = '#E57373'; // Rojo
            } else if (dataRecord.avgEGFR < 65) {
                this.color = '#F6C344'; // Naranja/Amarillo
            } else {
                this.color = '#4B9F86'; // Verde Jade Core
            }
        }

        update() {
            // Rebote suave en los bordes del recuadro
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

    // =========================================================
    // 4. MOTOR DE ANIMACIÓN Y RENDERIZADO DE TOOLTIPS
    // =========================================================
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

                // Dibuja las líneas grises entre nodos que estén cerca
                if (distance < 100) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(108, 117, 125, ${0.5 - distance / 200})`; 
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(nodes[i].x, nodes[i].y);
                    ctx.lineTo(nodes[j].x, nodes[j].y);
                    ctx.stroke();
                }
            }

            // Dibuja la línea de conexión hacia el puntero del mouse
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

            // Detectar si el cursor está tocando el nodo para mostrar el tooltip
            if (mouseDistance < nodes[i].radius + 5) {
                hoveredNode = nodes[i];
            }
        }

        // DIBUJAR LA ETIQUETA DE INFORMACIÓN (TOOLTIP)
        if (hoveredNode) {
            ctx.fillStyle = 'rgba(74, 77, 80, 0.95)'; // Fondo color Carbono
            
            // Dibujar rectángulo del Tooltip
            const boxWidth = 220;
            const boxHeight = 65;
            const boxX = hoveredNode.x + 15;
            const boxY = hoveredNode.y - boxHeight / 2;
            
            // Borde redondeado
            ctx.beginPath();
            ctx.roundRect(boxX, boxY, boxWidth, boxHeight, 6);
            ctx.fill();

            // Renderizar Texto: Nombre de la IPRESS
            ctx.fillStyle = '#FFFFFF';
            ctx.font = 'bold 12px Montserrat, sans-serif';
            ctx.fillText(hoveredNode.data.name, boxX + 12, boxY + 22);
            
            // Renderizar Texto: Datos metabólicos y métricas
            ctx.font = '11px Open Sans, sans-serif';
            ctx.fillStyle = '#A0AEC0'; // Color niebla claro
            ctx.fillText(`Pacientes Crónicos: ${hoveredNode.data.chronicPatients}`, boxX + 12, boxY + 40);
            
            // Colorear el texto de eGFR según su estado de salud
            ctx.fillStyle = hoveredNode.color;
            ctx.fillText(`Promedio eGFR: ${hoveredNode.data.avgEGFR} mL/min`, boxX + 12, boxY + 56);
        }

        requestAnimationFrame(animate);
    }

    animate();
}

// EJECUCIÓN DIRECTA NODOS
initDataNodes();