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

    setupDestinationNote(destination.day, destination.id);

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

async function setupDestinationNote(day, destinationId) {
    const section = document.getElementById('destinationNotes');
    const message = document.getElementById('destinationNoteMessage');
    const editor = document.getElementById('destinationNoteEditor');
    const input = document.getElementById('destinationNote');
    const status = document.getElementById('destinationNoteStatus');
    const saveButton = document.getElementById('saveDestinationNote');
    const deleteButton = document.getElementById('deleteDestinationNote');
    if (!section || !message || !editor || !input || !status || !saveButton || !deleteButton) return;

    section.hidden = false;
    const client = window.supabaseClient;
    if (!client) {
        message.textContent = getSupabaseSetupMessage();
        return;
    }

    let session;
    try {
        const { data, error } = await client.auth.getSession();
        if (error) {
            message.textContent = error.message;
            return;
        }
        session = data.session;
    } catch (error) {
        message.textContent = getUnexpectedErrorMessage(error, 'No se pudo comprobar la sesión.');
        return;
    }

    if (!session) {
        const link = document.createElement('a');
        link.href = 'index.html?login=1';
        link.textContent = 'Inicia sesión para guardar tus notas.';
        message.replaceChildren(link);
        return;
    }

    let savedNote;
    try {
        const { data, error } = await client
            .from('destination_notes')
            .select('content')
            .eq('day', day)
            .maybeSingle();
        if (error) {
            message.textContent = error.message;
            return;
        }
        savedNote = data;
    } catch (error) {
        message.textContent = getUnexpectedErrorMessage(error, 'No se pudo cargar la nota.');
        return;
    }

    editor.hidden = false;
    input.value = savedNote?.content || '';

    saveButton.addEventListener('click', () => {
        if (!input.value.trim()) {
            status.textContent = 'Escribe una nota antes de guardarla.';
            return;
        }

        saveDestinationNote(client, session.user.id, day, destinationId, input.value, status, saveButton);
    });

    deleteButton.addEventListener('click', () => {
        deleteDestinationNote(client, session.user.id, day, input, status, deleteButton);
    });
}

async function saveDestinationNote(client, userId, day, destinationId, content, status, button) {
    button.disabled = true;
    status.textContent = 'Guardando...';

    try {
        const { error } = await client
            .from('destination_notes')
            .upsert(
                { user_id: userId, day, destination_id: destinationId, content },
                { onConflict: 'user_id,day' }
            );
        status.textContent = error ? error.message : 'Nota guardada en tu cuenta.';
    } catch (error) {
        status.textContent = getUnexpectedErrorMessage(error, 'No se pudo guardar la nota.');
    } finally {
        button.disabled = false;
    }
}

async function deleteDestinationNote(client, userId, day, input, status, button) {
    button.disabled = true;
    status.textContent = 'Borrando...';

    try {
        const { error } = await client
            .from('destination_notes')
            .delete()
            .eq('user_id', userId)
            .eq('day', day);
        if (error) {
            status.textContent = error.message;
            return;
        }

        input.value = '';
        status.textContent = 'Nota borrada.';
    } catch (error) {
        status.textContent = getUnexpectedErrorMessage(error, 'No se pudo borrar la nota.');
    } finally {
        button.disabled = false;
    }
}

function getSupabaseSetupMessage() {
    if (!window.supabase) return 'No se pudo cargar Supabase JS. Comprueba tu conexión a Internet.';
    return 'Añade la URL del proyecto y la clave Publishable en supabase-config.js para activar las notas.';
}

function getUnexpectedErrorMessage(error, fallback) {
    return error instanceof Error ? error.message : fallback;
}

// --- 5. RESUMEN DEL DASHBOARD ---
async function renderDashboard() {
    const notesContainer = document.getElementById('dashboardNotes');
    if (!notesContainer) return;

    let totalMissions = 0;
    let completedMissions = 0;
    viajeData.forEach(dayData => {
        dayData.missions.forEach((_, index) => {
            totalMissions++;
            if (localStorage.getItem(`d${dayData.day}-m${index + 1}`) === 'true') completedMissions++;
        });
    });

    const percent = totalMissions ? Math.round((completedMissions / totalMissions) * 100) : 0;
    const daysCount = document.getElementById('dashboardDaysCount');
    const missionsCount = document.getElementById('dashboardMissionsCount');
    const progressPercent = document.getElementById('dashboardProgressPercent');
    const progressBar = document.getElementById('dashboardProgressBar');
    const progressDescription = document.getElementById('dashboardProgressDescription');
    const notice = document.getElementById('dashboardStorageNotice');
    const userEmail = document.getElementById('dashboardUserEmail');
    const notesCount = document.getElementById('dashboardNotesCount');
    const signOutButton = document.getElementById('signOutButton');

    if (daysCount) daysCount.textContent = viajeData.length;
    if (missionsCount) missionsCount.textContent = `${completedMissions} / ${totalMissions}`;
    if (progressPercent) progressPercent.textContent = `${percent}%`;
    if (progressBar) progressBar.style.width = `${percent}%`;
    if (progressDescription) progressDescription.textContent = `${completedMissions} de ${totalMissions} misiones completadas`;

    const client = window.supabaseClient;
    if (!client) {
        if (notice) notice.textContent = getSupabaseSetupMessage();
        if (notesCount) notesCount.textContent = '0';
        showDashboardMessage(notesContainer, 'Configura Supabase para cargar las notas de tu cuenta.');
        return;
    }

    let session;
    try {
        const { data, error } = await client.auth.getSession();
        if (error) {
            if (notice) notice.textContent = error.message;
            showDashboardMessage(notesContainer, `No se pudo comprobar la sesión: ${error.message}`);
            return;
        }
        session = data.session;
    } catch (error) {
        if (notice) notice.textContent = getUnexpectedErrorMessage(error, 'No se pudo comprobar la sesión.');
        showDashboardMessage(notesContainer, 'No se pudo comprobar la sesión.');
        return;
    }

    if (!session) {
        window.location.replace('index.html?login=1');
        return;
    }

    if (userEmail) {
        userEmail.textContent = session.user.email || '';
        userEmail.hidden = !session.user.email;
    }
    if (notice) notice.textContent = 'Tus notas están sincronizadas con tu cuenta de Supabase.';

    if (signOutButton) {
        signOutButton.hidden = false;
        signOutButton.addEventListener('click', async () => {
            signOutButton.disabled = true;
            try {
                const { error } = await client.auth.signOut();
                if (error) {
                    if (notice) notice.textContent = error.message;
                    signOutButton.disabled = false;
                    return;
                }
                window.location.href = 'index.html';
            } catch (error) {
                if (notice) notice.textContent = getUnexpectedErrorMessage(error, 'No se pudo cerrar la sesión.');
                signOutButton.disabled = false;
            }
        });
    }

    let notes;
    try {
        const { data, error } = await client
            .from('destination_notes')
            .select('day, destination_id, content')
            .order('day');
        if (error) {
            if (notice) notice.textContent = `No se pudieron cargar las notas: ${error.message}`;
            showDashboardMessage(notesContainer, `No se pudieron cargar las notas: ${error.message}`);
            return;
        }
        notes = data;
    } catch (error) {
        const message = getUnexpectedErrorMessage(error, 'No se pudieron cargar las notas.');
        if (notice) notice.textContent = message;
        showDashboardMessage(notesContainer, message);
        return;
    }

    notesContainer.replaceChildren();
    if (notesCount) notesCount.textContent = notes.length;
    if (notes.length === 0) {
        showDashboardMessage(notesContainer, 'Aún no tienes notas. Abre un destino para guardar tu primera idea.');
        return;
    }

    notes.forEach(note => {
        const dayData = viajeData.find(item => item.day === note.day && item.id === note.destination_id);
        if (!dayData) return;

        const card = document.createElement('article');
        card.className = 'dashboard-note-card';

        const dayLabel = document.createElement('p');
        dayLabel.className = 'dashboard-note-day';
        dayLabel.textContent = `Día ${String(dayData.day).padStart(2, '0')} · ${dayData.location}`;

        const title = document.createElement('h3');
        title.textContent = dayData.title;

        const noteText = document.createElement('p');
        noteText.className = 'dashboard-note-text';
        noteText.textContent = note.content;

        const link = document.createElement('a');
        link.className = 'dashboard-note-link';
        link.href = `destino.html?id=${encodeURIComponent(dayData.id)}&day=${dayData.day}`;
        link.textContent = 'Editar nota →';

        card.append(dayLabel, title, noteText, link);
        notesContainer.appendChild(card);
    });

    if (notesContainer.childElementCount === 0) {
        showDashboardMessage(notesContainer, 'No hay notas asociadas a los destinos actuales del itinerario.');
    }
}

function showDashboardMessage(container, text) {
    container.replaceChildren();
    const message = document.createElement('p');
    message.className = 'dashboard-empty-state';
    message.textContent = text;
    container.appendChild(message);
}

// --- 6. ANIMACIÓN DE HOJAS MOMIJI ---
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
    renderDashboard();
    initMomijiRain();
    setupAuthMode();

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
const authModeToggle = document.getElementById('toggleAuthMode');
let authMode = 'signin';

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

if (authModeToggle) {
    authModeToggle.addEventListener('click', () => {
        authMode = authMode === 'signin' ? 'signup' : 'signin';
        const prompt = document.getElementById('authModePrompt');
        const submitButton = document.getElementById('authSubmit');
        const passwordInput = document.getElementById('userPass');
        const description = document.getElementById('loginDescription');
        const status = document.getElementById('loginStatus');

        if (prompt) prompt.textContent = authMode === 'signin' ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?';
        authModeToggle.textContent = authMode === 'signin' ? 'Crear cuenta' : 'Iniciar sesión';
        if (submitButton) submitButton.textContent = authMode === 'signin' ? 'Entrar a mi viaje' : 'Crear mi cuenta';
        if (passwordInput) passwordInput.autocomplete = authMode === 'signin' ? 'current-password' : 'new-password';
        if (description) {
            description.textContent = authMode === 'signin'
                ? 'Entra en tu cuenta para guardar tus notas y consultarlas en otros dispositivos.'
                : 'Crea una cuenta para guardar tus notas privadas en la nube.';
        }
        if (status) status.textContent = '';
    });
}

function setupAuthMode() {
    const shouldOpenLogin = new URLSearchParams(window.location.search).get('login') === '1';
    if (shouldOpenLogin && loginModal) loginModal.classList.add('active');
}

async function handleLogin(event) {
    event.preventDefault();
    const email = document.getElementById('userEmail').value.trim();
    const password = document.getElementById('userPass').value;
    const status = document.getElementById('loginStatus');
    const submitButton = document.getElementById('authSubmit');
    const client = window.supabaseClient;

    if (!client) {
        if (status) status.textContent = getSupabaseSetupMessage();
        return;
    }

    if (submitButton) submitButton.disabled = true;
    if (status) status.textContent = authMode === 'signin' ? 'Iniciando sesión...' : 'Creando cuenta...';

    try {
        const result = authMode === 'signin'
            ? await client.auth.signInWithPassword({ email, password })
            : await client.auth.signUp({
                email,
                password,
                options: { emailRedirectTo: new URL('dashboard.html', window.location.href).href }
            });

        if (result.error) {
            if (status) status.textContent = result.error.message;
            return;
        }

        if (authMode === 'signup' && !result.data.session) {
            if (status) status.textContent = 'Cuenta creada. Revisa tu correo para confirmar la dirección antes de entrar.';
            return;
        }

        window.location.href = 'dashboard.html';
    } catch (error) {
        if (status) status.textContent = getUnexpectedErrorMessage(error, 'No se pudo completar el acceso.');
    } finally {
        if (submitButton) submitButton.disabled = false;
    }
}