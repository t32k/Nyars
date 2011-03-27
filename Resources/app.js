Ti.UI.iPhone.setStatusBarStyle(Ti.UI.iPhone.StatusBar.OPAQUE_BLACK);
Ti.UI.setBackgroundColor('#111');

var win = Ti.UI.createWindow({
  title: 'Home',
	backgroundImage: 'images/bg.png'
});
var logo = Ti.UI.createImageView({
	image:'images/logo.png',
	width: 207,
	height: 183,
	top: 93,
	left: 60
});
var button = Ti.UI.createButton({
	top: 320,
  width: 180,
  height: 40,
  title: 'Choose Nekomimi',
	borderRadius: 5,
	borderColor: '#333',
	font:{fontSize: 13, fontWeight: 'bold'},
	backgroundImage: 'images/bg_off.png',
	backgroundSelectedImage: 'images/bg_on.png',
	opacity: 0
});
var startupAnimation = Titanium.UI.createAnimation({
	curve: Ti.UI.ANIMATION_CURVE_EASE_IN_OUT,
	opacity: 1,
	duration: 750,
	delay: 100
});
button.animate(startupAnimation);

var flexSpace = Ti.UI.createButton({
  systemButton: Ti.UI.iPhone.SystemButton.FLEXIBLE_SPACE
});
var selectColor = Ti.UI.createOptionDialog({
  options: ['Sexy Black', 'Cinderella White', 'Cancel'],
  cancel: 2,
  title: 'Choose color of Nekomimi.'
});
var cameraWindow = Ti.UI.createWindow({
  url: 'camera.js',
  title: 'Meow! Meow!'
});

// Add event part.
button.addEventListener('click', function () {
  selectColor.show();
});
selectColor.addEventListener('click', function (e) {
  if (e.index === 0) {
    Ti.App.earsColor = 'black';
    cameraWindow.open();
  } else if (e.index === 1) {
    Ti.App.earsColor = 'white';
    cameraWindow.open();
  }
});

// Add item to window.
win.add(logo);
win.add(button);
win.open();