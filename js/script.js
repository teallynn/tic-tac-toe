
// Start Screen visible until Start Button pushed when board is shown
$('.board').hide();

$('#start-button').click(function() {
  $('.board').show();
  $('#start').hide();
});

//Initial Game and Player variables
let playerXActive = false;
let playerOActive = true;
let gameOver = false;
let xWins = false;
let oWins = false;


$('#player1').addClass('active')

function takeTurn(boardspace) {
  if (playerXActive) {
    boardspace.addClass('box-filled-2');
    playerXActive = false;
    playerOActive = true;
    $('#player1').addClass('active');
    $('#player2').removeClass('active');
  } else if (playerOActive) {
    boardspace.addClass('box-filled-1');
    playerOActive = false;
    playerXActive = true;
    $('#player2').addClass('active');
    $('#player1').removeClass('active');
  }
}

function isGameOver() {
  let spaceFree = $('.box').not('.box-filled-1, .box-filled-2');
  if (spaceFree.length > 0) {
    gameOver = false;
  } else {
    gameOver = true;
  }
  return gameOver;
}
// Board space event listener
$('.box').click(function() {
  let box = $(this);
  takeTurn(box);
  isGameOver();
});
