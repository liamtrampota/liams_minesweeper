('working')

var game = [[]];
var targetRevealed;
var gameState;
var firstClick;
var globalSize;
var globalBombs;

function createGame(size, bombs){
  $('.status').empty()
  $('.status').append('<img src="curiousface.png" alt="curious face" height="42" width="42">')
  firstClick = true;
  globalSize = size;
  globalBombs = bombs
  for(var i = 0; i < size; i++){
    $('#gameGrid').append('<div class = "col-xs-12" id=R' + i+ '></div>')
    for(var j = 0; j < size; j++){
      $('#R'+i).append('<div class = wrap move> <div class = column id=' + String(i) + '-' + String(j) + '></div> </div>')
    }
  }

  var wrapperWidth = (99.5/size).toPrecision(3);

  var width = 100;
  $('.wrap').css('display', 'inline-block')
  $('.wrap').css('width', wrapperWidth+'%')
  $('.wrap').css('position', 'relative')

  $('.column').css('display', 'inline-block')
  $('.column').css('width', width+'%')
  $('.column').css('padding-top', width +'%')
  $('.column').css('position', 'relative')
  targetRevealed = size*size - bombs;
  placeBombs(game, bombs, size);
  placeValues(game, size);
  fontsize();
}

  function placeBombs(board, bombs, size){
    var i = 0;
    while(i<bombs){
      var col = Math.floor(Math.random() * Math.floor(size))
      var row = Math.floor(Math.random() * Math.floor(size))
      if($('#'+String(row)+'-'+String(col)).attr('name') != 'B') {
        $('#'+String(row)+'-'+String(col)).attr('name', 'B')
        $('#'+String(row)+'-'+String(col)).addClass('bomb')
        //$('#'+String(row)+String(col)).append('B')
        i = i+1;
      }
  }
  (game);
}

  function placeValues(board, size){
    console.log('placing placeValues')
    for(var i = 0; i<size; i++){
      for(var j = 0; j<size; j++){
        var counter = 0;
        var row = i;
        var col = j;
        if($('#'+String(row+1)+'-'+String(col+1)).attr('name') == 'B') {
          counter = counter + 1
        }
        if($('#'+String(row+1)+'-'+String(col)).attr('name') == 'B') {
          counter = counter + 1
        }
        if($('#'+String(row+1)+'-'+String(col-1)).attr('name') == 'B') {
          counter = counter + 1
        }
        if($('#'+String(row)+'-'+String(col+1)).attr('name') == 'B') {
          counter = counter + 1
        }
        if($('#'+String(row)+'-'+String(col-1)).attr('name') == 'B') {
          counter = counter + 1
        }
        if($('#'+String(row-1)+'-'+String(col+1)).attr('name') == 'B') {
          counter = counter + 1
        }
        if($('#'+String(row-1)+'-'+String(col)).attr('name') == 'B') {
          counter = counter + 1
        }
        if($('#'+String(row-1)+'-'+String(col-1)).attr('name') == 'B') {
          counter = counter + 1
        }
        if(counter > 0 && $('#'+String(row)+'-'+String(col)).attr('name') != 'B') {
        $('#'+String(row)+'-'+String(col)).addClass('count'+String(counter)+' number');
        //$('#'+String(row)+String(col)).append(counter);
        }
        else{
          $('#'+String(row)+'-'+String(col)).addClass('empty')
        }
      }
    }
  }

  function revealEmpty(row, col){
    if($('#'+String(row+1)+'-'+String(col+1)).attr('class') == 'column empty') {
      $('#'+String(row+1)+'-'+String(col+1)).css('background-color', 'white');
      $('#'+String(row+1)+'-'+String(col+1)).addClass('revealed');
      $('#'+String(row+1)+'-'+String(col+1)).css('box-shadow', 'none');
      revealEmpty(row+1, col+1);
    }
    if($('#'+String(row+1)+'-'+String(col+1)).hasClass('number') && !$('#'+String(row+1)+'-'+String(col+1)).hasClass('numberRevealed')) {

      var cellNumber = Number($('#'+String(row+1)+'-'+String(col+1)).attr('class')[12])
      $('#'+String(row+1)+'-'+String(col+1)).append('<span>'+cellNumber+'</span>');
      $('#'+String(row+1)+'-'+String(col+1)).addClass('numberRevealed revealed')
      colorCell($('#'+String(row+1)+'-'+String(col+1)), cellNumber);
    }

    if($('#'+String(row+1)+'-'+String(col)).attr('class') == 'column empty') {
      $('#'+String(row+1)+'-'+String(col)).css('background-color', 'white');
      $('#'+String(row+1)+'-'+String(col)).addClass('revealed');
      $('#'+String(row+1)+'-'+String(col)).css('box-shadow', 'none');
      revealEmpty(row+1, col);
    }
    if($('#'+String(row+1)+'-'+String(col)).hasClass('number') && !$('#'+String(row+1)+'-'+String(col)).hasClass('numberRevealed')) {

      var cellNumber = Number($('#'+String(row+1)+'-'+String(col)).attr('class')[12])
      $('#'+String(row+1)+'-'+String(col)).append('<span>'+cellNumber+'</span>');
      $('#'+String(row+1)+'-'+String(col)).addClass('numberRevealed revealed')
      colorCell($('#'+String(row+1)+'-'+String(col)), cellNumber);
    }

    if($('#'+String(row+1)+'-'+String(col-1)).attr('class') == 'column empty') {
      $('#'+String(row+1)+'-'+String(col-1)).css('background-color', 'white');
      $('#'+String(row+1)+'-'+String(col-1)).addClass('revealed');
      $('#'+String(row+1)+'-'+String(col-1)).css('box-shadow', 'none');
      revealEmpty(row+1, col-1);
    }
    if($('#'+String(row+1)+'-'+String(col-1)).hasClass('number') && !$('#'+String(row+1)+'-'+String(col-1)).hasClass('numberRevealed')) {

      var cellNumber = Number($('#'+String(row+1)+'-'+String(col-1)).attr('class')[12])
      $('#'+String(row+1)+'-'+String(col-1)).append('<span>'+cellNumber+'</span>');
      $('#'+String(row+1)+'-'+String(col-1)).addClass('numberRevealed revealed')
      colorCell($('#'+String(row+1)+'-'+String(col-1)), cellNumber);
    }

    if($('#'+String(row)+'-'+String(col+1)).attr('class') == 'column empty') {
      $('#'+String(row)+'-'+String(col+1)).css('background-color', 'white');
      $('#'+String(row)+'-'+String(col+1)).addClass('revealed');
      $('#'+String(row)+'-'+String(col+1)).css('box-shadow', 'none');
      revealEmpty(row, col+1);
    }
    if($('#'+String(row)+'-'+String(col+1)).hasClass('number') && !$('#'+String(row)+'-'+String(col+1)).hasClass('numberRevealed')) {

      var cellNumber = Number($('#'+String(row)+'-'+String(col+1)).attr('class')[12])
      $('#'+String(row)+'-'+String(col+1)).append('<span>'+cellNumber+'</span>');
      $('#'+String(row)+'-'+String(col+1)).addClass('numberRevealed revealed')
      colorCell($('#'+String(row)+'-'+String(col+1)), cellNumber);
    }

    if($('#'+String(row)+'-'+String(col-1)).attr('class') == 'column empty') {
      $('#'+String(row)+'-'+String(col-1)).css('background-color','white');
      $('#'+String(row)+'-'+String(col-1)).addClass('revealed');
      $('#'+String(row)+'-'+String(col-1)).css('box-shadow', 'none');
      revealEmpty(row, col-1);
    }
    if($('#'+String(row)+'-'+String(col-1)).hasClass('number') && !$('#'+String(row)+'-'+String(col-1)).hasClass('numberRevealed')) {

      var cellNumber = Number($('#'+String(row)+'-'+String(col-1)).attr('class')[12])
      $('#'+String(row)+'-'+String(col-1)).append('<span>'+cellNumber+'</span>');
      $('#'+String(row)+'-'+String(col-1)).addClass('numberRevealed revealed')
      colorCell($('#'+String(row)+'-'+String(col-1)), cellNumber);
    }

    if($('#'+String(row-1)+'-'+String(col+1)).attr('class') == 'column empty') {
      $('#'+String(row-1)+'-'+String(col+1)).css('background-color', 'white');
      $('#'+String(row-1)+'-'+String(col+1)).addClass('revealed');
      $('#'+String(row-1)+'-'+String(col+1)).css('box-shadow', 'none');
      revealEmpty(row-1, col+1);
    }
    if($('#'+String(row-1)+'-'+String(col+1)).hasClass('number') && !$('#'+String(row-1)+'-'+String(col+1)).hasClass('numberRevealed')) {

      var cellNumber = Number($('#'+String(row-1)+'-'+String(col+1)).attr('class')[12])
      $('#'+String(row-1)+'-'+String(col+1)).append('<span>'+cellNumber+'</span>');
      $('#'+String(row-1)+'-'+String(col+1)).addClass('numberRevealed revealed')
      colorCell($('#'+String(row-1)+'-'+String(col+1)), cellNumber);
    }

    if($('#'+String(row-1)+'-'+String(col)).attr('class') == 'column empty') {
      $('#'+String(row-1)+'-'+String(col)).css('background-color', 'white');
      $('#'+String(row-1)+'-'+String(col)).addClass('revealed');
      $('#'+String(row-1)+'-'+String(col)).css('box-shadow', 'none');
      revealEmpty(row-1, col);
    }
    if($('#'+String(row-1)+'-'+String(col)).hasClass('number') && !$('#'+String(row-1)+'-'+String(col)).hasClass('numberRevealed')) {

      var cellNumber = Number($('#'+String(row-1)+'-'+String(col)).attr('class')[12])
      $('#'+String(row-1)+'-'+String(col)).append('<span>'+cellNumber+'</span>');
      $('#'+String(row-1)+'-'+String(col)).addClass('numberRevealed revealed')
      colorCell($('#'+String(row-1)+'-'+String(col)), cellNumber);
    }

    if($('#'+String(row-1)+'-'+String(col-1)).attr('class') == 'column empty') {
      $('#'+String(row-1)+'-'+String(col-1)).css('background-color', 'white');
      $('#'+String(row-1)+'-'+String(col-1)).addClass('revealed');
      $('#'+String(row-1)+'-'+String(col-1)).css('box-shadow', 'none');
      revealEmpty(row-1, col-1);
    }
    if($('#'+String(row-1)+'-'+String(col-1)).hasClass('number') && !$('#'+String(row-1)+'-'+String(col-1)).hasClass('numberRevealed')) {

      var cellNumber = Number($('#'+String(row-1)+'-'+String(col-1)).attr('class')[12])
      $('#'+String(row-1)+'-'+String(col-1)).append('<span>'+cellNumber+'</span>');
      $('#'+String(row-1)+'-'+String(col-1)).addClass('numberRevealed revealed')
      colorCell($('#'+String(row-1)+'-'+String(col-1)), cellNumber);
    }
  }

  function checkVictory (){
    var revealedNumber = $('.revealed').length;
    if(revealedNumber == targetRevealed){
      $('.bomb').append('<span> <img src="bomb.svg" height = "90%"> </span>')
      $('.bomb').css('background-color', 'white')
      $('.bomb').css('box-shadow', 'none');
      gameState = 'won'
      $('.status').empty()
      $('.status').append('<img src="sunglasses.png" alt="curious face" height="42" width="42">')
      alert('You Won!')
    }
  }

  function colorCell(cell, cellNumber){
      if(cellNumber == 1){
        cell.css('background-color', '#FF0000')
      }
      else if(cellNumber == 2){
        cell.css('background-color', '#D00000')
      }
      else if(cellNumber == 3){
        cell.css('background-color', '#A80000')
      }
      else if(cellNumber == 4){
        cell.css('background-color', '#800000')
      }
      else {
        cell.css('background-color', '#480000')
      }
      cell.css('box-shadow', 'none');
  }



var flags = 0;

fontsize = function () {
  console.log('fontsize')
    var fontSize = $(".wrap").width() * 0.5;
    $(".column").css('font-size', fontSize);
};

$(window).resize(fontsize);

$(document).ready(function() {


  $('body').on('click', '#createGame', function(event){
    var size = $(this).siblings('#gridSize').val();
    var bombs = $(this).siblings('#bombs').val();
    $('#gameGrid').empty()

    if(size >25){
      alert("Maximum size is 25, try again.")
    }
    else if(bombs<1){
      alert("Minimum number of bombs is 1, try again.")
    }
    else{
      gameState = 'play'
      createGame(size, bombs);
    }
  })

  $('body').on('click', '.column', function click(event){
    console.log(this);
    console.log('click initiated');
    if(gameState == 'won' || gameState == 'lost'){
    }
    else if($(this).attr('name') == 'B'){
      var id = $(this).attr('id');
      if(firstClick == true){
        $('#gameGrid').empty()
        console.log('creating new game')
        createGame(globalSize, globalBombs);
        console.log('game made, here we go for the new click')
        console.log($('#'+id))
        click.apply($('#'+id))
      }
      else{
      $('.bomb').append('<span> <img src="explosion.png" height = "90%"> </span>')
      $('.bomb').css('background-color', 'none')
      $('.bomb').css('box-shadow', 'none');
      $('.bomb').removeClass('column')
      gameState = 'lost'
      $('.status').empty()
      $('.status').append('<img src="deadface.png" alt="curious face" height="42" width="42">')
      }
    }
    else if($(this).hasClass('revealed')){
    }
    else if($(this).attr('class') != 'column empty'){
      var id = $(this).attr('id');
      if(firstClick == true){
        $('#gameGrid').empty()
        console.log('creating new game')
        createGame(globalSize, globalBombs);
        console.log('game made, here we go for the new click')
        console.log($('#'+id))
        click.apply($('#'+id))
      }
      else{
        var cellNumber = Number($(this).attr('class')[12])
        $(this).append('<span>'+cellNumber+'</span>');
        $(this).addClass('numberRevealed revealed')
        $(this).css('box-shadow', 'none');
        if(cellNumber == 1){
          $(this).css('background-color', '#FF0000')
        }
        else if(cellNumber == 2){
          $(this).css('background-color', '#D00000')
        }
        else if(cellNumber == 3){
          $(this).css('background-color', '#A80000')
        }
        else if(cellNumber == 4){
          $(this).css('background-color', '#800000')
        }
        else {
          $(this).css('background-color', '#480000')
        }
      }
      checkVictory();
    }
    else{
      console.log('revealing empty')
      var array = $(this).attr('id').split('-');
      var row = Number(array[0]);
      var col = Number(array[1]);
      (row, col);
      $('#'+String(row)+'-'+String(col)).css('background-color', 'white');
      $('#'+String(row)+'-'+String(col)).addClass('revealed')
      $(this).css('box-shadow', 'none');
      revealEmpty(row, col);
      checkVictory();
    }
    firstClick = false;
  })

  $('body').on('contextmenu', '.column', function(event){
    event.preventDefault();
    if(gameState == 'won' || gameState == 'lost'){
    }
    else if($(this).hasClass('revealed')){
    }
    else if($(this).hasClass('flag')){
      $(this).removeClass('flag');
      flags = flags - 1;
    }
    else{
      ($(this).addClass('flag'));
      flags = flags + 1;
    }
  })


$('#easy').on('click', function(event){
  $('#gameGrid').empty()
  gameState = 'play'
  createGame(7, 5);
})

$('#medium').on('click', function(event){
  $('#gameGrid').empty()
  gameState = 'play'
  createGame(10,12);
})

$('#hard').on('click', function(event){
  $('#gameGrid').empty()
  gameState = 'play'
  createGame(13, 25);
})

$('#expert').on('click', function(event){
  $('#gameGrid').empty()
  gameState = 'play'
  createGame(20, 80);
})
})
