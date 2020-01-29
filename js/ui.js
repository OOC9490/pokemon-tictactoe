const ui = {
    symbolPaths: ["images/valor_logo.png","images/mystic_logo.png","images/instinct_logo.png","images/rocket_logo.png"],
    p0Team: "", //player 1
    p1Team: "", //player 2

    endOfGameMsg: function(turnPlayerTeam, moves){
        $('#gameboard').addClass("disabled");
        $('.endGameOverlay').fadeIn(1500);
        if(moves === 9){
            $('#endGame').html(`It is a draw!`);
        }else{
            $('#endGame').html( `Team  ${turnPlayerTeam} Won!<br>Play again with the same settings?` );
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
        $('#midgameRestart').css({"opacity":"1"});
        setTimeout(function(){
            $('#midgameRestart').removeClass('disabled');
            $('.box').removeClass('disabled');
            ui.playerTurnMsg(game.playerLabels[game.currentPlayer]);
        },3000);
    },

    drawSymbol: function( turnPlayerTeam, $clickedBox ){
        $clickedBox.html(`<img src=${ui[turnPlayerTeam]}>`);
    },

    playerTurnMsg: function(turnPlayerLabel){
        $('#inGameMessages').fadeOut(250).html(`It is ${turnPlayerLabel}'s turn!`).fadeIn(250);
    },

    
}

$('#restart').on('click',function(){
    ui.restart();
});

$('#midgameRestart').on('click',function(){
    ui.restart();
});

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
            $('#setupErrors').html("Player 2 can't have the same team as Player 1!").show().delay(1500).fadeOut(1500);
            return;
        };
        $(`.${$team}`).addClass('disabled').fadeOut(1500);
        if( $team === 'p0Team'){
            $('.p1Team').delay(2100).fadeIn(1500);
        }else{
            setTimeout(function(){
                ui.showBoard();
            },2100);
        };
    });
});


