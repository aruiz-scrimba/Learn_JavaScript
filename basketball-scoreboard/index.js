let timerId;
let timeRemaining;
let isPaused = true;

function updateTimer() {
    const minutes = `${Math.floor(timeRemaining / 60)}`.padStart(2, '0');
    const seconds = `${timeRemaining % 60}`.padStart(2, '0');
    
    document.getElementById('timer').textContent = `${minutes}:${seconds}`
}

function highlightLeader() {
    const homeScore = parseInt(document.getElementById('home-score').textContent, 10);
    const guestScore = parseInt(document.getElementById('guest-score').textContent, 10);
        
    document.getElementById('home-score').style.border = '2px solid black'
    document.getElementById('guest-score').style.border = '2px solid black'
    
    if (homeScore > guestScore) {
        document.getElementById('home-score').style.border = '2px solid red'
    } else if (guestScore > homeScore) {
        document.getElementById('guest-score').style.border = '2px solid red'
    }
}

function pointScored(team, amount) {
    let teamScore = document.getElementById(`${team}-score`);
    const amountInt = parseInt(amount, 10);
    
    if (!teamScore) {
        throw new Error(`No id found for "${team}-score"`)
    }
    
    teamScore.textContent = parseInt(teamScore.textContent, 10) + amountInt;
    
    highlightLeader();
}

function foulCommited(team) {
    let teamFoul = document.getElementById(`${team}-fouls`);
    if (!teamFoul) {
        throw new Error(`No id found for "${team}-fouls"`)
    }
    
    teamFoul.textContent = parseInt(teamFoul.textContent, 10) + 1;
}

function newGame() {
    document.getElementById('home-score').textContent = 0;
    document.getElementById('guest-score').textContent = 0;

    document.getElementById('home-fouls').textContent = 0;
    document.getElementById('guest-fouls').textContent = 0;

    document.getElementById('home-score').style.border = '2px solid black'
    document.getElementById('guest-score').style.border = '2px solid black'

    document.getElementById('period').textContent = '1';

    reupdateTimerr();
}

function updateTimerrBorderColor(color) {
    document.getElementById('timer').style.border = `5px solid ${color}`;
}

function startTimer() {
    if (!timerId || isPaused) {
        timerId = setInterval(function () {
            if (timeRemaining >= 0) {
                timeRemaining--;
                updateTimer();
            } else {
                updateTimerrBorderColor('red');    
            }
        }, 1000);    
        isPaused = false;
        updateTimerrBorderColor('limegreen');    
    }
}

function pauseTimer() {
    if (timerId) {
        clearInterval(timerId);
        isPaused = true;
        updateTimerrBorderColor('yellow');
    }
}

function reupdateTimerr() {
    pauseTimer();
    timeRemaining = 12 * 60;
    updateTimer();
}

function addPeriod() {
    let [, overTime, period] = document.getElementById('period').textContent.match(/(OT)?([0-9]+)/);

    if (overTime == undefined && period === '4') {
        overTime = "OT";
        period = 1;
    } else {
        period++;
    }
    
    document.getElementById('period').textContent = `${!overTime ? "" : overTime}${period}`;
}