document.addEventListener("DOMContentLoaded",()=>{

    //Adding 240 divs in the grid
    var htmlElements = "";

    for (let i = 0; i < 200; i++) {
        var newDiv = document.createElement('div');;
        document.getElementById("grid").appendChild(newDiv);
    }

    const width = 10;
    const grid = document.querySelector(".Grid");
    let squares = Array.from(document.querySelectorAll(".Grid div"));

    console.log(squares);
})

