const ui = {
    symbolPaths: ["images/valor_logo.png","images/mystic_logo.png","images/instinct_logo.png","images/rocket_logo.png"],
    p0Team: "", //player 1
    p1Team: "", //player 2
    endOfGameMsg: function(turnPlayerTeam, moves){
        if(moves === 9){
            $('<h1>').text("It is a draw!").appendTo(' body ');
        }else{
            $('<h1>').text( 'Team ' + turnPlayerTeam + ' Won' ).appendTo( 'body' );
        };
    },

    setSymbol: function( index, team ){
        this[team] = this.symbolPaths[index];
        game.setTeam( index, team );
    },

    showBoard: function(){
        let increaseFade = 0.5;
        $('.box').each(function(){
            $(this).css({"opacity":"1","transition":`${ 1.5 + increaseFade }s`});
            increaseFade += 0.5;
        });
    },

    drawSymbol: function( turnPlayerTeam, $clickedBox ){
        $clickedBox.html(`<img src=${ui[turnPlayerTeam]}>`);
    },
}
$(document).ready(function(){
    $('.cpuChecker').on('click', function(){
        if($(this).value === "cpu"){
            game.cpuEnabled = true;
        };
        $('.cpuToggle').fadeOut(1500);
        $('.p0Team').delay(2100).fadeIn(1500);
    });

    $('.teamSelect').on('click', function(){
        const $indexPosition = parseInt($(this).val());
        const $team = $(this).attr('team');
        
        ui.setSymbol( $indexPosition, $team );
        if( ui.p0Team === ui.p1Team){
            $('#userMessages').html("Player 2 can't have the same team as Player 1!").show();
            $('#userMessages').delay(1500).fadeOut(1500);
            return;
        };

        $(`.${$team}`).fadeOut(1500);
        if( $team === 'p0Team'){
            $('.p1Team').delay(2100).fadeIn(1500);
        }else{
            setTimeout(ui.showBoard,2100);
        };
    });
});


