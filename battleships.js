// This is the controller
$(document).ready(function(){
  tableLoop();
  boardData();
  callShip();
// This is the click to change color to red and counts torpedos
  $("td").click(function() {
    // This splits the class into coordinates
    var split = $(this).attr('class').split("");
    var row = split[0];
    var column = split[1];
    // var audioElement = document.createElement('audio');
    // audioElement.setAttribute('src', 'http://soundbible.com/mp3/Depth%20Charge%20Short-SoundBible.com-1303947570.mp3');
    // var audioElementSplash = document.createElement('audio');
    // audioElementSplash.setAttribute('src',"http://soundbible.com/mp3/Video_Game_Splash-Ploor-699235037.mp3");
    console.log(split);
    //checks for a hit and changes color to red
    if (board[row][column] === 1) {
      $(this).css("background-color", "red");
      // var editid;
      // editid = $(this).attr("class");
      $(this).append("<span>Hit</span>")
      $("span").css({"font-size": "150%"});
      $(".board").effect("shake");
      $("span").animate({opacity:1},"slow","linear",function(){
        $(this).animate({opacity:0},"slow");
      });
      // audioElement.play()
      if(submarine === true){
        hits++;
      }
      // $(this).addClass("hit");
      if (hits === 24){
        $("div").hide()
        $("#winLose").text("You win!");
      }
    }
    //checks for a miss and changes color to blue
    else{
      console.log("MISS!");
      $(this).css("background-color", "#00c0ff");
      $(this).animate({
    color: "#00c0ff",
    backgroundColor: "blue"});
    // audioElementSplash.play()
      if(torpedos === 0){
        $("#torpedos").hide()
        $("#winLose").text("You lose!!");
        $(".shipLocation").css("border-color", "red");
        $("td").off("click");
      }
    }
      $("#torpedos").text("Torpedos Remaining: " + torpedos);
      torpedos--;
      console.log(torpedos);
  });
});

// This is the model
// fucntion to makle the table 10 x 10
var torpedos = 25;
var hits = 0;
var board = [[0], [0], [0], [0], [0], [0], [0], [0], [0], [0]];
//array of different ship lengths
const ships = [5, 4, 4, 3, 3, 2, 2, 1];
var carrier;
var battleship;
var battleship2;
var cruiser;
var cruiser2;
var destroyer;
var destroyer2;
var submarine;
function tableLoop() {
  var table = $("<table class='battles'> </table>");
  // loop to make rows
  for (i = 0; i < 10; i++) {
    var row = $("<tr></tr>").addClass([i]);
    $(table).append(row);
    // loop to make 100 td
      for (var j = 0; j < 10; j++) {
        var stuff = $('<td> </td>').addClass([i] + [j]);
        $(row).append(stuff);
      }
  }
  // adding table to html
  $(".board").append(table);
}
//makes the board model
function boardData() {
  for(var i= 0; i < 10; i++) {
    for(var j=1; j < 10; j++){
      board[i][j] = 0;
    }
  }
}

/**
 * Create 5 ships in the board array
 **/
 var counter = 0
function callShip() {
  //loops through different ships
  for (var i=0; i<ships.length; i++){
    var ship = ships[i];
    // Do-while loop for the random numbers while there in another ship
    do {
      var column = Math.floor(Math.random() * 10);
      var row = Math.floor(Math.random() * 10);
      // if
    } while (board[row][column] === 1);
    //calculate vertical or horizontal
    var direction = Math.floor(Math.random() * 2);
    //checks for surrounding ships
    var shipPositionWorks;
    //if direction is vertical
    if(direction === 0){
      //when checking for fitment if it overflows the edge, go the opposite direction
      if(row + ship > 9){
        //checking each spot for ship placement
        for(j=0; j<ship; j++){
          console.log('J: ', row - j);
          //checks for space around
          shipPositionWorks = checkSpace(row - j, column);
          //if there are ships around, stop running the loop
          if(shipPositionWorks === true){
            break;
          }
        }
        //if there are ships around, find another starting coordinate
        if(shipPositionWorks === true){
          i--;
          continue;
        }
        //if there are no ships around place the ship
        for(j=0; j<ship; j++){
          board[row - j][column]  = 1;
          var pop = "." + (row - j) + column;
          $(pop).addClass('shipLocation')
        }
        //when checking for fitment if it overflows the edge, go the opposite direction
      }else{
        for(j=0; j<ship; j++){
          console.log('J2: ', row + j);
          shipPositionWorks = checkSpace(row + j, column);
          if(shipPositionWorks === true){
            break;
          }
        }
        if(shipPositionWorks === true){
          i--;
          continue;
        }
        for(j=0; j<ship; j++){
          board[row + j][column]  = 1;
          var pop = "." + (row + j) + column;
          $(pop).addClass('shipLocation');
        }
      }
    }
    else{
      if(column + ship > 9){
        for(j=0; j<ship; j++){
          console.log('J3: ', column - j);
          shipPositionWorks = checkSpace(row, column - j);
          if(shipPositionWorks === true){
            break;
          }
        }
        if(shipPositionWorks === true){
          i--;
          continue;
        }
        for(j=0; j<ship; j++){
          board[row][column - j]  = 1;
          pop = "." + row + (column - j);
          $(pop).addClass('shipLocation');
        }
      }else{
        for(j=0; j<ship; j++){
          console.log('J4: ', column + j);
          shipPositionWorks = checkSpace(row, column + j);
          if(shipPositionWorks === true){
            break;
          }
        }
        if(shipPositionWorks === true){
          i--;
          continue;
        }
        for(j=0; j<ship; j++){
          board[row][column + j]  = 1;
          pop = "." + row + (column + j);
          $(pop).addClass('shipLocation');

        }
      }
    }
    if(ship.length === 1){
      submarine = [row, column];
      return submarine;
    }
  }
}

//checks for space around each position around and allows for placement on edges
function checkSpace(row, column){
    for (var k = row-1; k<row+2; k++){
      //console.log("row position " + k);
      for(var l= column-1; l<column+2; l++){
        //console.log("column position " + l);
        if (k >= 0 && k <= 9 && l >= 0 && l <= 9) {
          if(board[k][l] === 1){
            return true;
          }
        }
      }
  }
  return false;
}
