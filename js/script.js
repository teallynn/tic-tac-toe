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
  let playerName = '';
  $('#player1').addClass('active');

  const $fullBoard = $('.box')
  let oSpaces = [];
  let xSpaces = [];

  // Start Screen visible until Start Button pushed when board is shown
  $board.hide();
  $endScreen.hide();

  $('#start-button').click(function() {
    playerName = $('#start-name').val();
    if (playerName === '') {
      $('#start-button').before('<p style="color, red" id="name-error">Please enter a name for player</p>')
    } else {
      $board.show();
      $startScreen.hide();
      hoverImageListener();
    }
  });

  /*
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

  function isGameOver() {
    let $freeSpaces = $('.box').not('.box-filled-1, .box-filled-2');
    if ( $freeSpaces.length <= 0 || oWins || xWins ) {
      gameOver = true;
    } else {
      gameOver = false
    }
    return gameOver;
  }

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

  function endGame() {
    $board.hide();
    if (oWins) {
      $endScreen.addClass('screen-win-one');
      $('.message').text('Winner');
    } else if (xWins) {
      $endScreen.addClass('screen-win-two');
      $('.message').text('Winner');
    } else {
      $endScreen.addClass('screen-win-tie');
      $('.message').text("It's a draw");
    }
    $endScreen.show();
  }

  function resetGame() {
    $('#player1').addClass('active');
    playerOActive = true;
    $('#player2').removeClass('active');
    playerXActive = false;
    gameOver = false;
    xWins = false;
    oWins = false;
    $('.box-filled-1').removeClass('box-filled-1');
    $('.box-filled-2').removeClass('box-filled-2');
    $('.box').on('click');
    $('.box').on('mouseenter');
    $('.box').on('mouseleave');
    $('.box').css('background-image', 'none');
    oSpaces = [];
    xSpaces = [];
    let playerName = '';
  }

  // Board space hover event listener
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

  // Board space click event listener
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

  // New Game button event listener
  $('#new-game').click(function() {
    $endScreen.hide();
    $board.show();
    resetGame();
    hoverImageListener();
  });

//}());
