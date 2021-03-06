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

// block four view after block moving 
const BLOCKS = {
    tree: [
        [[2, 1],[0, 1],[1, 0],[1, 1]],
        [[1, 2],[0, 1],[1, 0],[1, 1]],
        [[1, 2],[0, 1],[2, 1],[1, 1]],
        [[2, 1],[1, 2],[1, 0],[1, 1]],
    ]
};

// next location after moving
const movingItem = {
    type: "tree",
    direction: 0,
    top: 0,
    left: 3,
};

init()

function init() {
    // get for only original value 
    tempMovingItem = { ...movingItem };

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
function renderBlocks(moveType = "") {
    // get type, direction, top, left
    const {type, direction, top, left} = tempMovingItem;
    const movingBlocks = document.querySelectorAll(".moving");    
    movingBlocks.forEach(moving => {
        //console.log(moving)
        moving.classList.remove(type, "moving");    
    })
    BLOCKS[type][direction].some(block => {
        const x = block[0] + left;
        const y = block[1] + top;

        // set target value for moving
        const target = playground.childNodes[y] ? playground.childNodes[y].childNodes[0].childNodes[x] : null;
        const isAvailable = checkEmpty(target);
        if (isAvailable) {
            target.classList.add(type, "moving")
        } else {
            tempMovingItem = { ...movingItem };
            setTimeout(() => {
                renderBlocks()
                if (moveType === "top") {
                    seizeBlock();
                }
            }, 0)
            return true;
        }
    })
    movingItem.left = left;
    movingItem.top = top;
    movingItem.direction = direction;
}
function seizeBlock() {
    const movingBlocks = document.querySelectorAll(".moving");
    movingBlocks.forEach(moving => {
        moving.classList.remove("moving");    
        moving.classList.add("seized");    
    })
}
function generateNewBlock() {
    movingItem.top = 0;
    movingItem.left = 3;
    tempMovingItem = { ...movingItem }
    renderBlocks();
}
function checkEmpty(target) {
    if (!target || target.classList.contains("seized")) {
        return false;
    }
    return true;
}
function moveBlock(moveType, amount) {
    tempMovingItem[moveType] += amount;
    renderBlocks(moveType)
}
function changeDirection() {
    const direction = tempMovingItem.direction;
    direction === 3 ? tempMovingItem.direction = 0 : tempMovingItem.direction += 1;
    renderBlocks()
}

// event handling
document.addEventListener("keydown", e => {
    switch(e.keyCode) {
        case 39:
            moveBlock("left", 1);
            break;
        case 37:
            moveBlock("left", -1);
            break;
        case 38:
            changeDirection();
            break;
        case 40:
            moveBlock("top", 1);
            break;
        default:
            break;
    }
    console.log(e)
})