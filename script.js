// --- 1. RENDERIZAR EL ITINERARIO DINÁMICAMENTE ---
function renderItinerary() {
    const container = document.getElementById('itineraryContainer');
    if (!container) return;

    container.innerHTML = '';

    viajeData.forEach((dayData) => {
        const dayNum = dayData.day;
        const formattedDay = String(dayNum).padStart(2, '0');

        // Generar HTML de las misiones de este día
        let missionsHTML = '';
        dayData.missions.forEach((missionText, index) => {
            const missionId = `d${dayNum}-m${index + 1}`;
            const isCompleted = localStorage.getItem(missionId) === 'true';

            missionsHTML += `
                <div class="mission-item ${isCompleted ? 'completed' : ''}" onclick="toggleMission(this, '${missionId}')">
                    <div class="hanko-stamp">達成</div>
                    <span class="mission-text">${index + 1}. ${missionText}</span>
                </div>
            `;
        });

        // Construir la tarjeta completa con Template Literals (backticks ``)
        const cardHTML = `
            <article class="day-card" data-day="${dayNum}">
                <div class="day-header" onclick="toggleCard(this)">
                    <div class="day-badge">Día ${formattedDay}</div>
                    <div class="day-title-wrapper">
                        <h2>${dayData.title}</h2>
                        <span class="day-location">📍 ${dayData.location}</span>
                    </div>
                    <span class="chevron">▼</span>
                </div>
                <div class="day-content">
                    <div class="info-grid">
                        <div class="story-box">
                            <h4>Historia y Contexto</h4>
                            <p>${dayData.story}</p>
                        </div>
                        <div class="details-box">
                            <div class="sleep-info">
                                <strong>🛌 Dónde dormir:</strong> ${dayData.sleep}
                            </div>
                            <a class="btn-destination" href="destino.html?id=${encodeURIComponent(dayData.id)}&day=${dayNum}">Ver destino</a>
                        </div>
                    </div>
                    <div class="missions-section">
                        <h4>Misiones Culturales (Hanko)</h4>
                        <div class="missions-grid">
                            ${missionsHTML}
                        </div>
                    </div>
                </div>
            </article>
        `;

        container.innerHTML += cardHTML;
    });

    // Una vez pintadas, actualizamos los contadores
    updateProgress();
}

// --- 2. LÓGICA DE ACORDEÓN ---
function toggleCard(headerElement) {
    const card = headerElement.parentElement;
    const wasActive = card.classList.contains('active');
    
    document.querySelectorAll('.day-card').forEach(c => c.classList.remove('active'));
    
    if (!wasActive) {
        card.classList.add('active');
    }
}

// --- 3. SISTEMA DE MISIONES Y SELLOS HANKO ---
function toggleMission(missionElement, missionId) {
    missionElement.classList.toggle('completed');
    const isCompleted = missionElement.classList.contains('completed');
    
    localStorage.setItem(missionId, isCompleted);
    updateProgress();
}

function updateProgress() {
    const allMissions = document.querySelectorAll('.mission-item');
    const completedMissions = document.querySelectorAll('.mission-item.completed');
    
    const total = allMissions.length;
    const completed = completedMissions.length;
    const percent = total > 0 ? Math.round((completed / total) * 100) : 0;
    
    const completedCountEl = document.getElementById('completedCount');
    const totalCountEl = document.getElementById('totalCount');
    const progressPercentEl = document.getElementById('progressPercent');
    const progressBarEl = document.getElementById('globalProgressBar');

    if (completedCountEl) completedCountEl.textContent = completed;
    if (totalCountEl) totalCountEl.textContent = total;
    if (progressPercentEl) progressPercentEl.textContent = percent;
    if (progressBarEl) progressBarEl.style.width = percent + '%';
}

// --- 4. MOSTRAR EL DESTINO SELECCIONADO ---
function renderDestination() {
    const container = document.getElementById('destinationDetails');
    if (!container) return;

    const params = new URLSearchParams(window.location.search);
    const destinationId = params.get('id');
    const day = Number(params.get('day'));
    const destination = viajeData.find(item => item.id === destinationId && item.day === day);

    if (!destination) {
        container.textContent = 'No encontramos ese destino. Vuelve al itinerario e inténtalo de nuevo.';
        return;
    }

    const title = document.createElement('h2');
    title.textContent = destination.title;

    const location = document.createElement('p');
    location.className = 'destination-location';
    location.textContent = `📍 ${destination.location}`;

    const storyTitle = document.createElement('h3');
    storyTitle.textContent = 'Historia y contexto';

    const story = document.createElement('p');
    story.textContent = destination.story;

    const sleep = document.createElement('p');
    sleep.className = 'destination-sleep';
    sleep.textContent = `🛌 Dónde dormir: ${destination.sleep}`;

    container.replaceChildren(title, location, storyTitle, story, sleep);
    document.title = `${destination.title} | Ruta Momiji 2028`;
}

// --- 5. ANIMACIÓN DE HOJAS MOMIJI ---
let momijiActive = true;

function initMomijiRain() {
    const container = document.getElementById('momijiContainer');
    if (!container) return;

    setInterval(() => {
        if (!momijiActive) return;
        
        const leaf = document.createElement('div');
        leaf.classList.add('momiji-leaf');
        
        const size = Math.random() * 15 + 10;
        leaf.style.width = size + 'px';
        leaf.style.height = size + 'px';
        leaf.style.left = Math.random() * 100 + 'vw';
        
        const duration = Math.random() * 5 + 5;
        leaf.style.animationDuration = duration + 's';
        
        const colors = ['#D94E34', '#E67E22', '#C8332A', '#D4A373'];
        leaf.style.background = colors[Math.floor(Math.random() * colors.length)];

        container.appendChild(leaf);

        setTimeout(() => {
            leaf.remove();
        }, duration * 1000);
    }, 600);
}

// Inicializar todo al cargar la página
window.addEventListener('DOMContentLoaded', () => {
    renderItinerary();
    renderDestination();
    initMomijiRain();

    const toggleBtn = document.getElementById('toggleMomiji');
    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            momijiActive = !momijiActive;
        });
    }
});

// --- GESTIÓN DE LA VENTANA MODAL DE LOGIN ---
const openLoginBtn = document.getElementById('openLoginModal');
const closeLoginBtn = document.getElementById('closeLoginModal');
const loginModal = document.getElementById('loginModal');

if (openLoginBtn && closeLoginBtn && loginModal) {
    // Abrir modal al hacer clic en el botón de la cabecera
    openLoginBtn.addEventListener('click', () => {
        loginModal.classList.add('active');
    });

    // Cerrar modal al hacer clic en la cruz (X)
    closeLoginBtn.addEventListener('click', () => {
        loginModal.classList.remove('active');
    });

    // Cerrar también si el usuario hace clic fuera de la caja blanca del modal
    loginModal.addEventListener('click', (e) => {
        if (e.target === loginModal) {
            loginModal.classList.remove('active');
        }
    });
};

// Simulación de envío de formulario (aquí conectarías con Supabase/Firebase más adelante)
function handleLogin(event) {
    event.preventDefault();
    const email = document.getElementById('userEmail').value;
    alert(`¡Bienvenido de nuevo, ${email}! (Aquí conectaremos la autenticación en la nube próximamente).`);
    loginModal.classList.remove('active');
};