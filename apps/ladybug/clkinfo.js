(function () {
	const recimg = () =>
		atob("GBiBAAAAAAAAAAB+AAH/gAeB4A4AcAwAMBgAGBh+GDD/DDD/DDD/DDD/DDD/DDD/DBh+GBgAGAwAMA4AcAeB4AH/gAB+AAAAAAAAAA==");

	const pauseimg = () =>
		atob("GBiBAAAAAAAAAAB+AAH/gAeB4A4AcAwAMBgAGBjnGDDnDDDnDDDnDDDnDDDnDDDnDBjnGBgAGAwAMA4AcAeB4AH/gAB+AAAAAAAAAA==");
    
    let settings = require("Storage").readJSON("ladybug.settings.json",1) || { "recording":false };

	return {
		name: "Bangle",
		items: [
			{
				name: "ladybug",
				get: () => {
					const w = typeof WIDGETS !== "undefined" && WIDGETS["ladybug"];

					return w && settings.recording ? {
						text: "Recording",
						short: "Rec",
						img: recimg(),
					} : {
						text: w ? "Paused" : "No rec",
						short: w ? "Paused" : "No rec",
						img: pauseimg(),
					};
				},
				run: () => {
					const w = typeof WIDGETS !== "undefined" && WIDGETS["ladybug"];
					if(w){
						Bangle.buzz();
						settings.recording = !settings.recording; // Reset recording status
                        require("Storage").writeJSON("ladybug.settings.json", settings);
                        WIDGETS["ladybug"].reload(); // Reload the widget to reflect changes
						// Lock and unlock Bangle to force refreshing clockinfo card
						Bangle.setLocked(true);
						Bangle.setLocked(false);
					}
				},
				show: () => {},
				hide: () => {},
			},
		]
	};
});
