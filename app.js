let arrayGame = [];
let arrayRespGame = [];

document.addEventListener('DOMContentLoaded', ()=>{
    generatorArray();
    renderScreen();
    const start = document.querySelector('.start');
    start.addEventListener('click', startGame);
    
});

const $howPlay = document.querySelector('.howPlay');
const $divHowPlay = document.querySelector('.divHowPlay');
const $screenGameOver = document.querySelector('.gameOver');
const $playAgain = document.querySelector('.playAgain');
const $removeHowPlay = document.querySelector('.removeHowPlay');

$howPlay.addEventListener('click', ()=>{
    $divHowPlay.classList.add('active');
})

$removeHowPlay.addEventListener('click', ()=>{
    $divHowPlay.classList.remove('active');
})

$playAgain.addEventListener('click', ()=>{
    $screenGameOver.style.display = 'none';
    startGame();
})

function generatorArray(){
    restartGame();

    for (let i=1;i<9;i++){
        const elementGame = document.querySelector(`#p${i}`);
        elementGame.textContent = i;
        elementGame.addEventListener('click', moveElement)
        arrayGame.push(elementGame);
    }
    arrayGame.push(null);
    arrayRespGame = [...arrayGame];

}

function renderScreen(){
    for(let index in arrayGame){

        element = arrayGame[index];
        
        if(element){

            // índice menor que 3 = topo
            // índice menor que 6 = meio
            // outros índices = fundo
            if(index < 3){
                element.style.top = '10px';
            }else if(index < 6){
                element.style.top = '170px';
            }else{
                element.style.top = '330px';
            }

            // índice 0,3,6 a esquerda 
            // índice 2,5,8 a direita
            // restante dos índices no meio
            if(index % 3 === 0){
                element.style.left = '10px';
            }else if(index % 3 === 2){
                element.style.left = '330px';
            }else{
                element.style.left = '170px';
            }
        }

    }
}

function moveElement(e){
    index = arrayGame.indexOf(this);

    if(index % 3 !== 0){
        let elementLeft = arrayGame[index - 1];
        if(!elementLeft){
            [arrayGame[index], arrayGame[index - 1]] = [arrayGame[index - 1], arrayGame[index]];
        }
    }
    if(index % 3 !== 2){
        elementRight = arrayGame[index + 1];
        if(!elementRight){
            [arrayGame[index], arrayGame[index + 1]] = [arrayGame[index + 1], arrayGame[index]]
        }
    }

    if(index > 2){
        elementTop = arrayGame[index - 3];
        if(!elementTop){
            [arrayGame[index], arrayGame[index - 3]] = [arrayGame[index - 3], arrayGame[index]];
        };
    }
    if(index < 6){
        elementBottom = arrayGame[index + 3];
        if(!elementBottom){
            [arrayGame[index], arrayGame[index + 3]] = [arrayGame[index + 3], arrayGame[index]];
        }
    }

    renderScreen();

    const verifyGameOver = checkGameOver();
    if(verifyGameOver){
        $screenGameOver.style.display = 'flex';
    };

}

function shuffleElements(){
    let countLen = --arrayGame.length;
    let randomNumber = 0;
    let alreadyNumber = [];

    while(countLen !== 0){
        randomNumber = Math.floor(Math.random() * countLen);
        if(alreadyNumber.includes(randomNumber)){
            countLen--;
            continue;
        }
        alreadyNumber.push(randomNumber);

        [arrayGame[countLen], arrayGame[randomNumber]] = [arrayGame[randomNumber], arrayGame[countLen]];
        countLen--;
    }
}

function checkGameOver(){
    for(let index in arrayGame){
        elementArrayGame = arrayGame[index];
        elementArrayRespGame = arrayRespGame[index];
        if(elementArrayGame != elementArrayRespGame){
            return false;
        }
    }
    return true;
}

function restartGame(){
    arrayGame = [];
    arrayRespGame = [];
}
function startGame(){

    shuffleElements();
    document.querySelector('.initialScreen').style.display = 'none';
    renderScreen();
    
}