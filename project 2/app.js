window.addEventListener('DOMContentLoaded',()=>{
    const tiles = Array.from(document.querySelectorAll('.tile'));
    const playerDisplay= document.querySelector('#reset');
    const announcer = document.querySelector('.announcer');

    let board = ['','','','','','','','',''];
    let currenPlayer= 'x';
    let isGameActive =true;

    resetButton.addEventListener('click',resetBoard);
    
    const PLAYERX_WON ='PLERX_WON';
    const PLAYERO_WON = 'PLAYERO_WON';
    const TIE= 'TIE';
    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    const userAction=(title, index)=>{
        if(isValidAction(tile)&& isGameActive){
            tile.innerText = currentPlayer;
            tille.classList.add('player${currentPlayer}');
            

        }
    }
    tiles.forEach((tile, index) =>{
    tile.addEventListener('click', () => UserActivation(tile, index));


});