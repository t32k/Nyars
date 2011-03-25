Ti.UI.iPhone.setStatusBarStyle(Ti.UI.iPhone.StatusBar.OPAQUE_BLACK);
var homeWindow = Ti.UI.createWindow({
  title: 'Home',
  backgroundImage: 'images/bg.jpg'
});
var label = Ti.UI.createLabel({
  color: '#111',
  text: 'かめらで猫耳しちゃいなよ！',
  textAlign: 'center'
});
var btSelectColor = Ti.UI.createButton({
  systemButton: Ti.UI.iPhone.SystemButton.CAMERA
});
var flexSpace = Ti.UI.createButton({
  systemButton: Ti.UI.iPhone.SystemButton.FLEXIBLE_SPACE
});
var toolbar = Ti.UI.createToolbar({
  items: [flexSpace, btSelectColor, flexSpace],
  bottom: 0,
  borderTop: true,
  barColor: '#000'
});
var selectColor = Ti.UI.createOptionDialog({
  options: ['セクシーブラッ9', 'シンデレラホワイツ', 'やっぱやめる'],
  cancel: 2,
  title: 'Choose Nekomimi Color.'
});
var cameraWindow = Ti.UI.createWindow({
  url: 'camera.js',
  title: 'Nyar! Nyar!'
});

// Add event part.
btSelectColor.addEventListener('click', function () {
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

// Add item to window part.
homeWindow.add(toolbar);
homeWindow.add(label);
homeWindow.open();