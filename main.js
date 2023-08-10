//https://www.amiiboapi.com/api/amiibo/?name=mario
// Elements
const gameSelect = document.querySelector('#games');

// Function calls
getGames();

// Functions
function getGames() {
    fetch('https://www.amiiboapi.com/api/amiiboseries/')
        .then(res => res.json())
        .then(games => renderGameOptions(games.amiibo))
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
