const displayController = (() => {
    const renderMessage = (message) => {
        document.querySelector('#message').innerHTML = message;
    }
return {
    renderMessage
}    
})();

let Gameboard = (() => {
 let gameboard = ['', '', '', '', '', '', '', '', ''];
 
 const render = () => {
    let boardHTML = '';
    gameboard.forEach((square, index) => {
        boardHTML += `<div class="cuadricula" id='square-${index}'>${square}</div>`
    })
    document.querySelector('.juego').innerHTML = boardHTML;
    const squares = document.querySelectorAll('.cuadricula');
    squares.forEach((square) => {
    square.addEventListener('click', Game.handleClick);
    })
 }
 
const update = (index, value) => {
    gameboard[index] = value;
    render();
}

const getGameBoard = () => gameboard

 return {
    render,
    update,
    getGameBoard
 }
})(); 

const createPlayer = (name, mark) => {
    return {
        name, 
        mark
    }
}

const Game = (() => {
    let players = [];
    let currentPlayerIndex;
    let gameOver;

    const start = () => {
        players = [
            createPlayer(document.querySelector('#player1').value, 'X'),
            createPlayer(document.querySelector('#player2').value, 'O')
        ]
        currentPlayerIndex = 0;
        gameOver = false;
        Gameboard.render();
        const squares = document.querySelectorAll('.cuadricula');
        squares.forEach((square) => {
          square.addEventListener('click', handleClick);
        })
        
    } 
    
    const handleClick = (event) => {
        if(gameOver){
            return;
        }
        let index = parseInt(event.target.id.split('-')[1]);
        if(Gameboard.getGameBoard() [index] !== '')
            return;
        
        Gameboard.update(index, players[currentPlayerIndex].mark);
        
        if (checkForWin(Gameboard.getGameBoard(), players[currentPlayerIndex].mark)) {
             gameOver = true;
             displayController.renderMessage(`${players[currentPlayerIndex].name} gana!`)
        }else if (checkForTie(Gameboard.getGameBoard())){
            gameOver = true;
            displayController.renderMessage('Empate!')
        }

        currentPlayerIndex = currentPlayerIndex === 0 ? 1: 0;    
        
    }
    
    function checkForWin(board){
        const winningCombinations = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ]
        for (let i = 0; i < winningCombinations.length; i++){
            const [a, b, c] = winningCombinations[i];
            if (board[a] && board[a] === board[b] && board[a] === board[c]){
                return true
            }
        }
        return false;
    }

    function checkForTie(board) {
        return board.every(cell => cell !== '')
    }
    
    const restart = () => {
        for (let i = 0; i < 9; i++){
            Gameboard.update(i, '');
        }
        Gameboard.render();
        document.querySelector('#message').innerHTML = '';
        gameOver = false;
    }
    
    return {
        start,
        restart,
        handleClick
    }   
})();

const reStartbtn = document.querySelector('#restart-button');
reStartbtn.addEventListener('click', () => {
    Game.restart()
})


const btnStart = document.querySelector('#start-button');
btnStart.addEventListener('click', () => {
    Game.start()

})
