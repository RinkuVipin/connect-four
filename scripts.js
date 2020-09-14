document.addEventListener('DOMContentLoaded', () => {

    const grid = document.querySelector('.grid');
    const boxes = document.querySelectorAll('.grid div');
    const playerDisplay = document.querySelector('#player-check');
    const finalScore = document.querySelector('.final-score');
    const message = document.querySelector('.user-message');

    var currentPlayer = 'one';
    var gameOver = false;

    for (i = 0; i < boxes.length; i++) {
        boxes[i].addEventListener('click', function (i) {
            if (gameOver) {
                this.removeEventListener('click', arguments.callee);
                message.textContent = "GAME OVER !";

            } else if (boxes[i + 7].classList.contains('taken') && !(boxes[i].classList.contains('taken'))) {
                message.textContent = "";
                boxes[i].classList.add('taken');
                boxes[i].classList.add(`player-${currentPlayer}`);
                currentPlayer = currentPlayer === 'one' ? 'two' : 'one';
                playerDisplay.textContent = currentPlayer === 'one' ? 1 : 2;
                checkWinner(i);
            } else {
                message.textContent = "Wrong Move !";
            }
        }.bind(this, i));
    }

    //Check if there is any win horizontally
    function horizontalCheck(index) {

        let min, max;
        if (0 <= index && index < 7) {
            min = 0;
            max = 6;
        } else if (7 <= index && index < 14) {
            min = 7;
            max = 13;
        } else if (14 <= index && index < 21) {
            min = 14;
            max = 20;
        } else if (0 <= index && index < 28) {
            min = 21;
            max = 27;
        } else if (0 <= index && index < 35) {
            min = 28;
            max = 34;
        } else if (0 <= index && index < 42) {
            min = 35;
            max = 41;
        }
        return [min, max];
    }

    //Check if there is any win vertically
    function verticalCheck(index) {

        let min, max;
        const column1 = [0, 7, 14, 21, 28, 35];
        const column2 = [1, 8, 15, 22, 29, 36];
        const column3 = [2, 9, 16, 23, 30, 37];
        const column4 = [3, 10, 17, 24, 31, 38];
        const column5 = [4, 11, 18, 25, 32, 39];
        const column6 = [5, 12, 19, 26, 33, 40];
        const column7 = [6, 13, 20, 27, 34, 41];

        if (column1.includes(index)) {
            min = 0;
            max = 35;
        } else if (column2.includes(index)) {
            min = 1;
            max = 36;
        } else if (column3.includes(index)) {
            min = 2;
            max = 37;
        } else if (column4.includes(index)) {
            min = 3;
            max = 38;
        } else if (column5.includes(index)) {
            min = 4;
            max = 39;
        } else if (column6.includes(index)) {
            min = 5;
            max = 40;
        } else if (column7.includes(index)) {
            min = 6;
            max = 41;
        }
        return [min, max];
    }


    //Check if there is any win vertically
    function diagonalCheck(index) {

        let min, max;
        const column1 = [0, 8, 16, 24, 32, 40];
        const column2 = [1, 9, 17, 25, 33, 41];
        const column3 = [2, 10, 18, 26, 34];
        const column4 = [7, 15, 23, 31, 39];
        const column5 = [3, 11, 19, 27];
        const column6 = [14, 22, 30, 38];

        if (column1.includes(index)) {
            min = 0;
            max = 40;
        } else if (column2.includes(index)) {
            min = 1;
            max = 41;
        } else if (column3.includes(index)) {
            min = 2;
            max = 34;
        } else if (column4.includes(index)) {
            min = 7;
            max = 39;
        } else if (column5.includes(index)) {
            min = 3;
            max = 27;
        } else if (column6.includes(index)) {
            min = 14;
            max = 38;
        }
        return [min, max];
    }

    //Iterating through the indices to determine a winner
    function iterateMethod(index, min, max, step) {
        var count = 0;
        for (i = min; i <= max; i += step) {
            if (boxes[i].classList.contains('player-one')) count++;
            else count = 0;
            if (4 <= count) {
                gameOver = true;
                finalScore.textContent = "Player 1 Won !!";
                break;
            }
        }
        count = 0;
        for (i = min; i <= max; i += step) {
            if (boxes[i].classList.contains('player-two')) count++;
            else count = 0;
            if (4 <= count) {
                gameOver = true;
                finalScore.textContent = "Player 2 Won !!";
                break;
            }
        }
    }


    function checkWinner(index) {
        const [rowMin, rowMax] = horizontalCheck(index);
        iterateMethod(index, rowMin, rowMax, 1);
        const [colMin, colMax] = verticalCheck(index);
        iterateMethod(index, colMin, colMax, 7);
        const [dgnMin, dgnMax] = diagonalCheck(index);
        iterateMethod(index, dgnMin, dgnMax, 8);
    }
});