aiTurn: function(){
    if(this.cpuEnabled && this.currentPlayer === 1){
        const tilesNotFilled = Object.keys(this.tilesFilled).filter(key => this.tilesFilled[key] === false);
        const aiAboutToWin = Object.keys(this.scoreCard).filter(key => this.scoreCard[key][1] === 2);
        if ( aiAboutToWin.length > 1){
            for(let i = 0; i < aiAboutToWin.length; i++){
                const currentElement = aiAboutToWin[i];
                const winningTile = tilesNotFilled.filter(element => element.includes(currentElement));
                if( winningTile.length !== 0){
                    $(`#${winningTile[0]}`).click()
                    return;
                };
            };
        }; //AI prioritises winning over anything else
        const aiAboutToLose = Object.keys(this.scoreCard).filter(key => this.scoreCard[key][0] === 2);
        if ( aiAboutToLose.length > 1){
            for(let i = 0; i < aiAboutToWin.length; i++){
                const currentElement = aiAboutToWin[i];
                const denyingTile = tilesNotFilled.filter(element => element.includes(currentElement));
                if( denyingTile.length !== 0){
                    $(`#${denyingTile[0]}`).click()
                    return;
                };
            };
        }; //AI then checks for any possible player winning situations
        const aiSetupWin = Object.keys(this.scoreCard).filter(key => this.scoreCard[key][1] === 1);
        if ( aiSetupWin.length > 1){
            for(let i = 0; i < aiSetupWin.length; i++){
                const currentElement = aiSetupWin[i];
                const setupTiles = tilesNotFilled.filter(element => element.includes(currentElement));
                if( setupTiles.length > 1){
                    $(`#${setupTiles[Math.floor( Math.random() * setupTiles.length)]}`).click()
                    return;
                };
            };
        }; //AI then checks for any moves that would set up a possible win (so it ignores any lines on the board that already have no chance of winnning)
        //Otherwise it just chooses a random tile
        const choice = tilesNotFilled[ Math.floor( Math.random() * tilesNotFilled.length ) ];
        $(`#${choice}`).click();
    };
    return;
},