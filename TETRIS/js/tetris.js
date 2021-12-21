// set DOM
const playground = document.querySelector(".playground > ul");

// settin
const GAME_ROWS = 20;
const GAME_COLS = 10;

let score = 0;
let duration = 500;
let downInterval;

// temp location before moving
let tempMovingItem;

// block element four value
const BLOCKS = {
    tree: [
        [[2, 1],[0, 1],[1, 0],[1, 1]],
        [],
        [],
        [],
    ]
}

// next location after moving
const movingItem = {
    type: "tree",
    direction:0,
    top:0,
    left:0,
};

init()

function init() {
    // get for only original value 
    tempMovingItem = { ...movingItem};

    for(let i = 0; i < GAME_ROWS; i++) {
        // basic line 
        prependNewLine()
    }
    // view act renderblock 
    renderBlocks()
}
function prependNewLine() {
    const li = document.createElement("li");
    const ul = document.createElement("ul");
    for(let j = 0; j < GAME_COLS; j++) {
        const matrix = document.createElement("li");
        ul.prepend(matrix)
    }
    li.prepend(ul)
    playground.prepend(li)
}
function renderBlocks() {
    // get type, direction, top, left
    const {type, direction, top, left} = tempMovingItem;

    // 
    BLOCKS[type][direction].forEach(block => {
        const x = block[0];
        const y = block[1];
        //console.log({playground})

        // set target value for moving
        const target = playground.childNodes[y].childNodes[0].childNodes[x];
        target.classList.add(type)
        console.log(target)
    });
 
}