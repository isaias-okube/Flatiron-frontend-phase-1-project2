//https://www.amiiboapi.com/api/amiibo/?name=mario
// Elements
const gameSelect = document.querySelector('#games');
const amiiboSelect = document.querySelector('#amiibos');

// Function calls
getGames();
getAmiibos();

// Event listeners
gameSelect.addEventListener('change', getAmiibosByGame);
amiiboSelect.addEventListener('change', getAmiiboByName);

//  Drop down Functions
function getGames() {
    fetch('https://www.amiiboapi.com/api/amiiboseries/')
        .then(res => res.json())
        .then(games => renderGameOptions(games.amiibo))
        .catch(error => alert(error));
}

function getAmiibos() {
    fetch('https://www.amiiboapi.com/api/amiibo/?name=mario')
        .then(res => res.json())
        .then(amiibos => renderAmiibosOptions(amiibos.amiibo))
        .catch(error => alert(error));
}

function renderGameOptions(games) {
    games.forEach(game => {
        const option = document.createElement('option');
        option.value = game.name;
        option.textContent = game.name;
        gameSelect.appendChild(option);
    });
}

function renderAmiibosOptions(amiibos) {
    amiibos.forEach(amiibo => {
        const option = document.createElement('option');
        option.value = amiibo.name;
        option.textContent = amiibo.name;
        amiiboSelect.appendChild(option);
    });
}

// Event handler functions
function getAmiibosByGame(event) {
    const gameName = event.target.value;
    fetch(`https://www.amiiboapi.com/api/amiibo/?amiiboSeries=${gameName}`)
        .then(res => res.json())
        .then(amiibos => renderAmiibos(amiibos.amiibo))
        .catch(error => alert(error));
}

function getAmiiboByName(event) {
    const amiiboName = event.target.value;
    fetch(`https://www.amiiboapi.com/api/amiibo/?name=${amiiboName}`)
        .then(res => res.json())
        .then(amiibos => renderAmiibos(amiibos.amiibo))
        .catch(error => alert(error));
}