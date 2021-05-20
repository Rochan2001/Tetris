document.addEventListener("DOMContentLoaded",()=>{

    //Adding 240 divs in the grid
    var htmlElements = "";

    for (let i = 0; i < 210; i++) {
        var newDiv = document.createElement('div');;
        if(i>=200) newDiv.classList.add("taken");
        document.getElementById("grid").appendChild(newDiv);
    }

    for (let i = 0; i < 16; i++) {
        var newDiv = document.createElement('div');;
        document.getElementById("mini-grid").appendChild(newDiv);
    }

    const width = 10;
    const grid = document.querySelector(".Grid");
    const scoreDisplay = document.querySelector("#score");
    const startBtn = document.querySelector("#start-button");
    let nextRandom = 0;
    let squares = Array.from(document.querySelectorAll(".Grid div"));
    let timerId;

    //Ternominoes
    const lTetrimino = [
        [0,width,width+1,width+2],
        [1,width+1,width*2+1,2],
        [width,width+1,width+2,width*2+2],
        [1,width+1,width*2+1,width*2],
    ]

    const oTetrimino = [
        [1,2,width+1,width+2],
        [1,2,width+1,width+2],
        [1,2,width+1,width+2],
        [1,2,width+1,width+2],
    ]

    const tTetrimino = [
        [1,width,width+1,width+2],
        [1,width+1,width*2+1,width+2],
        [width,width+1,width+2,width*2+1],
        [width,1,width+1,width*2+1],
    ]

    const iTetrimino = [
        [width,width+1,width+2,width+3],
        [2,width+2,width*2+2,width*3+2],
        [width*2,width*2+1,width*2+2,width*2+3],
        [1,width+1,width*2+1,width*3+1],
    ]

    const zTetrimino = [
        [width,width+1,1,2],
        [1,width+1,width+2,width*2+2],
        [width*2,width*2+1,width+1,width+2],
        [0,width,width+1,width*2+1],
    ]
    
    const theTetrominoes = [oTetrimino,lTetrimino,zTetrimino,tTetrimino,iTetrimino];

    let currentPosition = 4;
    let currentRotation = 0;

    let random = Math.floor(Math.random()*theTetrominoes.length);
    let current = theTetrominoes[random][currentRotation];

    function draw(){
        current.forEach(index =>{
            squares[currentPosition+index].classList.add('tetromino')
        })

    }

    function undraw() {
        current.forEach(index => {
          squares[currentPosition + index].classList.remove('tetromino')

        })
    }

    //timerId = setInterval(moveDown,1000);
    
    function control(e) {
        if(e.keyCode === 37) {
          moveLeft()
        } else if (e.keyCode === 38) {
          rotate()
        } else if (e.keyCode === 39) {
          moveRight()
        } else if (e.keyCode === 40) {
          moveDown()
        }
  }
    document.addEventListener("keyup",control);

    function moveDown(){
        undraw();
        currentPosition += width;
        draw();
        freeze();
    }

    function freeze() {
        if(current.some(index => squares[currentPosition + index + width].classList.contains('taken'))) {
          current.forEach(index => squares[currentPosition + index].classList.add('taken'))
          //start a new tetromino falling
          random = nextRandom; 
          nextRandom = Math.floor(Math.random() * theTetrominoes.length);
          current = theTetrominoes[random][currentRotation];
          currentPosition = 4;
          displayShape();
        }
      }

    function moveLeft() {

        undraw();
        const isAtLeftEdge = current.some(index => (currentPosition + index )%width === 0);

        if(!isAtLeftEdge) currentPosition -=1;
        console.log(currentPosition);

        if(current.some(index => squares[currentPosition + index].classList.contains("taken")))
        currentPosition+=1;

        draw();
        

    }

    function moveRight() {

        undraw();
        const isAtRightEdge = current.some(index => (currentPosition + index )%width === width-1);

        if(!isAtRightEdge) currentPosition +=1;

        if(current.some(index => squares[currentPosition + index].classList.contains("taken")))
        currentPosition-=1;

        draw();
        

    }

    function rotate(){

        undraw();
        currentRotation++;
        currentRotation %= 4;
        current = theTetrominoes[random][currentRotation];
        draw();


    }

    const displaySquares = document.querySelectorAll(".Mini-grid div");
    const displayWidth = 4;
    const displayIndex = 0;

    const upNextTetrominoes = [

        [1,2,displayWidth+1,displayWidth+2],
        [0,displayWidth,displayWidth+1,displayWidth+2],
        [displayWidth,displayWidth+1,1,2],
        [1,displayWidth,displayWidth+1,displayWidth+2],
        [displayWidth,displayWidth+1,displayWidth+2,displayWidth+3],
    ]

    function displayShape(){

        displaySquares.forEach(square =>{
            square.classList.remove("tetromino");
        })

        upNextTetrominoes[nextRandom].forEach(index =>{

            displaySquares[displayIndex+index].classList.add("tetromino");

        })

    }

    startBtn.addEventListener("click",()=>{

        if(timerId){
            clearInterval(timerId);
            timerId=null;

        }
        else{

            draw();
            timerId = setInterval(moveDown,1000);
            nextRandom = Math.floor(Math.random() * theTetrominoes.length);
            displayShape();

        }

    })


})

