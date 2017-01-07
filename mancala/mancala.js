// JavaScript source code

function Mancala() {
    this.board = {};
    this.turn = "red";
    this.board["green"] = {};
    this.board["red"] = {};
    for (var i = 0; i < 6; i++) {
        this.board["red"][i] = i;
        this.board["green"][i] = i;
    }

    this.makeTurn = function (move) {
        if (move.color == this.turn) {
            // Moving tiles
            var num = this.board[move.color][move.rank];
            this.board[move.color][move.rank] = 0;
            for (var i = 0; i < num; i++) {
                if (Math.floor((move.rank + i + 1) / 6) % 2 == 0) {
                    this.board[this.turn][(move.rank + 1 + i) % 6]++;
                } else {
                    this.board[this.oppositeTurn()][(move.rank + 1 + i) % 6]++;
                }
            }

            // Moving next turn
            this.turn = this.oppositeTurn();
            return true;
        } else {
            return false;
        }
    }

    this.oppositeTurn = function () {
        if (this.turn == 'red') return 'green';
        else return 'red';
    }

    this.calculateNext = function(num, spot) {

    }
}

function Pit(color, rank) {
    this.color = color;
    this.rank = rank;
    this.toString = function () {
        return this.color + this.rank;
    }
}