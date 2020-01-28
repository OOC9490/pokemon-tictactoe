// Keep track of how many of each win states each user has been involved in.
// The first element in each array is player 0, the second is player 1
const game =
{
    scoreCard: { 1: [0, 0], 2: [0, 0], 3: [0, 0], 4: [0, 0], 5: [0, 0], 6: [0, 0], 7: [0, 0], 8: [0, 0] },
    cur: 0,

    check: function( id, player ){
    // iterate over each number in the ID string for the square, i.e. [1,4,7]
        for (var i = 0; i < id.length; i++) {
            var winState = id[i];
            scoreCard[ winState ][ player ] += 1;  // register the current move by incrementing the counter for this win state
            if(scoreCard[ winState ][ player ] === 3 ){
            // if any of these reach 3, it means they've won
            $('<h1>').text( 'Player ' + cur + ' Won' ).appendTo( 'body' );
            }
        }
    }
}
$(document).ready(function(){
    $('.box').on('click', function() {
        game.cur = 1 - game.cur;  // switch between players (used as array index)
        $(this).addClass( 'p' + game.cur );  // play move into square
        check( $(this).attr('id'), game.cur );   // pass square ID into win check function
    });
});