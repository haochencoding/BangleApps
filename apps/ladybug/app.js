let settings = require("Storage").readJSON("ladybug.settings.json",1) || { "recording":false };

function showMenu() {
  const menu = {
      '': { 'title': 'Ladybug' },
      '< Back': () => { load(); },
      'RECORD': {
          value: !!settings.recording,  // Convert the boolean to its boolean representation explicitly
          onchange: v => {
              settings.recording = v; // Set recording to the new value (v)
              require("Storage").writeJSON("ladybug.settings.json", settings);
              if (WIDGETS["ladybug"]) {
                WIDGETS["ladybug"].reload(); // Reload the widget to reflect changes
              }
          }
      }
  };
  E.showMenu(menu);
}

g.clear();
Bangle.loadWidgets();
Bangle.drawWidgets();
showMenu();  // Show the menu when the app starts
