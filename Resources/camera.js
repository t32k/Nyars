var win = Ti.UI.currentWindow;

var ears = Ti.UI.createImageView({
  image: "images/ears.png",
  width: 213,
  height: 95,
  top: 30
});

var overlay = Ti.UI.createView();

overlay.add(ears);

var btOpenCamera = Ti.UI.createButton({
  systemButton: Ti.UI.iPhone.SystemButton.CAMERA
});

var flexSpace = Ti.UI.createButton({
  systemButton: Ti.UI.iPhone.SystemButton.FLEXIBLE_SPACE
});

var btAction = Ti.UI.createButton({
  systemButton: Ti.UI.iPhone.SystemButton.ACTION
});

var toolbar = Ti.UI.createToolbar({
  items: [flexSpace, btOpenCamera, flexSpace, btAction, flexSpace],
  bottom: 0,
  borderTop: true,
  barColor: "#000",
  translucent: true
});

var exportSelect = Ti.UI.createOptionDialog({
  options: ["Twitter", "E-Mail", "Cancel"],
  cancel: 2,
  title: "Share"
});

var blobImage;

var conf = {
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
      var filename1 = Ti.Filesystem.applicationDataDirectory + "/nyar.png";
      f = Ti.Filesystem.getFile(filename1);
      f.write(e.blob);
      Ti.Media.saveToPhotoGallery(f);
      blobImage = f.toBlob();
    });
    win.add(cameraView);
    win.add(toolbar);
    Ti.Media.hideCamera();
  },
  cancel: function () {
    win.close();
  },
  error: function (error) {
    var a = Ti.UI.createAlertDialog({
      title: "(´・ω・｀)"
    });
    if (error.code == Ti.Media.NO_CAMERA) {
      a.setMessage("Camera is not found on device.");
    } else {
      a.setMessage("Error: " + error.code);
    }
    a.show();
    win.close();
  },
  overlay: overlay,
  showControls: true,
  mediaTypes: Ti.Media.MEDIA_TYPE_PHOTO,
  saveToPhotoGallery: false,
  allowEditing: false,
  allowImageEditing: false,
  autohide: false
};

btOpenCamera.addEventListener("click", function () {
  Ti.Media.showCamera(conf);
	win.remove(cameraView);
	win.remove(toolbar);	
});

btAction.addEventListener("click", function () {
  exportSelect.show();
});

exportSelect.addEventListener("click", function (e) {
  switch (e.index) {
  case 0:
    // Twitter
    break;
  case 1:
    // E-Mail　
    var mailDialog = Ti.UI.createEmailDialog();
    mailDialog.setMessageBody("Nyar! Nyar!");
    mailDialog.addAttachment(blobImage);
    mailDialog.setBarColor("#000");
    mailDialog.open();
    break;
  }
});

Ti.Media.showCamera(conf);