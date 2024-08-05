document.addEventListener('DOMContentLoaded', function() {
    const sendButton = document.getElementById('sendButton');
    const messageInput = document.getElementById('messageInput');
    const emojiButtons = document.querySelectorAll('.emojiButton');
    const clearButton = document.getElementById('clearButton');
    const userSelect = document.getElementById('userSelect');

    const profilePopup = document.getElementById('profilePopup');
    const profileSelect = document.getElementById('profileSelect');
    const profilePasswordInput = document.getElementById('profilePasswordInput');
    const profileSubmit = document.getElementById('profileSubmit');

    // Usuarios con contraseñas
    const users = [
        { name: 'Elias', password: '2013' },
        { name: 'Andu', password: 'a6i7' },
        { name: 'Pablo', password: '1357' },
        { name: 'Lupis', password: 'ayol' }
    ];

    // Popula los selectores de usuarios y perfiles
    populateUserSelect(users, userSelect);
    populateUserSelect(users, profileSelect);

    // Cargar mensajes desde localStorage si el perfil es válido
    profileSubmit.addEventListener('click', function() {
        const selectedProfile = profileSelect.value;
        const enteredPassword = profilePasswordInput.value;
        
        const user = users.find(u => u.name === selectedProfile);
        
        if (user && user.password === enteredPassword) {
            profilePopup.style.display = 'none';
            document.getElementById('clearButton').style.display = (selectedProfile === 'Elias') ? 'block' : 'none';
            localStorage.setItem('currentUser', selectedProfile);
            loadMessages();
        } else {
            alert('Contraseña incorrecta.');
        }
    });

    // Enviar mensaje
    sendButton.addEventListener('click', function() {
        const messageText = messageInput.value;
        const currentUser = localStorage.getItem('currentUser');
        
        if (messageText.trim() !== '') {
            addMessage(currentUser, messageText);
            messageInput.value = '';
        }
    });

    // Limpiar chat
    clearButton.addEventListener('click', function() {
        const currentUser = localStorage.getItem('currentUser');
        if (currentUser === 'Elias') {
            localStorage.removeItem('messages');
            loadMessages();
        }
    });

    // Agregar emojis al input
    emojiButtons.forEach(button => {
        button.addEventListener('click', function() {
            const emoji = this.textContent;
            messageInput.value += emoji;
        });
    });

    // Funciones auxiliares
    function populateUserSelect(users, selectElement) {
        selectElement.innerHTML = users.map(user => `<option value="${user.name}">${user.name}</option>`).join('');
    }

    function addMessage(userName, message) {
        const messages = getMessages();
        messages.push({ user: userName, message: message });
        localStorage.setItem('messages', JSON.stringify(messages));
        loadMessages();
    }

    function getMessages() {
        const messages = localStorage.getItem('messages');
        return messages ? JSON.parse(messages) : [];
    }

    function loadMessages() {
        const messagesContainer = document.getElementById('messages');
        const messages = getMessages();
        messagesContainer.innerHTML = messages.map(msg => `
            <div class="message ${msg.user}">
                <strong>${msg.user}:</strong> ${msg.message}
            </div>
        `).join('');
    }

    // Mostrar el popup de perfil al cargar la página si no hay usuario
    if (!localStorage.getItem('currentUser')) {
        profilePopup.style.display = 'flex';
    }
});
