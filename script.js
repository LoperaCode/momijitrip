// --- 1. LÓGICA DE ACORDEÓN PARA LAS TARJETAS ---
function toggleCard(headerElement) {
    const card = headerElement.parentElement;
    const wasActive = card.classList.contains('active');
    
    // Opcional: Cerrar las demás tarjetas al abrir una nueva
    document.querySelectorAll('.day-card').forEach(c => c.classList.remove('active'));
    
    // Si no estaba activa, la abrimos
    if (!wasActive) {
        card.classList.add('active');
    }
}

// --- 2. SISTEMA DE MISIONES Y SELLOS HANKO ---
function toggleMission(missionElement, missionId) {
    missionElement.classList.toggle('completed');
    const isCompleted = missionElement.classList.contains('completed');
    
    // Guardar estado en localStorage
    localStorage.setItem(missionId, isCompleted);
    
    updateProgress();
}

function updateProgress() {
    const allMissions = document.querySelectorAll('.mission-item');
    const completedMissions = document.querySelectorAll('.mission-item.completed');
    
    const total = allMissions.length;
    const completed = completedMissions.length;
    const percent = total > 0 ? Math.round((completed / total) * 100) : 0;
    
    // Actualizar elementos visuales en pantalla
    document.getElementById('completedCount').textContent = completed;
    document.getElementById('progressPercent').textContent = percent;
    document.getElementById('globalProgressBar').style.width = percent + '%';
}

// Cargar estado guardado al iniciar la página
window.addEventListener('DOMContentLoaded', () => {
    const allMissions = document.querySelectorAll('.mission-item');
    
    allMissions.forEach(mission => {
        // Buscamos el ID en el onclick o estructura (ej: d1-m1)
        // Como alternativa simple, leemos el texto o asignamos un identificador único por bucle
    });

    // Restaurar notas guardadas en localStorage
    document.querySelectorAll('.user-notes').forEach(textarea => {
        const savedNote = localStorage.getItem(textarea.id);
        if (savedNote) {
            textarea.value = savedNote;
        }

        // Guardar automáticamente al escribir
        textarea.addEventListener('input', () => {
            localStorage.setItem(textarea.id, textarea.value);
        });
    });

    initMomijiRain();
});

// --- ANIMACIÓN DE HOJAS MOMIJI ---
let momijiActive = true;

function initMomijiRain() {
    const container = document.getElementById('momijiContainer');
    if (!container) return;

    // Crear hojas cada cierto tiempo
    setInterval(() => {
        if (!momijiActive) return;
        
        const leaf = document.createElement('div');
        leaf.classList.add('momiji-leaf');
        
        // Tamaños, posiciones y velocidades aleatorias
        const size = Math.random() * 15 + 10; // entre 10px y 25px
        leaf.style.width = size + 'px';
        leaf.style.height = size + 'px';
        leaf.style.left = Math.random() * 100 + 'vw';
        
        const duration = Math.random() * 5 + 5; // entre 5 y 10 segundos
        leaf.style.animationDuration = duration + 's';
        
        // Colores otoñales variados
        const colors = ['#D94E34', '#E67E22', '#C8332A', '#D4A373'];
        leaf.style.background = colors[Math.floor(Math.random() * colors.length)];

        container.appendChild(leaf);

        // Eliminar la hoja cuando termine la animación para no saturar memoria
        setTimeout(() => {
            leaf.remove();
        }, duration * 1000);
    }, 600);
}

// Botón para pausar/reanudar hojas
const toggleBtn = document.getElementById('toggleMomiji');
if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
        momijiActive = !momijiActive;
        toggleBtn.textContent = momijiActive ? '🍁' : '🍁';
    });
}