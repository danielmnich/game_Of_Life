function initBoard() {
    var GameOfLife = function (boardWidth, boardHeight) {
        this.width = boardWidth;
        this.height = boardHeight;
        this.board = document.querySelector(`#board`);
        this.cells = [];
    }

    GameOfLife.prototype.createBoard = function () {
        this.board.style.height = `${this.height * 10}px`;
        this.board.style.width = `${this.width * 10}px`;
        var allFields = this.height * this.width;
        for (var i = 0; i < allFields; i++) {
            var newDiv = document.createElement(`div`);
            this.board.appendChild(newDiv);
            this.cells.push(newDiv);
        }
        this.cells.map(function (cell) {
            cell.addEventListener(`click`, function () {
                this.classList.toggle(`live`);
            })
        })
    }

    GameOfLife.prototype.defineCoordinates = function () {
        this.cells.map((cell, index) => {
            cell.dataset.x = (index + this.width) % this.width + 1;
            cell.dataset.y = Math.floor(index / this.height) + 1;
        })
    }

    GameOfLife.prototype.live = function () {
        var that = this;
        
        function countCells(array) {
            
            for (var i = 0; i < array.length; i++) {

                var prime = array[i];
                var primeX = parseInt(prime.dataset.x, 10);
                var primeY = parseInt(prime.dataset.y, 10);
                var neighbours = [];

                var neighbour = document.querySelector(`[data-x = "${primeX - 1}"][data-y = "${primeY - 1}"]`);
                neighbours.push(neighbour);

                var neighbour = document.querySelector(`[data-x = "${primeX}"][data-y = "${primeY - 1}"]`);
                neighbours.push(neighbour);

                var neighbour = document.querySelector(`[data-x = "${primeX + 1}"][data-y = "${primeY - 1}"]`);
                neighbours.push(neighbour);

                var neighbour = document.querySelector(`[data-x = "${primeX - 1}"][data-y = "${primeY}"]`);
                neighbours.push(neighbour);

                var neighbour = document.querySelector(`[data-x = "${primeX + 1}"][data-y = "${primeY}"]`);
                neighbours.push(neighbour);

                var neighbour = document.querySelector(`[data-x = "${primeX - 1}"][data-y = "${primeY + 1}"]`);
                neighbours.push(neighbour);

                var neighbour = document.querySelector(`[data-x = "${primeX}"][data-y = "${primeY + 1}"]`);
                neighbours.push(neighbour);

                var neighbour = document.querySelector(`[data-x = "${primeX + 1}"][data-y = "${primeY + 1}"]`);
                neighbours.push(neighbour);

                if (primeX == 1 && (primeY > 1 && primeY < that.height)) {
                    var neighbour = document.querySelector(`[data-x = "${that.width}"][data-y = "${primeY - 1}"]`);
                    neighbours.push(neighbour);

                    var neighbour = document.querySelector(`[data-x = "${that.width}"][data-y = "${primeY}"]`);
                    neighbours.push(neighbour);

                    var neighbour = document.querySelector(`[data-x = "${that.width}"][data-y = "${primeY + 1}"]`);
                    neighbours.push(neighbour);

                }

                if (primeX == that.width && (primeY > 1 && primeY < that.height)) {
                    var neighbour = document.querySelector(`[data-x = "${1}"][data-y = "${primeY - 1}"]`);
                    neighbours.push(neighbour);

                    var neighbour = document.querySelector(`[data-x = "${1}"][data-y = "${primeY}"]`);
                    neighbours.push(neighbour);

                    var neighbour = document.querySelector(`[data-x = "${1}"][data-y = "${primeY + 1}"]`);
                    neighbours.push(neighbour);

                }


                if (primeY == 1 && (primeX > 1 && primeX < that.width)) {
                    var neighbour = document.querySelector(`[data-x = "${primeX - 1}"][data-y = "${that.height}"]`);
                    neighbours.push(neighbour);

                    var neighbour = document.querySelector(`[data-x = "${primeX}"][data-y = "${that.height}"]`);
                    neighbours.push(neighbour);

                    var neighbour = document.querySelector(`[data-x = "${primeX + 1}"][data-y = "${that.height}"]`);
                    neighbours.push(neighbour);

                }

                if (primeY == that.height && (primeX > 1 && primeX < that.width)) {
                    var neighbour = document.querySelector(`[data-x = "${primeX - 1}"][data-y = "${1}"]`);
                    neighbours.push(neighbour);

                    var neighbour = document.querySelector(`[data-x = "${primeX}"][data-y = "${1}"]`);
                    neighbours.push(neighbour);

                    var neighbour = document.querySelector(`[data-x = "${primeX + 1}"][data-y = "${1}"]`);
                    neighbours.push(neighbour);

                }


                if (primeX == 1 && primeY == 1){
                    var neighbour = document.querySelector(`[data-x = "${that.width}"][data-y = "${that.height}"]`);
                    neighbours.push(neighbour);
                }


                if (primeX == 1 && primeY == that.height){
                    var neighbour = document.querySelector(`[data-x = "${that.width}"][data-y = "${1}"]`);
                    neighbours.push(neighbour);
                }

                if (primeX == that.width && primeY == that.height){
                    var neighbour = document.querySelector(`[data-x = "${1}"][data-y = "${1}"]`);
                    neighbours.push(neighbour);
                }

                if (primeX == that.width && primeY == 1){
                    var neighbour = document.querySelector(`[data-x = "${1}"][data-y = "${that.height}"]`);
                    neighbours.push(neighbour);
                }

                var realNeighbours = [];
                for (var j = 0; j < neighbours.length; j++) {
                    if (neighbours[j] !== null && neighbours[j].className == `live`) {
                        realNeighbours.push(neighbours[j]);
                    }
                }

                if (prime.classList.contains('live')) {
                    if (realNeighbours.length == 2 || realNeighbours.length == 3) {
                        prime.dataset.live = '1';
                    } else {
                        prime.dataset.live = '0';
                    }
                } else {
                    if (realNeighbours.length == 3) {
                        prime.dataset.live = '1';
                    }
                }
            }

        }

        var allLive = document.querySelectorAll(`.live`);
        countCells(allLive);

        var allDead = document.querySelectorAll(`#board div:not(.live)`);
        countCells(allDead);

        var all = document.querySelectorAll(`#board div`);
        for (var i = 0; i < all.length; i++) {
            if (all[i].dataset.live == '1') {
                all[i].classList.add('live');
            } else {
                all[i].classList.remove('live');
            }
        }
    };






    var game = new GameOfLife(20, 20);
    game.createBoard();
    game.defineCoordinates();
    console.log(game);

    var playBtn = document.querySelector(`#play`);
    var pauseBtn = document.querySelector(`#pause`);
    var time = null;

    playBtn.addEventListener('click',  () => {
        time = setInterval(_ => {
            game.live();
        }, 100)
    });

    pauseBtn.addEventListener('click',  () => {
        clearInterval(time);
    });

}

document.addEventListener("DOMContentLoaded", initBoard);













