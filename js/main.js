// Keep track of how many of each win states each user has been involved in.
// The first element in each array is player 0, the second is player 1
const game =
{
    scoreCard: { 1: [0, 0], 2: [0, 0], 3: [0, 0], 4: [0, 0], 5: [0, 0], 6: [0, 0], 7: [0, 0], 8: [0, 0] },
    currentPlayer: 0, //0 for player 1, 1 for player 2
    teams: ["Valor","Mystic","Instinct","Rocket"],
    p0Team: "", //player 1
    p1Team: "", //player 2
    cpuEnabled: false,
    currentMoves: 0,
    playerLabels: [],

    //Checks for a win or a draw
    check: function( id, player, team ){
        //check for a draw and exit check function if the game state is found to be a draw
        if(this.currentMoves === 9){
            ui.endOfGameMsg(team, this.currentMoves);
            return;
        };
        // iterate over each number in the ID string for the square, i.e. [1,4,7]
        for (var i = 0; i < id.length; i++) {
            var winState = id[i];
            this.scoreCard[ winState ][ player ] += 1;  // register the current move by incrementing the counter for this win state
            if(this.scoreCard[ winState ][ player ] === 3 ){
            // if any of these reach 3, it means they've won
                ui.endOfGameMsg(team, this.currentMoves);
                return;
            }
        };
        this.currentPlayer = 1 - player;  // switch between players (used as array index)
        ui.playerTurnMsg(this.playerLabels[this.currentPlayer]);
    },
    setTeam: function( index, team ){
        this[team] = this.teams[index];
        this.playerLabels.push(this[team]);
    }
}
$(document).ready(function(){
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