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
    tiltLR: 'tilt L-R: Unknown',
    tiltFB: 'tilt F-B: Unknown',
    dir: 'direction: Unknown',
    deviceMotion: `Device Motion support?`,
    accX: 'acc X: Unknown',
    accY: 'acc Y: Unknown',
    accZ: 'acc Z: Unknown',
    fullScreenMessage: 'Full Screen? Unknown'
  },
  methods: {},
  created: function() {
    let self = this;

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
