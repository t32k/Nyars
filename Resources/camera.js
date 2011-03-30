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
  options: ['Email', 'Cancel'],
  cancel: 2,
  title: 'Send Your Nekomimi!'
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
  top: 45
});
var overlay = Ti.UI.createView();
overlay.add(ears);

// offset:55
var cameraZoom = Ti.UI.create2DMatrix().translate(0, 55);
// Start camera function.
Ti.Media.showCamera({
  success: function (event) {
    var cameraView = Ti.UI.createImageView({
      width: 320,
      height: 480,
      top: 0,
      left: 0,
      image: event.media
    });
    cameraView.add(overlay);
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
      a.setMessage('Camera is not found on device.');
    } else {
      a.setMessage('Error: ' + error.code);
    }
    a.show();
    win.close();
  },
  overlay: overlay,
  showControls: true,
  transform: cameraZoom,
  mediaTypes: Ti.Media.MEDIA_TYPE_PHOTO,
  saveToPhotoGallery: false,
  allowEditing: false,
  allowImageEditing: false,
  autohide: false
});

// Add event part.
btCamera.addEventListener('click', function () {
  var cameraWindow = Ti.UI.createWindow({
    url: 'camera.js',
    title: 'Meow! Meow!'
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
    mailDialog.setMessageBody('Meow! Meow!');
    mailDialog.addAttachment(blobImage);
    mailDialog.setBarColor('#000');
    mailDialog.open();
    break;
  }
});
Ti.UI.iPhone.hideStatusBar();