//(function(){
  //Initial Game and Player variables and states
  let $board = $('.board');
  let $startScreen = $('#start');
  let $endScreen = $('#finish');
  let $playerO = $('#player1');
  let $playerX = $('#player2');
  let playerXActive = false;
  let playerOActive = true;
  let gameOver = false;
  let xWins = false;
  let oWins = false;
  let player1Name = '';
  $('#player1').addClass('active');
  let oSpaces = [];
  let xSpaces = [];

  // Start Screen visible until Start Button pushed when board is shown
  $board.hide();
  $endScreen.hide();

  /***************************************************************************
   * Start button event listeneer captures players name and starts game by hiding
   *start screen, showing board an calling the hoverImageListener function. Gives
   * error if player didn't enter a name.
   **************************************************************************
   */
  $('#start-button').click(function() {
    player1Name = $('#start-name').val();
    if (player1Name === '') {
      $('#start-button').before('<p style="color, red" id="name-error">Please enter a name for player</p>')
    } else {
      $board.show();
      $startScreen.hide();
      hoverImageListener();
      clickSpaceListener();
      $('#player-1-name').text('Player 1: ' + player1Name);
      if ($('#name-error')) {
        $('#name-error').remove();
      }
      $('#start-name').val('');
    }
  });

  /***************************************************************************
   * The takeTurn function wil be called when a player clicks on a space. Game
   * space will be filled with players symbol and added to the array of used
   * spaces, then other player is made active.
   **************************************************************************
   */
  function takeTurn(boardspace) {
    if (playerXActive) {
      boardspace.addClass('box-filled-2');
      playerXActive = false;
      playerOActive = true;
      $playerO.addClass('active');
      $playerX.removeClass('active');
      xSpaces.push(boardspace.attr('id'));
    } else if (playerOActive) {
      boardspace.addClass('box-filled-1');
      playerOActive = false;
      playerXActive = true;
      $playerX.addClass('active');
      $playerO.removeClass('active');
      oSpaces.push(boardspace.attr('id'));
    }

  }

  /***************************************************************************
   * Checks each space to see if it has been filled by a player. If all spaces
   * are filled, or the oWins or xWins variables has been set to true, gameOver
   * is set to true, otherwise gameOver remains false.
   **************************************************************************
   */
  function isGameOver() {
    let $freeSpaces = $('.box').not('.box-filled-1, .box-filled-2');
    if ( $freeSpaces.length <= 0 || oWins || xWins ) {
      gameOver = true;
    } else {
      gameOver = false
    }
    return gameOver;
  }

  /***************************************************************************
   * Checks all possible win conditions for the O player by checking if the
   * oSpaces array contains any 3 touching boxes. Sets oWins variable to true
   * or false accordingly.
   **************************************************************************
   */
  function hasOWon() {
    if (oSpaces.includes('box-1') && oSpaces.includes('box-2') && oSpaces.includes('box-3')) {
      oWins = true;
    } else if (oSpaces.includes('box-4') && oSpaces.includes('box-5') && oSpaces.includes('box-6')) {
      oWins = true;
    } else if (oSpaces.includes('box-7') && oSpaces.includes('box-8') && oSpaces.includes('box-9')) {
      oWins = true;
    } else if (oSpaces.includes('box-1') && oSpaces.includes('box-4') && oSpaces.includes('box-7')) {
      oWins = true;
    } else if (oSpaces.includes('box-2') && oSpaces.includes('box-5') && oSpaces.includes('box-8')) {
      oWins = true;
    } else if (oSpaces.includes('box-3') && oSpaces.includes('box-6') && oSpaces.includes('box-9')) {
      oWins = true;
    } else if (oSpaces.includes('box-1') && oSpaces.includes('box-5') && oSpaces.includes('box-9')) {
      oWins = true;
    } else if (oSpaces.includes('box-3') && oSpaces.includes('box-5') && oSpaces.includes('box-7')) {
      oWins = true;
    } else {
      oWins = false;
    }
    return oWins;
  }

  /***************************************************************************
   * Checks all possible win conditions for the X player by checking if the
   * xSpaces array contains any 3 touching boxes. Sets xWins variable to true
   * or false accordingly.
   **************************************************************************
   */
  function hasXwon() {
    if (xSpaces.includes('box-1') && xSpaces.includes('box-2') && xSpaces.includes('box-3')) {
      xWins = true;
    } else if (xSpaces.includes('box-4') && xSpaces.includes('box-5') && xSpaces.includes('box-6')) {
      xWins = true;
    } else if (xSpaces.includes('box-7') && xSpaces.includes('box-8') && xSpaces.includes('box-9')) {
      xWins = true;
    } else if (xSpaces.includes('box-1') && xSpaces.includes('box-4') && xSpaces.includes('box-7')) {
      xWins = true;
    } else if (xSpaces.includes('box-2') && xSpaces.includes('box-5') && xSpaces.includes('box-8')) {
      xWins = true;
    } else if (xSpaces.includes('box-3') && xSpaces.includes('box-6') && xSpaces.includes('box-9')) {
      xWins = true;
    } else if (xSpaces.includes('box-1') && xSpaces.includes('box-5') && xSpaces.includes('box-9')) {
      xWins = true;
    } else if (xSpaces.includes('box-3') && xSpaces.includes('box-5') && xSpaces.includes('box-7')) {
      xWins = true;
    } else {
      xWins = false;
    }
    return xWins;
  }

  /***************************************************************************
   * Hides the game board and shows the win screen with player names or draw
   * screen according to the oWins and xWins variables.
   **************************************************************************
   */
  function endGame() {
    $board.hide();
    if (oWins) {
      $endScreen.addClass('screen-win-one');
      $('.message').text('Winner:' + player1Name);
    } else if (xWins) {
      $endScreen.addClass('screen-win-two');
      $('.message').text('Winner: Computer');
    } else {
      $endScreen.addClass('screen-win-tie');
      $('.message').text("It's a draw");
    }
    $endScreen.show();
  }

  /**************************************************************************
   * Resets game variable to their initial values, removes added classes from
   * game board elements. Reactivates the click, mouse enter, and mouse remove
   * events.
   **************************************************************************
   */
  function resetGame() {
    // reset game variables to initial conditions
    playerOActive = true;
    playerXActive = false;
    gameOver = false;
    xWins = false;
    oWins = false;
    oSpaces = [];
    xSpaces = [];

    //reset dynamically added classes and images
    $('#player1').addClass('active');
    $('#player2').removeClass('active');
    $('.box-filled-1').removeClass('box-filled-1');
    $('.box-filled-2').removeClass('box-filled-2');
    $('.box').css('background-image', 'none');
    $('.screen-win').removeClass('screen-win-one');
    $('.screen-win').removeClass('screen-win-two');
    $('.screen-win').removeClass('screen-win-tie');
  }

  /**************************************************************************
   * Board space hover event listener, shows the symbol of the active player
   * when they hover over open spaces. Inside a function to avoid double
   * listeners in new games on spaces that weren't used in previous game.
   **************************************************************************
   */
  function hoverImageListener() {
    $('.box').hover(function() {
      let $space = $(this);
      if (playerXActive) {
        $space.css('background-image', 'url(img/x.svg)')
      } else if (playerOActive) {
        $space.css('background-image', 'url(img/o.svg)');
      }
    }, function() {
        let $space = $(this);
        $space.css('background-image', 'none');
    });
  }

  /**************************************************************************
   * Board space click event listener, adds the symbol and color of the player
   * who clicked the box. Disables all hover and click listeners on the box so
   * that it can't be clicked again. Checks win conditions to end the game if
   * appropriate. Listener is inside a function to avoid double listeners in
   * new games on spaces that weren't used in previous game.
   **************************************************************************
   */
  function clickSpaceListener() {
    $('.box').click(function() {
      let $box = $(this);
      $box.off('click');
      $box.off('mouseenter');
      $box.off('mouseleave');
      takeTurn($box);
      hasOWon();
      hasXwon();
      isGameOver();
      if (gameOver == true) {
        setTimeout(endGame, 500);
      }
    });
  }

  /**************************************************************************
   * New Game button event listener. Shows start screen to prompt user to enter
   * a name
   **************************************************************************
   */
  $('#new-game').click(function() {
    resetGame();
    $endScreen.hide();
    $board.show();
    //$startScreen.show();
    $('.box').off('click');
    $('.box').off('mouseenter');
    $('.box').off('mouseleave');
    hoverImageListener();
    clickSpaceListener();
  });

//}());
