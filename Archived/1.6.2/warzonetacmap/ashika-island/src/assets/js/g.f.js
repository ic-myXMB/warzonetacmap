// g.lobal f.unctions

function addLabels(points, markersGroup){
    points.forEach(point => {
       const markerOptions = {
        icon:  L.divIcon({ 
            className: point.labelType === "main" ? "poi-label main" : "poi-label second", 
            html: `<div>${point.title}</div>` })
       } 
       const marker = L.marker([point.location.lat, point.location.lng], markerOptions);
       markersGroup.addLayer(marker);
    });
  }


function showNotificationMessage(text) {
	let nmb = document.getElementById("notification-message-box");
	let message = document.createElement("div");
	message.classList.add("message");
	message.innerHTML = text;
	nmb.appendChild(message);
	setTimeout(() => {
		message.remove();
	}, 3000);
}

function checkSharePoint() {
	let href = new URL(window.location.href);

	if (href.search.length === 0) return;
	if (href.search.indexOf("debug") !== -1) return;

	if (!href.searchParams.has("point")) return;
	let result = href.searchParams.get("point").split(",");
	return [+result[0], +result[1]];
	// if(new URL(window.location.href).search.length === 0) return;
	// if(new URL(window.location.href).search.indexOf('debug') !== -1) return;
	// let hash = new URL(window.location.href).search.substring(1);
	// let data = hash.split(/[=,]/);
	// return data;
}

function getPointID() {
	let href = new URL(window.location.href);

	if (href.search.length === 0) return;
	if (href.search.indexOf("debug") !== -1) return;

	// let hash = new URL(window.location.href).search.substring(1);
	if (!href.searchParams.has("pointkey")) return;
	let result = href.searchParams.get("pointkey").split(",");
	return [+result[0], +result[1]];
}

/** 
 * Get data from json
 * @param {*} fileName 
 * @param {*} folderName
 **/
async function getData(fileName, folderName = '') {
	const response = await fetch(`${window.location.origin}/warzonetacmap/ashika-island/src/assets/js/data/${folderName}${fileName}.json`, {
		// cache: 'reload',
	});
	return await response.json();
}

/**
 * 
 * @param {*} array 
 */
function createDotIcon(array){
	let icons = new Object();
	array.forEach(item => {
		icons[item.replace('-', '_')] = L.icon({
			iconUrl: "../../../images/icons/dots/icon-${item}.svg",
			iconSize: [14, 14], // size
			iconAnchor: [7, 7], // center
			popupAnchor: [0, -14], // popup
		});
	})
	return icons;
}

/**
 * Load settings for main sidebar
 * @param {*} mapType 
 * 
 */
function loadMapControlOptions(mapType){
	let mapControlOptions = JSON.parse(localStorage.getItem(`wtmControlSettings-${mapType}`));
	if (mapControlOptions) {
		document.querySelectorAll('.leaflet-control-layers-selector').forEach((input, indx) => {
				if(mapControlOptions[input.name] !== undefined){
					input.checked = mapControlOptions[input.name];
					input.dispatchEvent(new Event('click'));
				}

		});
	}
}

/**
 * Save settings for main sidebar
 * @param {*} mapType 
 */
function saveMapControlOptions(mapType){
	let mapControlOptions = {};
	let control = document.querySelectorAll('.leaflet-control-layers-selector');
	control.forEach((input, indx) => {
		mapControlOptions[input.name] = input.checked;
	})
	localStorage.setItem(`wtmControlSettings-${mapType}`, JSON.stringify(mapControlOptions));
}

/**
 * Load main settings for main sidebar
 * @param {*} mapType 
 */
function loadMapSettings(mapType){
	let mapSettings = JSON.parse(localStorage.getItem(`wtmMapSettings-${mapType}`));
	if (mapSettings) {
		document.querySelectorAll('.map-settings-block input').forEach((input, indx) => {
			if(mapSettings[input.name] !== undefined && input.value === mapSettings[input.name]) {
				input.checked = true;
				input.dispatchEvent(new Event('change', { bubbles: true }));
				// input.dispatchEvent(new Event('click'));
				// input.dispatchEvent(new Event('change'));
				// input.dispatchEvent(new Event('click'));
			}
		});
	}
}

/**
 * Save main settings for main sidebar
 * @param {*} mapType 
 */
function saveMapSettings(mapType){
	let mapSettings = {};
	let inputs = document.querySelectorAll('.map-settings-block input:checked');
	inputs.forEach(input => {
		mapSettings[input.name] = input.value;
	})
	localStorage.setItem(`wtmMapSettings-${mapType}`, JSON.stringify(mapSettings));
}

/**
 * 
 * @param {*} controlObj 
 * @param {*} blockName 
 */
function moveControltoSidebar(controlObj, blockName){
	let htmlObject = controlObj.getContainer();
	var a = document.getElementById(blockName);
	function setParent(el, newParent) {
		newParent.appendChild(el);
	}
	setParent(htmlObject, a);
	var list = document.querySelectorAll("leaflet-control-layers-overlays label");
	list.forEach((item, indx) => {
		let i = document.createElement("i");
		item.querySelector("span span").append(i);
	});
}


/**
 * 
 * @param {*} layer 
 * @param {*} name 
 * @param {*} badges 
 */
function addOverlayToMap(control, layer, name, badges = {}){
	let {dmz, br, season} = badges;
	control.addOverlay(layer, `${name}${season ? `<i title="Information about these markers is in the process of being updated according to the latest season." class="season">${season}</i>` : ''} ${dmz ? '<i class="dmz">DMZ</i>' : ''}${br ? '<i class="br">BR</i>' : ''}`, name);
}
