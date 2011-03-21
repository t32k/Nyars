Ti.UI.iPhone.setStatusBarStyle(Ti.UI.iPhone.StatusBar.OPAQUE_BLACK);

//  Create items on the Home Window.
var homeWindow = Ti.UI.createWindow({  
    title: "Home",
    backgroundImage: "images/bg.jpg"
});
var label = Ti.UI.createLabel({
    color: "#fff",
    text: "NEKOMIMI IS FINE!",
		textAlign: "center"
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
		bottom:  0,
    borderTop: true,
    barColor: "#000"
});

//  Create items on the toolbar.
btOpenCamera.addEventListener('click', function(){
		var cameraWindow = Ti.UI.createWindow({
		  	url: 'camera.js',
		    title: 'Nyar! Nyar!'
		});
		cameraWindow.open();
});

homeWindow.add(toolbar);
homeWindow.add(label);
homeWindow.open();