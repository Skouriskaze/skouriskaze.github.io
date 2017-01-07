// JavaScript source code

function Mancala(props) {
    if (!props) var props = {}
    this.board = {};
    this.turn = "red";
    this.board["green"] = {6: 0};
    this.board["red"] = {6: 0};
    for (var i = 0; i < 6; i++) {
        this.board["red"][i] = props.initStones || 6;
        this.board["green"][i] = props.initStones || 6;
    }

    this.makeTurn = function (move) {
        console.log("Make Turn");
        if (move.color == this.turn) {
            // Moving tiles
            var num = this.board[move.color][move.rank];
            this.board[move.color][move.rank] = 0;
            if (!this.calculateNext(num, move)) {
                console.log("Killed it");
                this.turn = this.oppositeTurn();
            }

            // Moving next turn
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
        if (num < 1) {
            // Ended 
            if (spot.rank == 6) {
                // Landed in the pit, turn again
                return true;
            } else {
                return false;
            }
        } else {
            // Add one to the next spot
            var next;
            if (spot.rank + 1 > 6) {
                next = new Pit(spot.color == 'green' ? 'red' : 'green', 0);
            } else {
                next = new Pit(spot.color, spot.rank + 1)
            }
            this.board[next.color][next.rank] = this.getSpotValue(next) + 1;
            return this.calculateNext(num - 1, next);
        }
    }

    this.getSpotValue = function (spot) {
        return this.board[spot.color][spot.rank];
    }
}

function Pit(color, rank) {
    this.color = color;
    this.rank = rank;
    this.toString = function () {
        return this.color + this.rank;
    }
}