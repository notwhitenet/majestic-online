document.addEventListener('DOMContentLoaded', () => {
    const serverApiLinks = {
        'majestic1': 'SvgjrFK',
        'majestic2': 'y8vgQbo',
        'majestic3': '0kIhphA',
        'majestic4': 'qL4KKep',
        'majestic5': 'AwCvQP2',
        'majestic6': '0FcLWkD',
        'majestic7': 'y5mEO6p',
        'majestic8': 'BnVfDtR',
        'majestic9': 'YMRctiN',
        'majestic10': 'GK6qeYO',
        'majestic11': 'y6vM23F',
        'majestic12': 'V5l9QxS',
        'majestic13': '4jKxybq'
    };

    const hoverSound = document.getElementById('hover-sound');

    function playHoverSound() {
        hoverSound.currentTime = 0; 
        hoverSound.play();
    }

    function debounce(func, wait) {
        let timeout;
        return function(...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    }

    const debouncedPlayHoverSound = debounce(playHoverSound, 100); 

    async function updateServerInfo(serverId, apiLink) {
        try {
            const response = await fetch(`https://api.alt-mp.com/servers/${apiLink}`);
            const data = await response.json();
            const playersCount = data.playersCount;
            const maxPlayersCount = data.maxPlayersCount;
            const queueCount = data.queueCount || 0;
            const available = data.available !== undefined ? data.available : true;

            document.getElementById(`${serverId}-online`).textContent = `Online: ${playersCount}/${maxPlayersCount}`;

            const serverElement = document.querySelector(`.${serverId}.servers`);
            serverElement.addEventListener('mouseenter', debouncedPlayHoverSound);

            serverElement.addEventListener('click', function() {
                document.getElementById('server-name').textContent = this.querySelector('.nameserver').textContent;
                document.getElementById('server-details').textContent = `Online: ${playersCount}/${maxPlayersCount}`;
                document.getElementById('queue-count').textContent = `Очередь: ${queueCount}`;
                document.getElementById('availability-status').textContent = `Доступен: ${available ? 'Да' : 'Нет'}`;
                modal.style.display = "block";
            });
        } catch (error) {
            console.error(`Ошибка при получении данных с API для ${serverId}:`, error);
        }
    }

    function hideLoader() {
        const loader = document.getElementById('loader');
        loader.style.display = 'none';
    }

    async function updateAllServers() {
        for (const [serverId, apiLink] of Object.entries(serverApiLinks)) {
            await updateServerInfo(serverId, apiLink);
        }
        hideLoader(); // убрать загрузчик после обновления всех серверов
    }

    updateAllServers();
    setInterval(updateAllServers, 10000);

    const modal = document.getElementById("server-modal");
    const closeButton = document.querySelector(".close-button");

    closeButton.addEventListener('click', function() {
        modal.style.display = "none";
    });

    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });

    const { ipcRenderer } = require('electron');

    ipcRenderer.on('window-id', (event, windowId) => {
        const minimizeButton = document.getElementById('minimize-button');
        const closeButton = document.getElementById('close-button');

        minimizeButton.addEventListener('click', () => {
            ipcRenderer.send('minimize-window', windowId);
        });

        closeButton.addEventListener('click', () => {
            ipcRenderer.send('close-window', windowId);
        });
    });

    const addInfoButton = document.getElementById('add-info-button');
    const characterInfo = document.getElementById('character-info');

    addInfoButton.addEventListener('click', () => {
        characterInfo.style.display = characterInfo.style.display === 'none' ? 'block' : 'none';
    });

    function getCharacterData() {
        const char1Id = document.getElementById('char1-id').value;
        const char1Bank = document.getElementById('char1-bank').value;
        const char2Id = document.getElementById('char2-id').value;
        const char2Bank = document.getElementById('char2-bank').value;
        const char3Id = document.getElementById('char3-id').value;
        const char3Bank = document.getElementById('char3-bank').value;

        return [
            { id: char1Id, bank: char1Bank },
            { id: char2Id, bank: char2Bank },
            { id: char3Id, bank: char3Bank }
        ];
    }
});
