var blinkerElement = document.getElementById('blinker');
var btnStartElement = document.getElementById('btn_start');
var warningMessageElement = document.getElementById('warning_message');
var blinkInterval = 225;
var team = 'duke';
var onColor = '#000000';
var offColor = '#ffffff';
var countTextColor = '#ffffff';
var morseString = '--. --- / - . .- --';
var noSleep = new NoSleep();

var init = function(){
    if(window.location.hash){
        team = window.location.hash;
    }

    switch(team){
        case '#virginia':
        onColor = '#F84C1E';
        offColor = '#22375D';
        countTextColor = '#ffffff';
        morseString = '--. --- / .... --- --- ... / --. ---'; //Go Hoos Go
        break;

        case '#auburn':
        onColor = '#0D2240';
        offColor = '#EF7622';
        countTextColor = '#ffffff'; 
        morseString = '.-- .- .-. / . .- --. .-.. .'; //War Eagle
        break;

        case '#michiganstate':
        onColor = '#173E34';
        offColor = '#ffffff';
        countTextColor = '#ffffff';
        morseString = '--. --- / --. .-. . . -.'; //Go Green
        break;

        case '#texastech':
        onColor = '#CF0A2C';
        offColor = '#2E2A25';
        countTextColor = '#ffffff';
        morseString = '.-- .-. . -.-. -.- / . -- / - . -.-. ....'; //Wreck Em Tech
        break;
        
        default:
        onColor = '#000000';
        offColor = '#ffffff';
        countTextColor = '#ffffff';
        morseString = '--. --- / - . .- --';
        break;
    }

    //Set initial styles
    blinkerElement.style.backgroundColor = onColor;
    btnStartElement.style.color = btnStartElement.style.borderColor = warningMessageElement.style.color = countTextColor;

    //Prevent sleep and hide browser chrome
    btnStartElement.addEventListener('click', onStartClick, false);
}
var toggleFullScreen = function() {
    var doc = window.document;
    var docEl = doc.documentElement;
    var requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
  
    if(requestFullScreen && !doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
      requestFullScreen.call(docEl);
    }
  }
var onStartClick = function(){
    noSleep.enable();
    toggleFullScreen();
    parseMorseString(morseString, true);
    btnStartElement.style.display = warningMessageElement.style.display = 'none';
    btnStartElement.removeEventListener('click', onStartClick, false);
}
var blinkerOn = function(){
    blinkerElement.style.backgroundColor = onColor;
}
var blinkerOff = function(){
    blinkerElement.style.backgroundColor = offColor;
}
var parseMorseString = function(morseString, shouldLoop){
    var currentDelay = 0;
    for(var i = 0; i < morseString.length; i += 1){
        if(morseString[i] == '.'){
            window.setTimeout(blinkerOn, currentDelay);
            currentDelay += blinkInterval;
            window.setTimeout(blinkerOff, currentDelay);
            currentDelay += blinkInterval;
        }
        if(morseString[i] == '-'){
            window.setTimeout(blinkerOn, currentDelay);
            currentDelay += blinkInterval * 3;
            window.setTimeout(blinkerOff, currentDelay);
            currentDelay += blinkInterval;
        }
        if(morseString[i] == ' '){
            window.setTimeout(blinkerOff, currentDelay);
            currentDelay += blinkInterval;
        }
        if(morseString[i] == '/'){
            window.setTimeout(blinkerOff, currentDelay);
            currentDelay += blinkInterval * 6;
        }
    }
    if(shouldLoop){
        window.setTimeout(function(){
            parseMorseString(morseString, shouldLoop);
        }, currentDelay);
    }
}

init();