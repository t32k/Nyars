Ti.UI.iPhone.setStatusBarStyle(Ti.UI.iPhone.StatusBar.OPAQUE_BLACK);

//  Create items on the Home Window.
var homeWindow = Ti.UI.createWindow({  
    title: 'Home',
    backgroundImage: 'images/bg.jpg'
});
var label = Ti.UI.createLabel({
    color: '#fff',
    text: 'かめらで猫耳しちゃいなよ！',
		textAlign: 'center'
});

//  Create items on the toolbar.
var btOpenCamera = Ti.UI.createButton({
  systemButton: Ti.UI.iPhone.SystemButton.CAMERA
});
var flexSpace = Ti.UI.createButton({
		systemButton: Ti.UI.iPhone.SystemButton.FLEXIBLE_SPACE
});
var toolbar = Ti.UI.createToolbar({
		items: [flexSpace, btOpenCamera, flexSpace],
		bottom: 0,
    borderTop: true,
    barColor: '#000'
});
var cameraWindow = Ti.UI.createWindow({
  	url: 'camera.js',
    title: 'Nyar! Nyar!'
});
var colorSelect = Ti.UI.createOptionDialog({
  options: ['セクシーブラッ9', 'シンデレラホワイツ', 'やっぱやめる'],
  cancel: 2,
  title: 'Nekomimi Color'
});
//  Create items on the toolbar.
btOpenCamera.addEventListener('click', function(){
  colorSelect.show();
});

colorSelect.addEventListener('click',function(e){
	if (e.index === 0) {
		Ti.App.earsColor = 'black';
		cameraWindow.open();
	} else if (e.index === 1) {
		Ti.App.earsColor = 'white';
		cameraWindow.open();	
	}
});



homeWindow.add(toolbar);
homeWindow.add(label);
homeWindow.open();