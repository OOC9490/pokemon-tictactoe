const ui = {
    symbolPaths: ["images/valor_logo.png","images/mystic_logo.png","images/instinct_logo.png","images/rocket_logo.png"],
    teamColours: ["#ed130a","#0073eb","#f4cc08","#d24a2a"],
    p0Team: "", //player 1
    p1Team: "", //player 2
    playerColours: [],
    games: 1,
    boardReset: 0,

    endOfGameMsg: function(turnPlayerTeam, drawCheck){
        $('#gameboard').addClass("disabled");
        $('.endGameOverlay').fadeIn(1500);
        if(drawCheck === true){
            $('#endGame').html(`It is a draw!<br>Play again with the same settings?`);
            this.updateScoreBoard(this.games,2);
        }else{
            $('#endGame').html( `Team  ${turnPlayerTeam} Won!<br>Play again with the same settings?` );
            this.playSound(turnPlayerTeam);
            this.updateScoreBoard(this.games,game.currentPlayer);
        };
    },

    setSymbol: function( index, team ){
        this.playerColours.push(this.teamColours[index]);
        this[team] = this.symbolPaths[index];
        game.setTeam( index, team );
    },

    showBoard: function(){
        $('.box').css({"opacity":"1","transition":`1s`});
        $('.opacityToggle').css({"opacity":"1"});
        setTimeout(function(){
            $('.restart').removeClass('disabled');
            $('.newSettings').removeClass('disabled');
            $('.box').removeClass('disabled');
            ui.playerTurnMsg(game.playerLabels[game.currentPlayer]);
            ui.colourChange(game.currentPlayer);
            ui.playSound("gameStart");
            $('div.resultsToggle').show();
        },2000);
    },

    drawSymbol: function( turnPlayerTeam, $clickedBox ){
        $clickedBox.html(`<img src=${ui[turnPlayerTeam]}>`);
    },

    playerTurnMsg: function(turnPlayerLabel){
        $('#inGameMessages').fadeOut(250).html(`It is ${turnPlayerLabel}'s turn!`).fadeIn(250);
    },

    restart: function(){
        $('.endGameOverlay').fadeOut(1000);
        $('#gameboard').removeClass('disabled');
        $('.box').removeClass('p0 p1').html("");
        game.resetGame();
    },

    colourChange: function(turnPlayer){
        const playerColour = this.playerColours[turnPlayer];
        $('#inGameMessages').css({"color":`${playerColour}`});
        $('.box').css({"box-shadow":`0 0 20px 7px ${playerColour}`});
    },

    playSound: function(className){
        $(`.${className}`)[0].play(); //converts a jQuery element to vanilla DOM so the play function can interact with it   
    },

    sideMenuToggler: function(subject, opposite){
        if($(`#${subject}`).css('width') !== "300px"){
            $(`#${subject}`).css({"width":"300px"});
            $(`#${opposite}`).css({"width":"0"});
            $('body').css({"margin-left":"300px"});
        }else{
            $(`#${subject}`).css({"width":"0"});
            $('body').css({"margin-left":"0"});
        };
    },

    updateScoreBoard: function(gameNumber,winningTeam){
        if( this.boardReset === 10 ){
            $('#results tr').not(':first').empty();
            this.boardReset = 0;
            return this.updateScoreBoard(gameNumber,winningTeam);
        }else{
            if(winningTeam > 1){
                $('#results tr:last').after(`<tr>
                <td class="rounds">GAME ${gameNumber}</td>
                <td class="winners">DRAW</td>
                </tr>`);
            }else{
                const teamName = `p${winningTeam}Team`;
                $('#results tr:last').after(`<tr>
                <td class="rounds">GAME ${gameNumber}</td>
                <td class="winners"><img src="${this[teamName]}"></td>
                </tr>`);
            }
            this.games++;
            this.boardReset++;
        }
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
            $('#setupErrors').html("Player 2 can't have the same team as Player 1!").show().delay(1500).fadeOut(1500);
            return;
        };
        $(`.${$team}`).addClass('disabled').fadeOut(1500);
        if( $team === 'p0Team'){
            $('.p1Team').delay(2100).fadeIn(1500);
        }else{
            $('#inGameMessages').html("Loading...").fadeIn(1000);
            setTimeout(function(){
                ui.showBoard();
            },2100);
        };
    });

    $('.restart').on('click',function(){
        ui.restart();
    });

    $('.menu, .buttons, .box').on('click',function(){
        ui.playSound("userInteract");
    });

    $('.resultsToggle, .rulesToggle').on('click',function(){
        const buttonValue = $(this).attr('value');
        const oppValue = $(this).attr('opposite');
        ui.sideMenuToggler( buttonValue, oppValue );
    });

    $('.newSettings').on('click', function(){
        window.location.href = "index.html";
    });
});