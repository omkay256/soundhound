function gotoLastSoundTab() {
	chrome.tabs.query({audible: true, muted: false}, function(tabs) {
		if (tabs.length == 0) return;
		set = false;
		chrome.tabs.getSelected(null, function(tab){
			for (i = 0; i < tabs.length; i++) {
				if (tabs[i].id == tab.id) {
					set = true;
					chrome.windows.update(tabs[(i+1)%tabs.length].windowId, {focused: true});
					chrome.tabs.update(tabs[(i+1)%tabs.length].id, {active: true});
				}
			}
			if (set != true) {
				chrome.windows.update(tabs[0].windowId, {focused: true});
				chrome.tabs.update(tabs[0].id, {active: true});	
			}
		});
	});
}

chrome.commands.onCommand.addListener(function(command) {
	if (command === "goto-sound-tab") gotoLastSoundTab();
});
