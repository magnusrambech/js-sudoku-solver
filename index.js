var container = document.getElementById("sudokuContainer");
var unsolved = [
  [0,0,1,0,0,0,0,0,0],
  [3,0,7,6,0,5,1,0,9],
  [0,5,0,0,1,0,0,8,0],
  [0,7,0,4,0,3,0,1,0],
  [0,0,9,0,0,0,5,0,0],
  [0,1,0,9,0,8,0,7,0],
  [0,4,0,0,2,0,0,6,0],
  [1,0,8,5,0,6,3,0,7],
  [0,0,0,0,0,0,0,0,0]  
];
printBoard(unsolved); // shows unsolved board on html page

// recursive method that runs until the base case, countBlanks(nums) == 0, is met.
function solveBoard(array){
  var nums = array;
  var m=0;
  var n=0;

  //base case
  if(countBlanks(nums) < 1){
    printBoard(nums)
    return;
  }
  //finds first blank
  else{
    for(var vert = 0; vert < nums.length; vert++){
      for(var hori = 0; hori < nums.length; hori++){
        if(nums[vert][hori] == 0){
          m = vert;
          n = hori;
        }
      }
    }
  //finds all possible numbers for first blank and proceeds with a recursive call on each possible one
    var pos = possibleNumbers(nums,m,n);
    for(posnum in pos){
      nums[m][n] = pos[posnum];
      solveBoard(nums)
    }
    //proceeds backtrack
    nums[m][n]=0;
  }
}

//finds all possible numbers in at a certain place in the array
function possibleNumbers(array,k,l){
  var possible = [];

  for(var i = 1; i<10; i++){
    if(!checkRow(array,k,i) && !checkColumn(array,l,i) && !checkBox(k,l,i,array)){
      possible.push(i);
    }
  }
  return possible;
}

//checks uniqueness of number in given row
function checkRow(array,index, num){
 for(var y=0; y<array.length; y++){
    if(array[index][y] == num){
      return true;
    }
 }
  return false;
}

//checks uniqueness of number in given column
function checkColumn(array,index, num){
  for(var y = 0; y < array.length; y++){
    if(array[y][index] == num){
      return true;
    }
  }
 return false;
}

//checks uniqueness of number in given 3x3 box
function checkBox(x,y,num,array){
  var maxVert = 0;
  var maxHori = 0;

  if(x<=2){
    maxVert = 2
  }
  else if(x<=5){
    maxVert = 5
  }
  else if(x<=8){
    maxVert = 8
  }

  if(y<=2){
    maxHori = 2
  }
  else if(y<=5){
    maxHori = 5
  }
  else if(y<=8){
    maxHori = 8
  }

  for(var minVert = maxVert -2; minVert <= maxVert; minVert++){
    for(var minHori = maxHori -2; minHori <= maxHori; minHori++){
      if(array[minVert][minHori] == num){
        return true;
      }
    }
  }
  return false;
}

//counts blanks in the board
function countBlanks(numbers){
  var blanks = 0;
  for(var i = 0; i<numbers.length; i++){
    for(var j = 0; j<numbers.length; j++){
      if(numbers[i][j] == 0){
        blanks++;
      }
    }
  }
  return blanks;
}

//clears the htmp page
function clearBoard(){
 while(container.firstChild){
  container.removeChild(container.firstChild);
 }
}

//erases the current board then prints the new one
function printBoard(array){
  clearBoard();
  for(var i = 0; i< array.length; i++){
    var p = document.createElement("p");
    for(var j=0; j<array.length; j++){
      if(j!=0 && j%3==0){
        p.innerHTML += " | "
      }
      p.innerHTML +=" " + array[i][j];
    }
    if(i%3 == 0 && i!=0){
      var line = document.createElement("div");
      line.setAttribute("style","with:100%; border: 1px solid orange; box-shadow: 1px 1px 5px black;");
      container.appendChild(line);
    }
   container.appendChild(p);

  }

}
//resets the board to unsolved
function reset(){
  printBoard(unsolved);
}