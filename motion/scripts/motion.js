var HeaderText = {
  template: '<h4 class="header">Simple App - Device Motion</h4>'
}

var header = new Vue({
  el: 'header',
  data: {},
  components: {
    'header-text': HeaderText
  }
});

var main = new Vue({
  el: '#main',
  data: {
    deviceOrientation: `Device Orientation support?`,
    tiltLR: '',
    tiltFB: '',
    dir: '',
    deviceMotion: `Device Motion support?`,
    accX: '',
    accY: '',
    accZ: ''
  },
  methods: {
    goFullScreen() {
      let browserInfo = navigator.userAgent.toLowerCase();
      if (/iphone/.test(browserInfo) || /android/.test(browserInfo)) {
        // let body = document.getElementsByTagName('body');
        // body.requestFullScreen();
        window.requestFullScreen();
      }
    }
  },
  created: function() {
    let self = this;

    self.goFullScreen();

    if (window.DeviceOrientationEvent) {
      window.addEventListener('deviceorientation', function(eventData) {

        if (eventData.gamma !== null) {
          self.tiltLR = `tilt L-R: ${Math.floor(eventData.gamma)}`;
        } else {
          self.tiltLR = 'tilt L-R: Not supported';
        }

        if (eventData.beta !== null) {
          self.tiltFB = `tilt F-B: ${Math.floor(eventData.beta)}`;
        } else {
          self.tiltFB = 'tilt F-B: Not supported';
        }

        if (eventData.alpha !== null) {
          self.dir = `direction: ${Math.floor(eventData.alpha)}`;
        } else {
          self.dir = 'direction: Not supported';
        }

      });
    } else {
      self.tiltLR = 'tilt L-R: Not supported';
      self.tiltFB = 'tilt F-B: Not supported';
      self.dir = 'direction: Not supported';
    }

    if (window.DeviceMotionEvent) {
      window.addEventListener('devicemotion', function(eventData) {

        if (eventData.acceleration.x !== null) {
          self.accX = `acc X: ${Math.floor(eventData.acceleration.x)}`;
        } else {
          self.accX = 'acc X: Not supported';
        }

        if (eventData.acceleration.y !== null) {
          self.accY = `acc Y: ${Math.floor(eventData.acceleration.y)}`;
        } else {
          self.accY = 'acc Y: Not supported';
        }

        if (eventData.acceleration.z !== null) {
          self.accZ = `acc Z: ${Math.floor(eventData.acceleration.z)}`;
        } else {
          self.accZ = 'acc Z: Not supported';
        }

      });
    } else {
      self.accX = 'acc X: Not supported';
      self.accY = 'acc Y: Not supported';
      self.accZ = 'acc Z: Not supported';
    }

  }
});
