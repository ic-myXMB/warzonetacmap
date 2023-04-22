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

/**
 * 
 * @returns 
 */
function checkMissionPoint() {
	let href = new URL(window.location.href);

	if (href.search.length === 0) return;
	if (href.search.indexOf("debug") !== -1) return;

	// let hash = new URL(window.location.href).search.substring(1);
	if (!href.searchParams.has("mission")) return;
	let result = href.searchParams.get("mission").split(",");
	return [+result[0], +result[1]];
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
 * 
 * @param {*} mapName 
 * @param {*} fileName 
 * @param {*} subFolderName 
 * @returns 
 */
async function getJSONData(mapName, fileName, subFolderName = '') {
	const response = await fetch(`${window.location.origin}/warzonetacmap/${mapName}/src/assets/js/data${subFolderName}/${fileName}.json`, {
		// cache: 'reload',
	});
	return await response.json();
}

async function getData(fileName, folderName = '') {
	const response = await fetch(`${window.location.origin}/warzonetacmap/js/data/${folderName}data_${fileName}.json`, {
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
			iconUrl: "../images/icons/dots/icon-${item}.svg",
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
			switch (input.type) {
				case 'range':
					input.value = mapSettings[input.name];
					input.dispatchEvent(new Event('change', { bubbles: true }));
					break;
				case 'radio':
					if(mapSettings[input.name] !== undefined && input.value === mapSettings[input.name]){
						input.checked = true;
						input.dispatchEvent(new Event('change', { bubbles: true }));
					}
					break;
			}
			
			// 	// input.dispatchEvent(new Event('click'));
			// 	// input.dispatchEvent(new Event('change'));
			// 	// input.dispatchEvent(new Event('click'));
			// }
		});
	}
	rangeSlider();
}

/**
 * Save main settings for main sidebar
 * @param {*} mapType 
 */
function saveMapSettings(mapType){
	let mapSettings = {};
	let inputs = document.querySelectorAll('.map-settings-block input:checked, .map-settings-block input[type="range"]');
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
	let {dmz, br, season, newIn} = badges;
	control.addOverlay(layer, `${name}${season ? `<i title="Information about these markers is in the process of being updated according to the latest season." class="season">${season}</i>` : ''} ${newIn ? `<i class="new">new</i>` : ''} ${dmz ? '<i class="dmz">DMZ</i>' : ''}${br ? '<i class="br">BR</i>' : ''}`, name);
}


/**
 * 
 * @param {*} options 
 * @returns 
 */
function _createCustomIcon(options){
    return L.icon({
        iconUrl: `../images/icons/${options.fileName}.svg`,
        iconSize: options.iconSize ?? [30, 30],
        iconAnchor: options.iconAnchor ?? [15, 15],
        popupAnchor: options.popupAnchor ?? [0, -15],
    })
}

/**
 * 
 * @param {*} pointsArray 
 * @param {*} markersGroup 
 * @param {*} showPopup 
 */
function addMarkersToMap2(pointsArray, markersGroup, showPopup = true) {
    pointsArray.forEach((point) => {
        const markerOptions = {
            icon: point.alternative_icon ? eval(point.alternative_icon) : eval(point.icon),
            name: point.name,
            sector: point.sector ?? null,
        };
        const marker = L.marker(
            [point.location.lat, point.location.lng],
            markerOptions
        );

        // let pointIDlink = `${mapPath}/debug?pointkey=${point.location.lat},${point.location.lng}`;

        if (showPopup) {
            const popupContent = `
          <div class="popup-card">
            <div class="preview"><img src="${point.preview ?? '#'}"></div>
            <div class="title">${point.name}</div>
            <div class="description">${point.description ?? "[REDACTED]"}</div>
          </div>`;
            marker.bindPopup(popupContent);
        }

        if (isDebug) {
            let oldLatLng;
            marker.options.draggable = true;
            marker
                .on("dragstart", (e) => {
                    oldLatLng = e.target.getLatLng();
                })
                .on("dragend", (e) => {
                    const latLng = e.target.getLatLng();
                    const item = document.createElement("div");
                    const debugList = document.getElementById("debug-list");
                    item.innerHTML = `old: ${oldLatLng} | new: ${latLng}`;
                    item.classList.add("btn-clipboard");
                    const text = `"lat": "${latLng.lat}", "lng": "${latLng.lng}",`;
                    item.dataset.clipboardText = text;
                    debugList.prepend(item);
                });
        }

        markersGroup.addLayer(marker);
    });
}



function addMissions(pointsArray, globalLayer) {
    let missionsHtml;
    pointsArray.forEach(fraction => {
        fraction.missions.forEach(mission => {
            let tasks = '';
    
            mission.tasks.forEach(task => {
                let marker = L.marker([task.location.lat, task.location.lng], {
                    icon: $icon.mission,
                })
    
                const popupContent = `
                    <div class="popup-card">
                    <div class="title">${mission.name}</div>
                    <div class="human-location">${mission.human_location ?? ''}</div>
                    <div class="description">${mission.description ?? '[REDACTED]'}</div>
                    </div>
                `;
    
                marker.bindPopup(popupContent);
                globalLayer.addLayer(marker);
                
                if(task.map === mapName){
                    tasks += `
                        <div class="task" data-marker-id="${marker._leaflet_id}" data-location="${task.location.lat}:${task.location.lng}">
                        ${task.map === mapName ? '' : 'go'} ${task.name}
                        </div>
                    ` 
                } else {
                    tasks += `
                        <div class="task" data-marker-id="${marker._leaflet_id}" data-location="${task.location.lat}:${task.location.lng}">
                        <a href="https://warzonetacmap.online/?mission=${task.location.lat},${task.location.lng}">${task.map === mapName ? '' : 'go'} ${task.name}</a>
                        </div>
                    `
                }


            })		
    
            missionsHtml += `
                <div class="mission">
                    <div class="name">${mission.name}</div>
                    <div class="details">Tier ${mission.tier}, ${fraction.fraction_name}</div>
                    <div class="tasks-list">${tasks}</div>
                </div>`
        })
    })



    const element = document.getElementById('header-control-missions'); // get the element to insert into
	element.innerHTML = missionsHtml; // set the innerHTML of the element to the code

    // pointsArray.forEach(easterEggArray => {
    //     let gobalEasterEggName = easterEggArray.name;
    //     const markersGroup = new L.FeatureGroup(); // create group for markers
        
    //     easterEggArray.points.forEach(ee => {
    //         const marker = L.marker([ee.location.lat, ee.location.lng], {
    //             name: ee.name ?? gobalEasterEggName,
    //             icon: eval(ee.icon),
    //         })

    //         const popupContent = `
    //             <div class="popup-card">
    //             <div class="preview"><img src="${ee.preview ?? '#'}"></div>
    //             <div class="title">${ee.name}</div>
    //             <div class="human-location">${ee.human_location ?? ''}</div>
    //             <div class="description">${ee.description ?? '[REDACTED]'}</div>
    //             </div>
    //         `;

    //         marker.bindPopup(popupContent);
    //         markersGroup.addLayer(marker);
    //     })
        
    //     addOverlayToMap(globalLayer, markersGroup, gobalEasterEggName, {br: true}); // repeat!
    // })
}

/**
 * 
 * @param {*} pointsArray 
 * @param {*} globalLayer 
 */
function addEasterEggtoMap(pointsArray, globalLayer) {
    pointsArray.forEach(easterEggArray => {
        let gobalEasterEggName = easterEggArray.name;
        const markersGroup = new L.FeatureGroup(); // create group for markers
        
        easterEggArray.points.forEach(ee => {
            const marker = L.marker([ee.location.lat, ee.location.lng], {
                name: ee.name ?? gobalEasterEggName,
                icon: eval(ee.icon),
            })

            const popupContent = `
                <div class="popup-card">
                <div class="preview"><img src="${ee.preview ?? '#'}"></div>
                <div class="title">${ee.name}</div>
                <div class="human-location">${ee.human_location ?? ''}</div>
                <div class="description">${ee.description ?? '[REDACTED]'}</div>
                </div>
            `;

            marker.bindPopup(popupContent);
            markersGroup.addLayer(marker);
        })
        
        addOverlayToMap(globalLayer, markersGroup, gobalEasterEggName, {br: true}); // repeat!
    })
}

/**
 * 
 * @param {*} pointsArray 
 * @param {*} markersGroup 
 */
function addLines(pointsArray, markersGroup) {
    pointsArray.forEach(point => {
        const line = L.polyline(point, {color: '#DDD', weight: '3'});
        markersGroup.addLayer(line);
    })
}

function addFigure(pointsArray, markersGroup) {
    pointsArray.forEach(point => {
        const line = L.polygon(point.lines, {});
        line.setStyle(point.styles);

        const popupContent = `
        <div class="popup-card">
        <div class="preview"><img src="${point.preview ?? '#'}"></div>
        <div class="title">${point.name}</div>
        <div class="human-location">${point.human_location ?? ''}</div>
        <div class="description">${point.description ?? '[REDACTED]'}</div>
        </div>
    `;

        line.bindPopup(popupContent);
        markersGroup.addLayer(line);
        // const line = L.polyline(point, {color: '#DDD', weight: '3'});
    })
}

/**
 * 
 * @param {*} points 
 * @param {*} markersGroup 
 * @param {*} isPopup 
 */
function addCircle(points, markersGroup, isPopup = true) {
    for (var i = 0; i < points.length; i++) {
        var point = points[i];
        let circle = L.circle([point.lat, point.lng], {
            radius: point.radius,
        })
            .setStyle(point.styles)
            .bindPopup(`<div class="title">${point.name}</div>`);
        // Get the center of the circle
        let center = circle.getLatLng();
        // Create a marker with the L.marker class, passing in the icon as an option
        let marker = L.marker(center, {
            icon: point.alternative_icon ? eval(point.alternative_icon) : eval(point.icon),
            opacity: 0.9,
        });
        if (isPopup) {
            if (point.description != null) {
                marker.bindPopup(
                    `<div class="popup-card"><div class="title">${point.name}</div><div class="description">${point.description}</div>`
                );
            } else {
                marker.bindPopup(
                    `<div class="popup-card"><div class="title">${point.name}</div>><div class="description">#</div></div>`
                );
            }
        }
        markersGroup.addLayer(circle);
        markersGroup.addLayer(marker);
    }
}

function addCircle2(points, markersGroup, isPopup = true) {
    for (var i = 0; i < points.length; i++) {
        var point = points[i];
        let circle = L.circle([point.location.lat, point.location.lng], {
            radius: point.radius,
        })
            .setStyle(point.styles)
            .bindPopup(`<div class="title">${point.name}</div>`);
        // Get the center of the circle
        let center = circle.getLatLng();
        // Create a marker with the L.marker class, passing in the icon as an option
        let marker = L.marker(center, {
            icon: point.alternative_icon ? eval(point.alternative_icon) : eval(point.icon),
            opacity: 0.9,
        });
        if (isPopup) {
            if (point.description != null) {
                marker.bindPopup(
                    `<div class="popup-card"><div class="title">${point.name}</div><div class="description">${point.description}</div>`
                );
            } else {
                marker.bindPopup(
                    `<div class="popup-card"><div class="title">${point.name}</div>><div class="description">#</div></div>`
                );
            }
        }
        markersGroup.addLayer(circle);
        markersGroup.addLayer(marker);
    }
}

/**
 * 
 * @param {*} points 
 * @param {*} markersGroup 
 * @param {*} isPopup 
 */
function addGlitch(points, markersGroup, isPopup = true) {
    for (var i = 0; i < points.length; i++) {
        var point = points[i];
        let circle = L.circle([point.lat, point.lng], {
            radius: point.radius,
        }).setStyle(point.styles);
        // .bindPopup(`<div class="title">${point.name}</div>`);
        // Get the center of the circle
        let center = circle.getLatLng();
        // Create a marker with the L.marker class, passing in the icon as an option
        let marker = L.marker(center, {
            icon: eval(`${point.icon}`),
            opacity: 1,
        });
        if (isPopup) {
            if (point.description != null) {
                marker.bindPopup(
                    `<div class="popup-card"><div class="title">${point.name} - ${point.sector}</div>
                    <div class="description"><div>Checked: ${point.checked}</div>
                    ${point.description}
                    </div></div>`
                );
            } else {
                marker.bindPopup(
                    `<div class="popup-card"><div class="title">${point.name}</div><div class="description">#</div></div>`
                );
            }
        }
        markersGroup.addLayer(circle);
        markersGroup.addLayer(marker);
    }
}

/**
 * 
 * @param {*} points 
 * @param {*} markersGroup 
 */
function addKeys(points, markersGroup) {
    let rateText =
        "Ratings based on locked area supply crates, loose loot value/number, location danger, and mission key requirement.";

    for (var i = 0; i < points.length; i++) {
        var point = points[i];
        let marker = L.marker([point.location.lat, point.location.lng], {
            icon: point.alternative_icon ? eval(point.alternative_icon) : eval(point.icon),
            name: point.name,
            place: point.place,
            sector: point.sector,
            rate: point.keyRate,
            mission:
                point.relations && point.relations.mission
                    ? point.relations.mission
                    : null,
            helpful:
                point.relations && point.relations.helpful
                    ? point.relations.helpful
                    : null,
        });
        let pointIDlink = `${mapPath}?pointkey=${point.location.lat},${point.location.lng}`;
        // console.log(pointIDlink);
        let content = "";
        if (
            point.relations !== undefined &&
            point.relations.mission !== undefined
        ) {
            content = `<div class="popup-card key-block">
            <div class="key-rate-box">
                <div class="number">${point.keyRate}</div>
                <div class="text">${rateText}</div>
            </div>
            <div class="title"><span class="btn-clipboard" data-clipboard-text="${pointIDlink}"><img src="../images/icons/icon-link.svg" /></span><span>${point.sector} - ${point.name}</span></div><div></div>
            <div class="description">
                <div class="mission">Mission: ${point.relations.mission}</div>
            </div></div>`;
        } else if (
            point.relations !== undefined &&
            point.relations.helpful !== undefined
        ) {
            content = `<div class="popup-card key-block">
            <div class="key-rate-box">
                <div class="number">${point.keyRate}</div>
                <div class="text">${rateText}</div>
            </div>
            <div class="title"><span class="btn-clipboard" data-clipboard-text="${pointIDlink}"><img src="../images/icons/icon-link.svg" /></span><span>${point.sector} - ${point.name}</span></div><div></div>
            <div class="description">
                <div class="helpful">Helpful: ${point.relations.helpful}</div>
            </div></div>`;
        } else {
            content = `<div class="popup-card key-block">
            <div class="key-rate-box">
                <div class="number">${point.keyRate}</div>
                <div class="text">${rateText}</div>
            </div>
            <div class="title"><span class="btn-clipboard" data-clipboard-text="${pointIDlink}"><img src="../images/icons/icon-link.svg" /></span><span>${point.sector} - ${point.name}</span></div><div class="description"></div></div>`;
        }

        marker.bindPopup(content);
        markersGroup.addLayer(marker);
    }
}