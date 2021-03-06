//자바스크립트로 제어할 요소들에 대한 node 선언
const screen_section = document.getElementById("screen");
const helpMessage = document.getElementById("help-message");
const selectArrow_div = document.getElementById("select-arrow");
const RPSTitle_li = document.getElementById("RPS-title");        //RPS Rock Paper Scissors
const game2Title_li = document.getElementById("game2-title");
const game3Title_li = document.getElementById("game3-title");
const game4Title_li = document.getElementById("game4-title");
const game5Title_li = document.getElementById("game5-title");
const game6Title_li = document.getElementById("game6-title");
const btnA_section = document.getElementById("button-A");
const btnB_section = document.getElementById("button-B");
const btnUp_section = document.getElementById("button-up");
const btnLeft_section = document.getElementById("button-left");
const btnRight_section = document.getElementById("button-right");
const btnDown_section = document.getElementById("button-down");

//각 게임 객체.
const game1RPS = {

}

const game2ComingSoon = {};
const game3ComingSoon = {};
const game4ComingSoon = {};
const game5ComingSoon = {};
const game6ComingSoon = {};

//게임 리스트 객체.
const gameListObj = {
    firstIdx: 1,
    firstTop: 52,
    lastIdx: 6,
    lastTop: 262,
    arrowMovingDist: 42,
    arrayGameList: [game1RPS, game2ComingSoon, game3ComingSoon,
                    game4ComingSoon, game5ComingSoon, game6ComingSoon],
    
}

const GAME_LIST = 0;
const GAME_RPS = 1;

//게임기 객체.
const gameMan = {
    currScreen: GAME_LIST,     //false -> 현재 화면 List인 상태.
}

let current_arrow_top = 0;
let current_list = 0;

const DEFAULT_HELP_MESSAGE = "A : Select";

let gameList = [0, RPSTitle_li, game2Title_li, game3Title_li, game4Title_li, game5Title_li, game6Title_li];

let screen = {
    isList: true    //현재 게임 목록 상태라면 true, 아니면 false 
}

let setHelpMessage = (message) => {
    helpMessage.innerText = message;
}

let initListArrow = () => {
    selectArrow_div.style.top = "52px";
    current_arrow_top = 52;
    current_list_stage = 1;
    selectedGameEffects();
}

//테스트용.
let downListArrow = () => {
    current_arrow_top += gameListObj.arrowMovingDist;
    selectArrow_div.style.top = current_arrow_top + "px";
    current_list_stage += 1;
    selectedGameEffects();
}

let upListArrow = () => {
    current_arrow_top -= gameListObj.arrowMovingDist;
    selectArrow_div.style.top = current_arrow_top + "px";
    current_list_stage -= 1;
    selectedGameEffects();
}

let goToTopListArrow = () => { //맨 아래에서 다시 아래버튼 눌렀을 때, 화살표 제일 위로
    current_arrow_top = gameListObj.firstTop;
    selectArrow_div.style.top = current_arrow_top + "px";
    current_list_stage = gameListObj.firstIdx;
    selectedGameEffects();
}

let goToBottomListArrow = () => {  //맨 위에서 다시 up 버튼 눌렀을 때, 화살표 제일 아래로.
    current_arrow_top = gameListObj.lastTop;
    selectArrow_div.style.top = current_arrow_top + "px";
    current_list_stage = gameListObj.lastIdx;
    selectedGameEffects();
}

let selectedGameEffects = () => {
    for (let i = 1; i <= 6; i += 1) {
        if (i === current_list_stage) gameList[i].style.color = "rgb(66, 180, 22)";
        else gameList[i].style.color = "rgb(66, 121, 22)";
    }
}

let choiceGame = () => {
    // console.log(gameList[current_list_stage]);
    switch (gameList[current_list_stage]) {
        case RPSTitle_li:
            startRPS();
            screen.isList = false;
            break;
        case game2Title_li:
            console.log("game2 choice");
            break;
        case game3Title_li:
            console.log("game3 choice");
            break;
        case game4Title_li:
            console.log("game4 choice");
            break;
        case game5Title_li:
            console.log("game5 choice");
            break;
        case game6Title_li:
            console.log("game6 choice");
            break;
        default:
            console.log("game choice error");
            break;
    }
}


btnA_section.addEventListener('click', () => {
    console.log("clicked A, RPS status : " + RPS.status);
    if (RPS_GAME_OVER === RPS.status ||
        RPS_VICTORY === RPS.status) return;
    if (screen.isList) {
        console.log("choice game");
        choiceGame();
    } else if (RPS_RULE === RPS.status) {
        console.log("play game");
        playRPS();
    } else if (RPS_PLAYING === RPS.status) {
        compare();
    }
});

btnB_section.addEventListener('click', () => {
    console.log("clicked B, RPS status : " + RPS.status);
    if (RPS_GAME_OVER === RPS.status ||
        RPS_VICTORY === RPS.status) return;
    if (RPS_RULE === RPS.status) {
        exitRPS();
        screen.isList = true;
    } else if (RPS_PLAYING === RPS.status) {
        exitRPS();
        screen.isList = true;
    }

});

btnUp_section.addEventListener('click', () => {
    if (RPS_GAME_OVER === RPS.status ||
        RPS_VICTORY === RPS.status) return;
    if(true === screen.isList) {
        if (gameListObj.firstIdx === current_list_stage) {
            goToBottomListArrow();
        } else {
            upListArrow();
        }
    }
});
btnLeft_section.addEventListener('click', () => {
    if (RPS_GAME_OVER === RPS.status ||
        RPS_VICTORY === RPS.status) return;
    if (RPS_PLAYING === RPS.status) {
        moveRPS("left");
        console.log("RPS move to left");
    }
});
btnRight_section.addEventListener('click', () => {
    if (RPS_GAME_OVER === RPS.status ||
        RPS_VICTORY === RPS.status) return;
    if (RPS_PLAYING === RPS.status) {
        moveRPS("right");
        console.log("RPS move to right");
    }
});
btnDown_section.addEventListener('click', () => {
    if (RPS_GAME_OVER === RPS.status ||
        RPS_VICTORY === RPS.status) return;
    if(true === screen.isList) {
        if (gameListObj.lastIdx === current_list_stage) {
            goToTopListArrow();
        } else {
            downListArrow();
        }
    }
});

let main = () => {
    console.log("app.js loaded");
    goToTopListArrow();
}

main();