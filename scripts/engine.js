const state = {
    view:{
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector("enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),


    },
    values:{
        gameVelocity: 1000,
        hitPosition: 0,
        result: 0,
        curretTime: 60,
    },
    actions:{
        timerId: setInterval(randomSquare, 500),
        countDownTimerId: setInterval(countDown, 500),
    }
};


function playSound(){
    const audio = new Audio('src/audios/src_audios_hit.m4a');

audio.volume = 0.2;
audio.play();}

function countDown(){
    state.values.curretTime --;

    if(state.values.curretTime < 0){
        clearInterval(state.actions.countDownTimerId)
        clearInterval(state.actions.timerId)
        alert("Game Over! Seu resultado foi: " + state.values.result)
    };

    state.view.timeLeft.textContent = state.values.curretTime;
}

function randomSquare(){
    state.view.squares.forEach((square)=> {
        square.classList.remove("enemy");
    });

    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id;
}


function addListenerHitBox(){
    state.view.squares.forEach((square)=>{
        square.addEventListener("mousedown", ()=> {
            if(square.id === state.values.hitPosition){
                state.values.result++
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
                playSound();
            }
        })
    });
}

function initialize(){
    
    addListenerHitBox();
}

initialize();