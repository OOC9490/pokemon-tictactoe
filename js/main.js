// Keep track of how many of each win states each user has been involved in.
// The first element in each array is player 1 (0th index), the second is player 2 (1st index)
const game =
{
    scoreCard: { 1: [0, 0], 2: [0, 0], 3: [0, 0], 4: [0, 0], 5: [0, 0], 6: [0, 0], 7: [0, 0], 8: [0, 0] },
    tilesFilled: { "147": false, "15": false, "168": false, "24": false, "2578": false, "26": false, "348": false, "35": false, "367": false},
    currentPlayer: 0, //0 for player 1, 1 for player 2
    teams: ["Valor","Mystic","Instinct","Rocket"],
    p0Team: "", //player 1
    p1Team: "", //player 2
    cpuEnabled: false,
    currentMoves: 0,
    drawCheck: false,
    playerLabels: [],
    leadingPlayer: 0,

    coinFlip: function(){
        if ( Math.random() > 0.5 ){
            this.leadingPlayer = 1; //Player 2 goes first
            return 1;
        }else{
            this.leadingPlayer = 0; //Player 1 goes first
            return 0;
        }
    },

    //Checks for a win or a draw
    check: function( id, player, team ){
        this.tilesFilled[id] = true;
        // iterate over each number in the ID string for the square, i.e. [1,4,7]
        for (var i = 0; i < id.length; i++) {
            var winState = id[i];
            this.scoreCard[ winState ][ player ] += 1;  // register the current move by incrementing the counter for this win state
            if(this.scoreCard[ winState ][ player ] === 3 ){
            // if any of these reach 3, it means they've won
                ui.endOfGameMsg(team, this.drawCheck);
                return;
            }
        };
        //check for a draw and exit check function if the game state is found to be a draw
        if(this.currentMoves === 9){
            this.drawCheck = true;
            ui.endOfGameMsg(team, this.drawCheck);
            return;
        };
        this.currentPlayer = 1 - player;  // switch between players (used as array index)
        ui.playerTurnMsg(this.playerLabels[this.currentPlayer]);
        ui.colourChange(this.currentPlayer);
        this.aiTurn();
    },

    setTeam: function( index, team ){
        this[team] = this.teams[index];
        this.playerLabels.push(this[team]);
    },

    resetGame: function(){
        this.drawCheck = false;
        this.currentMoves = 0;
        this.currentPlayer = this.coinFlip();
        Object.keys(this.scoreCard).forEach(number => this.scoreCard[number] = [0,0]);
        Object.keys(this.tilesFilled).forEach(key => this.tilesFilled[key] = false);
        ui.playerTurnMsg(this.playerLabels[this.currentPlayer]);
        ui.colourChange(this.currentPlayer);
        this.aiFirstMove();
    },

    aiFirstMove: function(){
        if(this.cpuEnabled && this.leadingPlayer === 1){
            this.aiTurn();
        }else{
            return;
        }
    },

    aiTurn: function(){
        if(this.cpuEnabled && this.currentPlayer === 1){
            const tilesNotFilled = Object.keys(this.tilesFilled).filter(key => this.tilesFilled[key] === false);
            const choice = tilesNotFilled[ Math.floor( Math.random() * tilesNotFilled.length ) ];
            $(`#${choice}`).click();
        }else{
            return;
        }
    }
}
$(document).ready(function(){
    game.currentPlayer = game.coinFlip(); //randomises who goes first
    $('.box').on('click', function() {
        if( $(this).hasClass('p0') === false && $(this).hasClass('p1') === false ){
            const currentPlayer = `p${game.currentPlayer}Team`;
            $(this).addClass( 'p' + game.currentPlayer );  // play move into square
            ui.drawSymbol( currentPlayer, $(this) );
            game.currentMoves++;
            game.check( $(this).attr('id'), game.currentPlayer, game[currentPlayer] );   // pass square ID into win check function
        };
    }); 
});