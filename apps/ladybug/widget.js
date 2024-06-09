(() => {
  // Load settings, dataRecorder module, and image
  let settings = require("Storage").readJSON("ladybug.settings.json",1) || { "recording":false };
  const recorder = require("ladybug.dataRecorder.js");
  const icon = atob("GBiDASSSSSSSSSSSSSSSSSQSSSSSSSSSSSQSQSSSSSSSSSQACSSSSSSSSSQAASSSSSSSSSAAASSSSSSQCSAAACSSSSSSASAAACSASSSSQAJAJAQSSSSSBAJAJIASSSSAJIJBJIASSSSAAJJBJJASSSSRAJIBIBIACSSRJJIBIJICSSSRJBJBJJICSSSRIBJAJIICSSSRJJJABIACSSSQBJIAJJICSSQABJABJJIASSSSJJABJBAQSSSSRAIBIACSSSSSSAIPIASSSSSSSQAAACSSSSSSSSSSSSSSSQ==");

  // add widget
  WIDGETS["ladybug"] = {
    area: "tl",
    width: 24,
    draw: function() {
      if (settings.recording) {
        g.reset().clearRect(this.x, this.y, this.x + this.width, this.y+23); // Clear background
        g.drawImage(icon, this.x, this.y); // Draw widget
        Bangle.on('HRM-raw', recorder);
        Bangle.setHRMPower(1, 'ladybug');
        Bangle.setCompassPower(1, 'ladybug');
      } else {
        Bangle.removeListener('HRM-raw', recorder);
        Bangle.setHRMPower(0, 'ladybug');
        Bangle.setCompassPower(0, 'ladybug');
      }
    },
    reload: function() {
      settings = require("Storage").readJSON("ladybug.settings.json",1) || { recording: false };
      Bangle.drawWidgets(); //redraw all widgets
    }
  };
})();
