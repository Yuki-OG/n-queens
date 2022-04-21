/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
  var board = new Board({n: n});
  var solution = board.rows();
  var counter = n;
  board.togglePiece(0, 0);
  for (let i = 1; i < n; i++) {
    for (let j = 0; j < n; j++) {
      board.togglePiece(i, j);
      if (board.hasAnyRowConflicts() || board.hasAnyColConflicts()) {
        board.togglePiece(i, j);
      } else {
        counter--;
        if (counter === 0) {
          console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
          return solution;
        }
      }
    }
  }
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  if (n === 1) {
    return 1;
  }
  if (n === 2) {
    return 2;
  }
  var iter = n;
  var counter = 1;
  var factorial = 1;
  while (iter > 1) {
    iter--;
    factorial = factorial * iter;
    counter *= (Math.pow(iter, 2));
  }

  counter = (counter * n) / factorial;

  return counter;

};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var board = new Board({n: n});
  var solution = board.rows();
  if (n === 0) {
    return solution;
  } else if (n === 1) {
    return [[1]];
  }

  // var counter = n - 1;
  //starting at first column, change column
  for (let y = 0; y < n; y++) {
    //changes row
    for (let x = 0; x < n; x++) {
      //toggle initial piece
      board.togglePiece(y, x);
      //set row coordenate
      var counter = n;
      for (let i = 0; i < n; i++) {
        //set column coordinate
        for (let j = 0; j < n; j++) {
          //if NOT  row===initial row and column to initial column
          if (!(i === y && j === x)) {
            //tooggle piece
            board.togglePiece(i, j);
          }
          //check to see if piece conflicts
          if (board.hasAnyQueensConflicts()) {
            // if yes then toggle piece off
            board.togglePiece(i, j);
          } else {
            //if not, decrement count for leaving piece on board
            counter--;
            console.log(counter, solution);
            //if counter = 0
            if (counter === 0) {
              return solution;
            }
          }
        }
      }
      board = new Board({n: n});
      solution = board.rows();
    }
  }
  board = new Board({n: n});
  solution = board.rows();
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {

  var solutionCount = 0;
  var board = new Board({n: n});
  var solution = board.rows();
  if (n === 0 || n === 1) {
    return 1;
  }

  // var counter = n - 1;
  //starting at first column, change column
  for (let y = 0; y < n; y++) {
    //changes row
    for (let x = 0; x < n; x++) {
      //toggle initial piece
      board = new Board({n: n});
      console.log('new board', board.rows());
      board.togglePiece(y, x);
      //set row coordenate
      var counter = n;
      for (let i = 0; i < n; i++) {
        //set column coordinate
        for (let j = 0; j < n; j++) {
          //if NOT  row===initial row and column to initial column
          if (!(i === y && j === x)) {
            //tooggle piece
            board.togglePiece(i, j);
          }
          //check to see if piece conflicts
          if (board.hasAnyQueensConflicts()) {
            //
            // if yes then toggle piece off
            board.togglePiece(i, j);
          } else {
            //if not, decrement count for leaving piece on board
            counter--;
            //if counter = 0
            if (counter === 0) {
              console.log('solution board', solution);
              solutionCount++;
              console.log('final board', board.rows());
              // board = new Board({n: n});
              solution = board.rows();
            }
          }
        }
      }
      // console.log('final board', board.rows());
      // board = new Board({n: n});
      // solution = board.rows();
    }
  }
  console.log(solutionCount);
  return solutionCount;
};

