const pictures = [
	'pexels-photo.jpeg',
	'pexels-photo-1.jpeg',
	'pexels-photo-2.jpeg',
	'pexels-photo-3.jpeg',
	'pexels-photo-4.jpeg',
	'pexels-photo-5.jpeg',
	'pexels-photo-6.jpeg'
];
const picSource = 'imgs/';
let activeTimeSec = 10;
let changePicTimeSec = 5;
let screenSavertimer, pictureChangeTimer;


const screenSaver =  document.getElementById('screen-saver');
const screenSaverPicWrapper = document.getElementsByClassName('screen-saver__pic-wrapper')[0];
const screenSaverPic = document.getElementsByClassName('screen-saver__pic')[0];

// Adjustment
document.getElementById('done').addEventListener('click', ()=> {

	if(document.getElementById('activateTime').value >= 2 ){
		activeTimeSec = document.getElementById('activateTime').value;
		document.querySelector('#activateTime + .invalid').classList.add('visibly-hidden');
	} else {
		document.querySelector('#activateTime + .invalid').classList.remove('visibly-hidden');
	}

	if(document.getElementById('delayTime').value >= 2 ){
		changePicTimeSec = changePicTimeSec = document.getElementById('delayTime').value;
		document.querySelector('#delayTime + .invalid').classList.add('visibly-hidden');
	} else {
		document.querySelector('#delayTime + .invalid').classList.remove('visibly-hidden');
	}

	deactivateScreenSaver();
	clearTimeout(screenSavertimer);
	activationTimer();
});

// *** SCREEN SAVER ***
document.addEventListener("DOMContentLoaded", ()=> {
	activationTimer();
});

// Check all possible events that can trig SaveMode
['mousedown',
 'mouseup',
 'mousemove',
 'touchstart',
 'touchend',
 'touchmove',
 'contextmenu',
 'keydown',
 'keyup',
 'wheel',
 'resize',
 'scroll'].forEach(event => {
	document.addEventListener(event, ()=> {
		deactivateScreenSaver();
		clearTimeout(screenSavertimer);
		activationTimer();
	});
});

// Activate "screen saver"
function activateScreenSaver() {
	screenSaver.style.display = 'block';
	screenSaverPic.src = picSource + getRandomPicture();
	changePicture();
}

// Deactivate "screen saver"
function deactivateScreenSaver() {
	screenSaver.style.display = 'none';
	screenSaverPic.src = '';
	clearInterval(pictureChangeTimer);
}

// Activate timer to get time how long user is inactive
function activationTimer() {
	screenSavertimer = setTimeout(()=>{
		activateScreenSaver();
	}, activeTimeSec*1000);
}

// Change image with specific interval when "screen saver" is ON
function changePicture() {
	pictureChangeTimer = setInterval(()=> {
		fadeInOut();
	}, changePicTimeSec * 1000);
}

// Randomly changes image
function setRandomPic() {
	screenSaverPic.src = picSource + getRandomPicture();

	// I've tried a lot of methods but could find the way when JS wait until source of image will be changed.
	// Sometimes dimensions calculate from previous image. That's why had to use this trick.

	setTimeout(()=> {
		setRandomPositions();
	}, 100)

}

// Simulates fade-in and fade-out effects
function fadeInOut() {
	screenSaverPicWrapper.classList.remove("fade-in");
	screenSaverPicWrapper.classList.add("fade-out");
	let fadeTimer = setTimeout(()=> {
		setRandomPic();
		screenSaverPicWrapper.classList.remove("fade-out");
		screenSaverPicWrapper.classList.add("fade-in");
		clearTimeout(fadeTimer);
	}, 1000);

}

// Returns random picture from array with pictures
function getRandomPicture() {
	const index = Math.floor(Math.random() * (pictures.length));
	return pictures[index];
}

// Calculates and set random positions of images.
// Calculates correct position in order to not set image outside of screen. If height or width is bigger then screen
// then set it to 0 accordingly
function setRandomPositions() {
	const picWidth = parseInt(getComputedStyle(screenSaverPic).width);
	const picHeight = parseInt(getComputedStyle(screenSaverPic).height);
	let position = {};

	if(window.innerHeight > picHeight) {
		position.top = Math.floor(Math.random() * (window.innerHeight-picHeight));
	} else {
		position.top = 0;
	}

	if(window.innerWidth > picWidth) {
		position.left = Math.floor(Math.random() * (window.innerWidth-picWidth));
	} else {
		position.left = 0;
	}

	screenSaverPicWrapper.style.top = position.top + 'px';
	screenSaverPicWrapper.style.left = position.left + 'px';

}

