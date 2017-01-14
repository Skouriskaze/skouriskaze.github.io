// JavaScript source code

function Mancala(props) {
    if (!props) var props = {}
    this.board = {};
    this.turn = "green";
    this.board["green"] = {6: 0};
    this.board["red"] = { 6: 0 };
    for (var i = 0; i < 6; i++) {
        this.board["red"][i] = props.initStones || 6;
        this.board["green"][i] = props.initStones || 6;
    }

    this.makeTurn = function (move) {
        if (move.color == this.turn) {
            // Moving tiles
            var num = this.board[move.color][move.rank];
            //this.board[move.color][move.rank] = 0;
            if (this.calculateNext(num, move).length > 0) {
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

    this.calculateNext = function (num, spot) {
        if (num < 1) {
            // We clicked on a 0. Give them their turn back.
            return [[]];
        } else {

        }
    }

    this.getNextSpot = function (spot) {
        if (spot.rank < 5) {
            // Return next pit
            return new Pit(spot.color, spot.rank + 1);
        } else if (spot.rank == 5) {
            if (spot.color == this.turn) {
                // Return own color store
                return new Pit(spot.color, spot.rank + 1)
            } else {
                // Return start of other row
                return new Pit(spot.color == 'green' ? 'red' : 'green', 0);
            }
        } else {
            // Return start of other row
            return new Pit(spot.color == 'green' ? 'red' : 'green', 0);
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