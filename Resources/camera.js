Ti.UI.setBackgroundColor('#111');
var win = Ti.UI.currentWindow;

var btCamera = Ti.UI.createButton({
  systemButton: Ti.UI.iPhone.SystemButton.CAMERA
});
var btAction = Ti.UI.createButton({
  systemButton: Ti.UI.iPhone.SystemButton.ACTION
});
var flexSpace = Ti.UI.createButton({
  systemButton: Ti.UI.iPhone.SystemButton.FLEXIBLE_SPACE
});
var toolbar = Ti.UI.createToolbar({
  items: [flexSpace, btCamera, flexSpace, btAction, flexSpace],
  bottom: 0,
  borderTop: true,
  barColor: '#000',
  translucent: true
});

var selectMedia = Ti.UI.createOptionDialog({
  options: [ L('mail'), L('cancel') ],
  cancel: 2,
  title: L('send')
});
var msgWin = Ti.UI.createWindow({
  width: 250,
  height: 40,
  bottom: 220,
  borderRadius: 5,
  touchEnabled: false,
  orientationModes: [
  Ti.UI.PORTRAIT, Ti.UI.UPSIDE_PORTRAIT, Ti.UI.LANDSCAPE_LEFT, Ti.UI.LANDSCAPE_RIGHT]
});
var msgView = Ti.UI.createView({
  width: 120,
  height: 40,
  borderRadius: 5,
  backgroundColor: '#000',
  opacity: 0.6,
  touchEnabled: false
});
var msgLabel = Ti.UI.createLabel({
  text: 'Saved!',
  color: ' #fff',
  width: 250,
  height: 'auto',
  font: {
    fontFamily: 'Helvetica Neue',
    fontSize: 13,
    fontWeight: 　'bold'
  },
  textAlign: 'center'
});
msgView.add(msgLabel);
msgWin.add(msgView);

var blobImage;
var ears = Ti.UI.createImageView({
  image: 'images/ears_' + Ti.App.earsColor + '.png',
  width: 186,
  height: 85,
  top: 45,
	hires: true
});
var overlay = Ti.UI.createView({
	// Enable camera control UI.
	touchEnabled: false
});
overlay.add(ears);

// Start camera function.
Ti.Media.showCamera({
  success: function (event) {
		Ti.App.Analytics.trackPageview('/startup/camera/' + Ti.App.earsColor + '/takePicture');
    var cameraView = Ti.UI.createImageView({
      width: 320,
      height: 480,
      top: 0,
      left: 0,
      image: event.media
    });
		// To saved picture.
		var saveEars = Ti.UI.createImageView({
		  image: 'images/ears_' + Ti.App.earsColor + '.png',
		  width: 186,
		  height: 85,
		  top: 45,
			hires: true
		});
		var saveOverlay = Ti.UI.createView({});
		saveOverlay.add(saveEars);
    cameraView.add(saveOverlay);
    var imageNew = cameraView.toImage(function (e) {
      var filename1 = Ti.Filesystem.applicationDataDirectory + '/nyars.png';
      f = Ti.Filesystem.getFile(filename1);
      f.write(e.blob);
      Ti.Media.saveToPhotoGallery(f);
      blobImage = f.toBlob();
      Ti.App.image = f.toBlob();
    });
    win.add(cameraView);
    win.add(toolbar);
    Ti.Media.hideCamera();
    msgWin.open();
    setTimeout(function () {
      msgWin.close({
        opacity: 0,
        duration: 750
      });
    }, 2000);
  },
  cancel: function () {
    win.close();
  },
  error: function (error) {
    var a = Ti.UI.createAlertDialog({
      title: '(´・ω・｀)'
    });
    if (error.code == Ti.Media.NO_CAMERA) {
      a.setMessage(L('camera_error'));
    } else {
      a.setMessage('Error: ' + error.code);
    }
    a.show();
    win.close();
  },
  allowEditing: false,
  allowImageEditing: false,
  autohide: false,
  mediaTypes: Ti.Media.MEDIA_TYPE_PHOTO,
  overlay: overlay,
  saveToPhotoGallery: false,
  showControls: true,
  transform: Ti.UI.create2DMatrix().scale(1)
});

// Add event part.
btCamera.addEventListener('click', function () {
  var cameraWindow = Ti.UI.createWindow({
    url: 'camera.js',
    title: L('voice')
  });
  cameraWindow.open();
});
btAction.addEventListener('click', function () {
  selectMedia.show();
});
selectMedia.addEventListener('click', function (e) {
  switch (e.index) {
  case 0:
    var mailDialog = Ti.UI.createEmailDialog();
    mailDialog.addAttachment(blobImage);
    mailDialog.setBarColor('#000');
    mailDialog.setMessageBody(L('voice'));
    mailDialog.open();
    break;
  }
});
Ti.UI.iPhone.hideStatusBar();