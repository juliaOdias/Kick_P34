// Fácil
var palavrasFacil = ['sol', 'lua', 'terra', 'marte', 'venus', 'jupiter', 'saturno', 'urano', 'netuno', 'mercurio', 'ceu', 'astro', 'plutao', 'cinturao de asteroides', 'gas', 'universo', 'galáxia', 'estrela cadente', 'sistema solar', 'nebulosa', 'cometa', 'eclipses', 'gravidade', 'meteoro', 'via lactea', 'planeta anao', 'supernova', 'astronauta', 'astronomia', 'orbita'];
var dicasFacil = ['estrelas', 'satélite natural', 'planeta', 'planeta', 'planeta', 'planeta', 'planeta', 'planeta', 'planeta', 'planeta', 'espaço', 'espaço', 'planeta', 'asteroides', 'espaço', 'espaço', 'espaço', 'espaço', 'espaço', 'espaço', 'espaço', 'espaço', 'espaço', 'espaço', 'espaço', 'espaço', 'espaço', 'espaço', 'espaço', 'espaço', 'espaço'];

// Médio
var palavrasMedio = ['andromeda', 'constelacao', 'ana vermelha', 'supernova', 'ana branca', 'magnetosfera', 'aglomerado estelar', 'pulsar', 'quasar', 'cinturao de kuiper', 'exoplaneta', 'buraco negro', 'cumulo estelar', 'colisao de galaxias', 'vida extraterrestre', 'onda gravitacional', 'telescopio', 'planetario', 'infravermelho', 'escala cosmica', 'zona habitavel', 'ano-luz', 'buraco de minhoca', 'evento de extincao', 'matria escura', 'nuvem interestelar', 'missao espacial', 'rover', 'estacao espacial'];
var dicasMedio = ['galáxia', 'espaço', 'estrelas', 'fenômeno estelar', 'estrelas', 'campo magnético', 'estrelas', 'estrelas', 'estrelas', 'espaço', 'planeta', 'fenômeno espacial', 'estrelas', 'espaço', 'possibilidade espaço', 'fenômeno espacial', 'equipamento astronômico', 'lugar', 'radiação espacial', 'espaço', 'espaço', 'unidade de distancia', 'teoria', 'fenomeno cosmico', 'teoria', 'espaço', 'exploração', 'exploração', 'exploração'];

// Difícil
var palavrasDificil = ['big bang', 'centauro', 'materia exotica', 'singularidade', 'multiverso', 'vacuo quantico', 'espaço-tempo', 'buraco de verme', 'hipergravidade', 'viagem interestelar', 'constante cosmologica', 'efeito de gravitacional', 'teoria das cordas', 'dobra espacial', 'energia escura', 'ponto de lagrange', 'fluxo de materia', 'raios cosmicos', 'inflacao cosmica', 'radiotelescopio', 'disrupcao tidal', 'magnetar', 'nebulosa planetaria', 'microlente gravitacional', 'tempo cosmico', 'onda gravitacional', 'radiacao cosmica de fundo', 'anomalia gravitacional'];
var dicasDificil = ['teoria', 'espaço', 'teoria', 'conceito', 'teoria', 'teoria', 'conceito', 'teoria', 'conceito', 'exploração', 'teoria', 'fenômeno', 'teoria', 'conceito', 'teoria', 'conceito', 'conceito', 'fenômeno', 'teoria', 'equipamento', 'fenômeno', 'estrela', 'espaço', 'fenômeno', 'conceito', 'teoria', 'fenômeno', 'fenômeno', 'fenomeno'];


var digitadas;
var chancas;
var palavra;
var dica;

function startGame(dificuldade) {
    digitadas = [];
    chancas = 5;
    switch (dificuldade) {
        case 'facil':
            palavra = palavrasFacil[Math.floor(Math.random() * palavrasFacil.length)];
            dica = dicasFacil[palavrasFacil.indexOf(palavra)];
            break;
        case 'medio':
            palavra = palavrasMedio[Math.floor(Math.random() * palavrasMedio.length)];
            dica = dicasMedio[palavrasMedio.indexOf(palavra)];
            break;
        case 'dificil':
            palavra = palavrasDificil[Math.floor(Math.random() * palavrasDificil.length)];
            dica = dicasDificil[palavrasDificil.indexOf(palavra)];
            break;
        default:
            palavra = palavrasFacil[Math.floor(Math.random() * palavrasFacil.length)];
            dica = dicasFacil[palavrasFacil.indexOf(palavra)];
            break;
    }
    document.getElementById('dica').innerText = dica;
    initGame();
}

function initGame() {
    var letrasContainer = document.getElementById('letters-container');
    for (var i = 0; i < 26; i++) {
        var letra = String.fromCharCode(97 + i); // 97 é o código ASCII para 'a'
        letrasContainer.innerHTML += '<button class="letter" onclick="enviarLetra(\'' + letra + '\')">' + letra + '</button>';
    }
    desenharForca();
    updateWord();
}

function updateWord() {
    var palavraExibida = '';
    for (var i = 0; i < palavra.length; i++) {
        if (palavra[i] === ' ') {
            palavraExibida += ' '; // Adiciona espaço
        } else if (digitadas.indexOf(palavra[i]) !== -1 || palavra[i] === ' ') {
            palavraExibida += palavra[i];
        } else {
            palavraExibida += '*';
        }
    }
    document.getElementById('palavra').innerText = palavraExibida;

    var palavraSemEspacos = palavra.replace(/ /g, '');
    var palavraExibidaSemEspacos = palavraExibida.replace(/ /g, '');
    if (palavraExibidaSemEspacos === palavraSemEspacos) {
        alert('Parabéns! Você ganhou!');
        resetGame();
    }
}

function enviarLetra(letra) {

    if (digitadas.indexOf(letra) !== -1) {
        alert('Essa letra já foi digitada!');
        return;
    }

    digitadas.push(letra);

    if (palavra.indexOf(letra) === -1) {
        chancas--;

        desenharParteForca(5 - chancas);

        document.getElementById('chances-count').innerText = chancas;
        if (chancas === 0) {
            alert('Você perdeu! A palavra era ' + palavra); // Adicione esta linha
            resetGame();
            return;
        }
    }

    updateWord();
}


function desenharForca() {
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawLine(ctx, 20, 190, 180, 190); // Base
    drawLine(ctx, 50, 20, 50, 190); // Poste
    drawLine(ctx, 100, 20, 50, 20); // Trave superior
    drawLine(ctx, 100, 20, 100, 50); // Corda
}

function desenharParteForca(part) {
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');

    switch (part) {
        case 1:
            drawCircle(ctx, 100, 65, 15); // Cabeça
            break;
        case 2:
            drawLine(ctx, 100, 150, 100, 80); // Corpo
            break;
        case 3:
            drawLine(ctx, 100, 80, 70, 110); // Braço esquerdo
            break;
        case 4:
            drawLine(ctx, 100, 80, 130, 110); // Braço direito
            break;
        case 5:
            drawLine(ctx, 100, 150, 70, 180); // Perna esquerda
            break;
        case 6:
            drawLine(ctx, 100, 150, 130, 180); // Perna direita
            break;
    }
}

function drawLine(ctx, x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
}

function drawCircle(ctx, x, y, radius) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.stroke();
}

function resetGame() {
    document.getElementById('letters-container').innerHTML = '';
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}
function toggleMenu() {
    var menu = document.getElementById("dropdownMenu");
    if (menu.style.display === "block") {
        menu.style.display = "none";
    } else {
        menu.style.display = "block";
    }
}