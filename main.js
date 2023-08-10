//https://www.amiiboapi.com/api/amiibo/?name=mario
// Elements
const gameSelect = document.querySelector('#games');
const amiiboSelect = document.querySelector('#amiibos');

// Function calls
getGames();
getAmiibos();

// Functions
function getGames() {
    fetch('https://www.amiiboapi.com/api/amiiboseries/')
        .then(res => res.json())
        .then(games => renderGameOptions(games.amiibo))
        .catch();
}

function getAmiibos() {
    fetch('https://www.amiiboapi.com/api/amiibo/?name=mario')
        .then(res => res.json())
        .then(amiibos => renderAmiibos(amiibos.amiibo))
        .catch();
}

function renderGameOptions(games) {
    games.forEach(game => {
        const option = document.createElement('option');
        option.value = game.name;
        option.textContent = game.name;
        gameSelect.appendChild(option);
    });
}

function renderAmiibos(amiibos) {
    console.log(amiibos);
    amiibos.forEach(amiibo => {
        const option = document.createElement('option');
        option.value = amiibo.name;
        option.textContent = amiibo.name;
        amiiboSelect.appendChild(option);
    });
}
