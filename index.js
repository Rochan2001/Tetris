document.addEventListener("DOMContentLoaded",()=>{

    //Adding 240 divs in the grid
    var htmlElements = "";

    for (let i = 0; i < 200; i++) {
        var newDiv = document.createElement('div');;
        document.getElementById("grid").appendChild(newDiv);
    }

    const width = 10;
    const grid = document.querySelector(".Grid");
    const ScoreDisplay = document.querySelector("#score");
    const StartBtn = document.querySelector("start-button");
    let squares = Array.from(document.querySelectorAll(".Grid div"));

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
    
    const theTetrominoes = [oTetrimino,lTetrimino,zTetrimino,tTetrimino,lTetrimino];

    let currentPosition = 4;

    let random = Math.floor(Math.random()*theTetrominoes.length);
    let current = theTetrominoes[random][0];

    function draw(){
        current.forEach(index =>{
            squares[currentPosition+index].classList.add('tetrimino')
        })

    }
    draw();

})

