// Elements
const gameSelect = document.querySelector('#games');
const amiiboSelect = document.querySelector('#amiibos');
const amiiboContainer = document.querySelector('.amiibo-container');

// Function calls
getGames();
getAmiibos();

// Event listeners
gameSelect.addEventListener('change', getAmiibosByGame);
amiiboSelect.addEventListener('change', getAmiibosByName);

//  Drop down Functions
function getGames() {
    fetch('https://www.amiiboapi.com/api/amiiboseries/')
        .then(res => res.json())
        .then(games => renderGameOptions(games.amiibo))
        .catch()
}

function getAmiibos() {
    fetch('https://www.amiiboapi.com/api/amiibo/?name=mario')
        .then(res => res.json())
        .then(amiibos => renderAmiibosOptions(amiibos.amiibo))
        .catch()
}

function getAmiibosByName() {
    fetch('https://www.amiiboapi.com/api/amiibo/?name=mario')
        .then(res => res.json())
        .then(amiibos => renderAmiibosOptions(amiibos.amiibo))
        .catch()
}

function renderGameOptions(games) {
    games.forEach(game => {
        const option = document.createElement('option');
        option.value = game.name;
        option.textContent = game.name;
        gameSelect.append(option);
    });
}

function renderAmiibosOptions(amiibos) {
    amiibos.forEach(amiibo => {
        const option = document.createElement('option');
        option.value = amiibo.name;
        option.textContent = amiibo.name;
        amiiboSelect.append(option);
    });
}

// Event handler functions
function getAmiibosByGame() {
    const game = gameSelect.value;
    fetch(`https://www.amiiboapi.com/api/amiibo/?amiiboSeries=${game}`)
        .then(res => res.json())
        .then(amiibos => renderAllAmiibos(amiibos.amiibo))
        .catch()
}

function getAmiibosByName() {
    const amiibo = amiiboSelect.value;
    fetch(`https://www.amiiboapi.com/api/amiibo/?name=${amiibo}`)
        .then(res => res.json())
        .then(amiibos => renderAllAmiibos(amiibos.amiibo))
        .catch()
}

function renderAllAmiibos(amiibos) {
    amiiboContainer.replaceChildren()
    amiibos.forEach(amiibo => {
        renderAmiibosCard(amiibo);
    });
    gameSelect.value = '';
    amiiboSelect.value = '';
}

function renderAmiibosCard(amiibo) {
    const {ammiiboSeries, character, gameSeries, image} = amiibo;
    const cardDiv = document.createElement('div');
    cardDiv.classList.add('card');
    cardDiv.addEventListener('click', () => {
        youtubelink = `https://www.youtube.com/results?search_query=${character}+amiibo`;
        window.open(youtubelink, '_blank');
    });
    const cardImage = document.createElement('img');
    cardImage.src = image;
    cardImage.alt = character;

    cardImage.classList.add('card-image');
    
    const title = document.createElement('h3');
    title.textContent = character;
    title.classList.add('card-title');

    const game = document.createElement('p');
    game.textContent = gameSeries;

    game.classList.add('card-game');


    cardDiv.append(cardImage, title, character, gameSeries);
    amiiboContainer.append(cardDiv);
}
