// Google Analytics Tracking Code
Ti.include('analytics.js');
var analytics = new Analytics('UA-2317436-27');
Ti.App.addEventListener('analytics_trackPageview', function (e) {
  var path = Ti.Platform.name;
  analytics.trackPageview(path + e.pageUrl);
});
Ti.App.addEventListener('analytics_trackEvent', function (e) {
  analytics.trackEvent(e.category, e.action, e.label, e.value);
});
Ti.App.Analytics = {
  trackPageview: function (pageUrl) {
    Ti.App.fireEvent('analytics_trackPageview', {
      pageUrl: pageUrl
    });
  },
  trackEvent: function (category, action, label, value) {
    Ti.App.fireEvent('analytics_trackEvent', {
      category: category,
      action: action,
      label: label,
      value: value
    });
  }
};
analytics.start(1);
Ti.App.Analytics.trackPageview('/startup');
Ti.UI.setBackgroundColor('#111');
var win = Ti.UI.createWindow({
  title: 'Home',
  backgroundImage: 'images/bg.jpg'
});
var logo = Ti.UI.createImageView({
  image: 'images/icon.png',
  width: 207,
  height: 183,
  top: 93,
  left: 60,
  hires: true
});
var button = Ti.UI.createButton({
  title: L('exe'),
  width: 180,
  height: 40,
  top: 320,
  borderRadius: 5,
  borderColor: '#333',
  font: {
    fontFamily: 'Helvetica Neue',
    fontSize: 13,
    fontWeight: 'bold'
  },
  backgroundImage: 'images/bg_off.png',
  backgroundSelectedImage: 'images/bg_on.png',
  opacity: 0
});
var selectColor = Ti.UI.createOptionDialog({
  options: [L('black'), L('white'), L('red'), L('cancel')],
  cancel: 3,
  title: L('color')
});
var cameraWindow = Ti.UI.createWindow({
  url: 'camera.js',
  title: L('voice')
});
var startupAnimation = Ti.UI.createAnimation({
  curve: Ti.UI.ANIMATION_CURVE_EASE_IN_OUT,
  opacity: 1,
  duration: 750,
  delay: 100
});
button.animate(startupAnimation);
// Add event part.
button.addEventListener('click', function () {
  selectColor.show();
});
selectColor.addEventListener('click', function (e) {
  switch (e.index) {
  case 0:
    Ti.App.earsColor = 'black';
    break;
  case 1:
    Ti.App.earsColor = 'white';
    break;
  case 2:
    Ti.App.earsColor = 'red';
    break;
  }
  Ti.App.Analytics.trackPageview('/startup/camera/' + Ti.App.earsColor);
  cameraWindow.open();
});
// Add item to window.
win.add(logo);
win.add(button);
win.open();