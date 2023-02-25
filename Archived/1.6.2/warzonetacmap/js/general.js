const dotColors = ['yellow', 'blue', 'green', 'green'];
const dotIcon = createDotIcon(dotColors);


async function main() {
	const icon_hiddenCashe = L.icon({
		iconUrl: "images/icons/icon-dot-yellow.svg",
		iconSize: [12, 12],
		iconAnchor: [6, 6],
		popupAnchor: [0, -10]
	});

	const icon_deadDrops = L.icon({
		iconUrl: "images/icons/icon-deaddrop_1.svg",
		iconSize: [30, 30], // size of the icon
		iconAnchor: [15, 30],
		popupAnchor: [0, -30],
	});

	const icon_exfil = L.icon({
		iconUrl: "images/icons/icon-exfil.svg",
		iconSize: [26, 26], // size of the icon
		iconAnchor: [23, 23],
		popupAnchor: [0, -26],
	});

	const icon_exfil_last = L.icon({
		iconUrl: "images/icons/icon-exfil-last.svg",
		iconSize: [26, 26], // size of the icon
		iconAnchor: [23, 23],
		popupAnchor: [0, -26],
	});

	const icon_exfil_both = L.icon({
		iconUrl: "images/icons/icon-exfil-both.svg",
		iconSize: [26, 26], // size of the icon
		iconAnchor: [23, 23],
		popupAnchor: [0, -26],
	});

	const icon_safe = L.icon({
		iconUrl: "images/icons/icon-safe.svg",
		iconSize: [18, 18], // size of the icon
		iconAnchor: [6, 6],
		popupAnchor: [0, -18],
	});

	const icon_spawn = L.icon({
		iconUrl: "images/icons/icon-spawn.svg",
		iconSize: [30, 30], // size of the icon
		iconAnchor: [15, 30],
		popupAnchor: [0, -30],
	});

	const icon_stronghold = L.icon({
		iconUrl: "images/icons/icon-stronghold.svg",
		iconSize: [20, 30], // size of the icon
		iconAnchor: [10, 15],
		popupAnchor: [0, -30],
	});

	const icon_stronghold_lootable = L.icon({
		iconUrl: "images/icons/icon-stronghold-lootable.svg",
		iconSize: [20, 30], // size of the icon
		iconAnchor: [10, 15],
		popupAnchor: [0, -30],
	});

	const icon_weaponCase_zone = L.icon({
		iconUrl: "images/icons/icon-weapon-case.svg",
		iconSize: [30, 30], // size of the icon
		iconAnchor: [15, 15],
	});
	const icon_radiation_zone = L.icon({
		iconUrl: "images/icons/icon-radiation-zone.svg",
		iconSize: [30, 30], // size of the icon
		iconAnchor: [15, 15],
	});
	const icon_glitch = L.icon({
		iconUrl: "images/icons/icon-glitch-warn.svg",
		iconSize: [26, 26], // size of the icon
		iconAnchor: [13, 14],
		popupAnchor: [0, -20],
	});
	const icon_key = L.icon({
		iconUrl: "images/icons/icon-key.svg",
		iconSize: [20, 20], // size of the icon
		iconAnchor: [10, 10],
		popupAnchor: [0, -20],
	});

	const icon_key_green = L.icon({
		iconUrl: "images/icons/icon-key-green.svg",
		iconSize: [20, 20], // size of the icon
		iconAnchor: [10, 10],
		popupAnchor: [0, -20],
	});
	const icon_key_orange = L.icon({
		iconUrl: "images/icons/icon-key-orange.svg",
		iconSize: [20, 20], // size of the icon
		iconAnchor: [10, 10],
		popupAnchor: [0, -20],
	});

	const icon_blow_torch = L.icon({
		iconUrl: "images/icons/dots/icon-dot-yellow-light.svg",
		iconSize: [10, 10], // size
		iconAnchor: [5, 5], // center
		popupAnchor: [0, -10], // popup
	});
	const icon_gpu = L.icon({
		iconUrl: "images/icons/dots/icon-dot-orange.svg",
		iconSize: [10, 10], // size
		iconAnchor: [5, 5], // center
		popupAnchor: [0, -10], // popup
	});

	const icon_hospital = L.icon({
		iconUrl: "images/icons/places/icon-hospital.svg",
		iconSize: [24, 24], // size
		iconAnchor: [12, 12], // center
		popupAnchor: [0, -24], // popup
	});

	const icon_police = L.icon({
		iconUrl: "images/icons/places/icon-police.svg",
		iconSize: [24, 24], // size
		iconAnchor: [12, 12], // center
		popupAnchor: [0, -24], // popup
	});

	const icon_gas_station = L.icon({
		iconUrl: "images/icons/places/icon-gas-station.svg",
		iconSize: [24, 24], // size
		iconAnchor: [12, 12], // center
		popupAnchor: [0, -24], // popup
	});

	const icon_cave_entrance = L.icon({
		iconUrl: "images/icons/icon-cave-entance.svg",
		iconSize: [24, 24], // size
		iconAnchor: [12, 12], // center
		popupAnchor: [0, -24], // popup
	});


	

	// const markers_POI_labels = await getData("poi_labels");
	// const markers_hiddenCahe = await getData("hidden_cache");
	// const markers_deadDrops = await getData("dead_drops");
	// const markers_exfil = await getData("markers_exfil");
	// const markers_playersSpawn = await getData("playersSpawn");
	// const markers_strongholds = await getData("strongholds");
	// const markers_poiZones = await getData("markers_poiZones");
	// const markers_safes = await getData("safes");
	// const markers_weaponCase_zones = await getData("weapon_case");
	// const markers_radiation_zones = await getData("radiation_zones");
	// const markers_keys = await getData("keys");
	// const markers_glitch = await getData("glitch");
	// const markers_intel = await getData("intel");
	// const markers_blowTorch = await getData("blow_torch");
	// const markers_gpu = await getData("gpu");
	// const markers_hospital = await getData("hospital", "places");
	// const markers_police = await getData("police", "places");
	// const markers_gasStation = await getData("gas_station", "places");


	
	const markers = {
		poiLabels: 'poi_labels',
		hiddenCache: 'hidden_cache',
		deadDrops: ['dead_drop', 's02/'],
		exfil: ['exfil', 's02/'],
		playerSpawn: ['player_spawn', 's02/'],
		strongholds: 'strongholds',
		poiZones: 'markers_poiZones',
		safes: 'safes',
		weaponCase: 'weapon_case',
		radiationZone: ['chemical_zone', 's02/'],
		keys: 'keys',
		glitch: 'glitch',
		intel: 'intel',
		blowTorch: 'blow_torch',
		gpu: 'gpu',
		hospital: ['hospital', 'places/'],
		police: ['police', 'places/'],
		gasStation: ['gas_station', 'places/'],
		caveEntrance: ['cave_entrance', 's02/'],
		
	};
	
	const fetchPromises = Object.entries(markers).map(([key, value]) => {
		const [fileName, folderName] = Array.isArray(value) ? value : [value, ''];
		return getData(fileName, folderName).then(data => [key, data]);
	});
	const $markers = Object.fromEntries(await Promise.all(fetchPromises));


	// Create bounds of map
	let bounds = [
		[0, 0], // padding
		[8000, 8000], // image dimensions
	];

	let selectedSector;
	let isDebug = window.location.href.indexOf("?debug") != -1 ? true : false;

	var clipboard = new ClipboardJS(".btn-clipboard");

	clipboard.on("success", function (e) {
		showNotificationMessage("Link copied to clipboard!");
		e.clearSelection();
	});

	// Create the map
	var map = L.map("map", {
		crs: L.CRS.Simple,
		zoomControl: false,
		attributionControl: false,
		maxZoom: 4, //1,
		minZoom: -4, //-3,
		// maxBounds: bounds,
		inertia: false,
		// preferCanvas: true,
		boxZoom: false,
		inertia: true,
		zoomSnap: 0.3,
		zoomDelta: 0.3,
		wheelPxPerZoomLevel: 60,
		wheelDebounceTime: 0,
	});
	
	// Create the legend
	var legend = L.control({ position: "topright" });

	legend.onAdd = function(map) {
	  var div = L.DomUtil.create("div", "legend");
	  //div.innerHTML += "<h4>Legend</h4>";
	  div.innerHTML += '<i class="icon" style="background-image: url(images/icons/icon-key.svg);background-repeat: no-repeat;"></i><span>Key</span><br>';
	  div.innerHTML += '<i class="icon" style="background-image: url(images/icons/icon-deaddrop_1.svg);background-repeat: no-repeat;"></i><span>Dead Drop</span><br>';
	  div.innerHTML += '<i class="icon" style="background-image: url(images/icons/icon-spawn.svg);background-repeat: no-repeat;"></i><span>Player Spawn</span><br>';
	  div.innerHTML += '<i class="icon" style="background-image: url(images/icons/icon-exfil.svg);background-repeat: no-repeat;"></i><span>Exfil</span><br>';
	  div.innerHTML += '<i class="icon" style="background-image: url(images/icons/icon-safe.svg);background-repeat: no-repeat;"></i><span>Safe</span><br>';
	  div.innerHTML += '<i class="icon" style="background-image: url(images/icons/icon-dot-yellow.svg);background-repeat: no-repeat;"></i><span>Hidden Cache</span><br>';
	  div.innerHTML += '<i class="icon" style="background-image: url(images/icons/icon-stronghold.svg);background-repeat: no-repeat;"></i><span>Strongholds</span><br>';
	  div.innerHTML += '<i class="icon" style="background-image: url(images/icons/icon-weapon-case.svg);background-repeat: no-repeat;"></i><span>Weapon Case</span><br>';
	  div.innerHTML += '<i class="icon" style="background-image: url(images/icons/icon-radiation-zone.svg);background-repeat: no-repeat;"></i><span>Radiation Zone</span><br>';
	  div.innerHTML += '<i class="icon" style="background-image: url(images/icons/icon-glitch-warn.svg);background-repeat: no-repeat;"></i><span>Glitches</span><br>';
	  div.innerHTML += '<i class="icon" style="background-image: url(images/icons/icon-cave-entance.svg);background-repeat: no-repeat;"></i><span>Cave Entrance</span><br>';
	  div.innerHTML += '<i class="icon" style="background-image: url(images/icons/dots/icon-dot-yellow-light.svg);background-repeat: no-repeat;"></i><span>Blow Torch</span><br>';
	  div.innerHTML += '<i class="icon" style="background-image: url(images/icons/dots/icon-dot-orange.svg);background-repeat: no-repeat;"></i><span>GPU</span><br>';

	  return div;
	};

	legend.addTo(map);
	
	//////////////////////////////////////////////////////////////////////
	/**
	 * 
	 * @param {*} pointsArray 
	 * @param {*} markersGroup 
	 * @param {*} showPopup 
	 */
	function addMarkersToMap(pointsArray, markersGroup, showPopup = true){
		pointsArray.forEach(point => {
			let marker = L.marker([point.lat, point.lng], {
				icon: point.alternativeIcon ? eval(point.alternativeIcon) : eval(point.icon),
				name: point.name,
				sector: point.sector ? point.sector : null
			})
			if(showPopup){
				let popupContent = `<div class="">
					<div class="title">${point.name}</div>
					<div class="description">${point.description != undefined ? point.description : '[REDACTED]'}</div>
				</div>`;
				marker.bindPopup(popupContent);
			}
			if (isDebug) {
				let oldLatLng;

				marker.options.draggable = true;
				marker.on("dragstart", (e) => {
					oldLatLng = e.target.getLatLng();
				}).on("dragend", function (e) {
					let latLng = e.target.getLatLng();
					let item = document.createElement("div");
					let debugList = document.getElementById("debug-list");
					item.innerHTML = `old: ${oldLatLng} | new: ${latLng}`;
					item.classList.add("btn-clipboard");
					let text = `"lat": "${latLng.lat}", "lng": "${latLng.lng}",`;
					item.dataset.clipboardText = text;
					debugList.prepend(item);
				});
			}
			markersGroup.addLayer(marker);
		})
	}

	function addMarkersToMap2(pointsArray, markersGroup, showPopup = true){
		pointsArray.forEach(point => {
			let marker = L.marker([point.location.lat, point.location.lng], {
				icon: point.alternativeIcon ? eval(point.alternativeIcon) : eval(point.icon),
				name: point.name,
				sector: point.sector ? point.sector : null,
			})
			if(showPopup){
				let popupContent = `<div class="popup-card">
					<div class="title">${point.name}</div>
					<div class="description">${point.description != undefined ? point.description : '[REDACTED]'}</div>
				</div>`;
				marker.bindPopup(popupContent);
			}
			if (isDebug) {
				let oldLatLng;

				marker.options.draggable = true;
				marker.on("dragstart", (e) => {
					oldLatLng = e.target.getLatLng();
				}).on("dragend", function (e) {
					let latLng = e.target.getLatLng();
					let item = document.createElement("div");
					let debugList = document.getElementById("debug-list");
					item.innerHTML = `old: ${oldLatLng} | new: ${latLng}`;
					item.classList.add("btn-clipboard");
					let text = `"lat": "${latLng.lat}", "lng": "${latLng.lng}",`;
					item.dataset.clipboardText = text;
					debugList.prepend(item);
				});
			}
			markersGroup.addLayer(marker);
		})
	}

	function addLabels(points, markersGroup) {
		for (var i = 0; i < points.length; i++) {
			var point = points[i];
			let marker = L.marker([point.lat, point.lng], {
				icon: L.divIcon({
					className:
						point.labelType == "main"
							? "poi-label main"
							: "poi-label second",
					html: `<div>${point.title}</div>`,
				}),
			});
			// .addTo(map);
			markersGroup.addLayer(marker);
		}
	}

	function addCircle(points, markersGroup, isPopup = true) {
		console.log(points)
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
				icon: eval(`${point.icon}`),
				opacity: 0.9,
			});
			if (isPopup) {
				if (point.description != null) {
					marker.bindPopup(
						`<div class="popup-card"><div class="title">${point.name}</div><div class="description">${point.description}</div>`
					);
				} else {
					marker.bindPopup(`<div class="popup-card"><div class="title">${point.name}</div>><div class="description">#</div></div>`);
				}
			}
			markersGroup.addLayer(circle);
			markersGroup.addLayer(marker);
		}
	}

	function addGlitch(points, markersGroup, isPopup = true) {
		for (var i = 0; i < points.length; i++) {
			var point = points[i];
			let circle = L.circle([point.lat, point.lng], {
				radius: point.radius,
			})
				.setStyle(point.styles)
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
					marker.bindPopup(`<div class="popup-card"><div class="title">${point.name}</div><div class="description">#</div></div>`);
				}
			}
			markersGroup.addLayer(circle);
			markersGroup.addLayer(marker);
		}
	}

	function addPOI_Zones(points, markersGroup) {
		for (var i = 0; i < points.length; i++) {
			var point = points[i];
			var polygon = L.polygon(point.latlng, { color: point.color });

			const bounds = polygon.getBounds();
			const center = bounds.getCenter();

			// const marker = L.marker(center, {
			// 	icon: L.divIcon({
			// 		html: `<div>${point.poi_code}</div>`,
			// 		className: "poi-zone-code",
			// 		iconSize: [200, 50]
			// 	})
			// })
			markersGroup.addLayer(polygon);
			// markersGroup.addLayer(marker);
		}
	}

	function addKeys(points, markersGroup) {
		let rateText = 'Ratings based on locked area supply crates, loose loot value/number, location danger, and mission key requirement.';


		for (var i = 0; i < points.length; i++) {
			var point = points[i];
			let marker = L.marker([point.lat, point.lng], {
				icon: eval(`${point.icon}`),
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
			let pointIDlink = `${
				window.location.origin
			}?pointkey=${+point.lat},${+point.lng}`;
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
				<div class="title"><span class="btn-clipboard" data-clipboard-text="${pointIDlink}"><img src="images/icons/icon-link.svg" /></span><span>${point.sector} - ${point.name}</span></div><div></div>
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
				<div class="title"><span class="btn-clipboard" data-clipboard-text="${pointIDlink}"><img src="images/icons/icon-link.svg" /></span><span>${point.sector} - ${point.name}</span></div><div></div>
				<div class="description">
					<div class="helpful">Helpful: ${point.relations.helpful}</div>
				</div></div>`;
			} else {
				content = `<div class="popup-card key-block">
				<div class="key-rate-box">
					<div class="number">${point.keyRate}</div>
					<div class="text">${rateText}</div>
				</div>
				<div class="title"><span class="btn-clipboard" data-clipboard-text="${pointIDlink}"><img src="images/icons/icon-link.svg" /></span><span>${point.sector} - ${point.name}</span></div><div class="description"></div></div>`;
			}

			marker.bindPopup(content);
			markersGroup.addLayer(marker);
		}
	}


	function addIntels(points, markersGroup, isPopup = true) {
		let markersStore = [];
		var container = document.getElementById("map");

		// add a delegated event listener to the container element
		container.addEventListener("click", function(event) {
			if(event.target.classList.contains('popup-btn')){
				let alias = event.target.dataset.alias;
				map.flyTo(markersStore[alias].getLatLng());
				markersStore[alias].openPopup();
			}
		});
	
		points.forEach((intel, indx) => {
			intel.steps.forEach((step, indx) => {
				let marker = L.marker([step.lat, step.lng], {
					icon: eval(`${intel.icon}`),
				})

				let prev, next;

				if(intel.steps[indx - 1] != undefined) {
					prev = `<button class="popup-btn" data-alias="${intel.alias}-${intel.steps[indx - 1].name.toLowerCase().replace(' ', '-')}">Prev</button>`;
				}

				if(intel.steps[indx + 1] != undefined) {
					next = `<button class="popup-btn" data-alias="${intel.alias}-${intel.steps[indx + 1].name.toLowerCase().replace(' ', '-')}">Next</button>`;
				}

				marker.bindPopup(
					`<div class="">${intel.name} - ${step.name}</div>${prev ? prev : ''}${next ? next : ''}`
				)
			
				markersStore[intel.alias +'-'+ step.name.toLowerCase().replace(' ', '-')] = marker;
				markersGroup.addLayer(marker);
			})
		})
	}

	// const group_intel = new L.FeatureGroup(); // create group for markers
	// addIntels(markers_intel, group_intel); // create markers and add to group
	// group_intel.addTo(map); // add group to map

	const group_keys = new L.FeatureGroup(); // create group for markers
	addKeys($markers.keys, group_keys); // create markers and add to group
	// group_keys.addTo(map); // add group to map

	const group_weaponCases_zones = new L.FeatureGroup(); // create group for markers
	addCircle($markers.weaponCase, group_weaponCases_zones); // create markers and add to group
	// group_weaponCases_zones.addTo(map); // add group to map

	const group_radiation_zones = new L.FeatureGroup(); // create group for markers
	addCircle($markers.radiationZone, group_radiation_zones); // create markers and add to group
	// group_radiation_zones.addTo(map); // add group to map

	const group_hiddenCache = new L.FeatureGroup(); // create group for markers
	addMarkersToMap($markers.hiddenCache, group_hiddenCache); // create markers and add to group
	group_hiddenCache.addTo(map); // add group to map

	const group_deadDrops = new L.FeatureGroup(); // create group for markers
	addMarkersToMap2($markers.deadDrops, group_deadDrops); // create markers and add to group
	// group_deadDrops.addTo(map); // add group to map

	const group_playerSpawn = new L.FeatureGroup(); // create group for markers
	addMarkersToMap2($markers.playerSpawn, group_playerSpawn); // create markers and add to group
	// group_playersSpawn.addTo(map); // add group to map

	const group_exfil = new L.FeatureGroup(); // create group for markers
	addMarkersToMap2($markers.exfil, group_exfil); // create markers and add to group
	// group_exfil.addTo(map); // add group to map

	const group_POILabels = new L.FeatureGroup(); // create group for markers
	addLabels($markers.poiLabels, group_POILabels); // create markers and add to group
	group_POILabels.addTo(map); // add group to map

	const group_strongholds = new L.FeatureGroup(); // create group for markers
	addMarkersToMap($markers.strongholds, group_strongholds); // create markers and add to group
	// group_strongholds.addTo(map); // add group to map

	const group_safes = new L.FeatureGroup(); // create group for markers
	addMarkersToMap($markers.safes, group_safes, true); // create markers and add to group
	// group_strongholds.addTo(map); // add group to map

	const group_Grid = new L.FeatureGroup(); // create group for markers
	group_Grid.addTo(map); // add group to map

	const group_glitch = new L.FeatureGroup(); // create group for markers
	addGlitch($markers.glitch, group_glitch); // create markers and add to group
	group_glitch.addTo(map); // add group to map

	const group_blowTorch = new L.FeatureGroup(); // create group for markers
	addMarkersToMap($markers.blowTorch, group_blowTorch); // create markers and add to group
	// group_blowTorch.addTo(map); // add group to map

	const group_gpu = new L.FeatureGroup(); // create group for markers
	addMarkersToMap($markers.gpu, group_gpu); // create markers and add to group
	// group_blowTorch.addTo(map); // add group to map

	// const group_poiZones = new L.FeatureGroup(); // create group for markers
	// addPOI_Zones(markers_poiZones, group_poiZones, false); // create markers and add to group
	// group_poiZones.addTo(map); // add group to map

	// const group_hospital = new L.FeatureGroup(); // create group for markers
	// addMarkersToMap2($markers.hospital, group_hospital); // create markers and add to group
	// group_hospital.addTo(map); // add group to map

	// const group_police = new L.FeatureGroup(); // create group for markers
	// addMarkersToMap2($markers.police, group_police); // create markers and add to group
	// group_police.addTo(map); // add group to map

	// const group_gasStation = new L.FeatureGroup(); // create group for markers
	// addMarkersToMap2($markers.gasStation, group_gasStation); // create markers and add to group
	// group_gasStation.addTo(map); // add group to map

	const group_userMarkers = new L.FeatureGroup(); // create group for markers
	group_userMarkers.addTo(map); // add group to map

	const group_caveEntrance = new L.FeatureGroup(); // create group for markers
	addMarkersToMap2($markers.caveEntrance, group_caveEntrance); // create markers and add to group
	// group_blowTorch.addTo(map); // add group to map


	// Object with layers
	// let overlayLayers = {
	// 	"Keys <span class='badge dmz'>DMZ</span>": group_keys,
	// 	"Dead drops <span class='badge dmz'>DMZ</span>": group_deadDrops,
	// 	"Players spawn <span class='badge dmz'>DMZ</span>": group_playersSpawn,
	// 	"Exfils <span class='badge dmz'>DMZ</span>": group_exfil,
	// 	"Safes <span class='badge dmz'>DMZ</span>": group_safes,
	// 	"Hidden caches <span class='badge dmz'>DMZ</span><span class='badge br'>BR</span>":
	// 		group_hiddenCache,
	// 	"Strongholds <span class='badge dmz'>DMZ</span><span class='badge br'>BR</span>":
	// 		group_strongholds,
	// 	"Weapon Case <span class='badge dmz'>DMZ</span>":
	// 		group_weaponCases_zones,
	// 	"Radiation Zones <span class='badge dmz'>DMZ</span>":
	// 		group_radiation_zones,
	// 	"Glitches <span class='badge dmz'>DMZ</span><span class='badge br'>BR</span>":
	// 		group_glitch,
	// 	"Blow Torch <span class='badge dmz'>DMZ</span>": group_blowTorch,

	// };

	// let control = L.control.layers(null, null, {
	// 	collapsed: false,
	// }).addTo(map);

	map.on("load", function () {
		if (checkSharePoint() !== undefined) {
			let sharePoint = checkSharePoint();
			// centerLeafletMapOnMarker(map, );
			map.flyTo([sharePoint[0], +sharePoint[1]], 0);
			let marker = L.marker([sharePoint[0], sharePoint[1]], {
				icon: L.divIcon({
					className: "selected-point",
					html: `<div></div>`,
					iconSize: [6, 6], // size of the icon
					iconAnchor: [3, 3],
				}),
			}).addTo(group_userMarkers);
		}

		if (getPointID() !== undefined) {
			let sharePoint = getPointID();
			// map.flyTo([sharePoint[0], +sharePoint[1]], 0);
			group_keys.addTo(map);
			let marker = group_keys.eachLayer((layer) => {
				if (
					layer.getLatLng().lat === sharePoint[0] &&
					layer.getLatLng().lng === sharePoint[1]
				) {
					map.flyTo(layer.getLatLng(), 0);
					layer.openPopup();
				}
			});
		}

		
		window.changeMarkerSize = changeMarkerSize;
		window.changeMarkerOpacity = changeMarkerOpacity;
		
		loadMapControlOptions();
		loadMapSettings();
	});

	// centering a group of markers
	map.on("layeradd layerremove", function () {
		// Create new empty bounds
		let bounds = new L.LatLngBounds();
		// Iterate the map's layers
		map.eachLayer(function (layer) {
			// Check if layer is a featuregroup
			if (layer instanceof L.FeatureGroup) {
				try {
					bounds.extend(layer.getBounds());
				} catch (error) {
					// console.log(error);
				}
			}
		});
		// Check if bounds are valid (could be empty)
		if (bounds.isValid()) {
			// Valid, fit bounds
			// map.flyToBounds(bounds);
		} else {
			// Invalid, fit world
			// map.fitWorld();
		}
	});

	////////////////////////////////////////////////////////////////////////////////
	const control = L.control.prettyControl(null, null, { collapsed: false, });
	control.addTo(map);

	addOverlayToMap(control, group_keys, 'Keys', {dmz: true});
	addOverlayToMap(control, group_deadDrops, 'Dead Drops', {dmz: true, season: 'S02'});
	addOverlayToMap(control, group_playerSpawn, 'Player Spawn', {dmz: true, season: 'S02'});
	addOverlayToMap(control, group_exfil, 'Exfil', {dmz: true, season: 'S02'});
	addOverlayToMap(control, group_safes, 'Safe', {dmz: true});
	addOverlayToMap(control, group_hiddenCache, 'Hidden caches', {dmz: true, br: true});
	addOverlayToMap(control, group_strongholds, 'Strongholds', {dmz: true, br: true});
	addOverlayToMap(control, group_weaponCases_zones, 'Weapon Case', {dmz: true});
	addOverlayToMap(control, group_radiation_zones, 'Radiation Zones', {dmz: true, season: 'S02'});
	addOverlayToMap(control, group_glitch, 'Glitches', {dmz: true, br: true});
	addOverlayToMap(control, group_caveEntrance, 'Cave Entrance', {dmz: true, br: true, season: 'S02'});

	moveControltoSidebar(control, 'header-control');
	////////////////////////////////////////////////////////////////////////////////
	const controlItems = L.control.prettyControl(null, null, { collapsed: false, });
	controlItems.addTo(map);
	
	// Add sliders to sidebar
	addOverlayToMap(controlItems, group_blowTorch, 'Blow Torch', {dmz: true});
	addOverlayToMap(controlItems, group_gpu, 'GPU', {dmz: true});

	moveControltoSidebar(controlItems, 'header-control-items');
	////////////////////////////////////////////////////////////////////////////////
	const controlMapView = L.control.prettyControl(null, null, { collapsed: false, });
	controlMapView.addTo(map);

	// Add sliders to sidebar
	addOverlayToMap(controlMapView, group_Grid, 'Grid lines');
	addOverlayToMap(controlMapView, group_POILabels, 'POI labels');

	moveControltoSidebar(controlMapView, 'header-control-map');
	////////////////////////////////////////////////////////////////////////////////
	// let overlayMapsPlaces = {
	// 	"<img width='16' src='images/icons/places/icon-hospital.svg'><span>Hospital</span>": group_hospital,
	// 	"<img width='16' src='images/icons/places/icon-police.svg'><span>Police</span>": group_police,
	// 	"<img width='16' src='images/icons/places/icon-gas-station.svg'><span>Gas Station</span>": group_gasStation
	// };
	// const controlPlaces = L.control.prettyControl(null, overlayMapsPlaces, { collapsed: false, });
	// controlPlaces.addTo(map);

	// Add sliders to sidebar
	// addOverlayToMap(controlPlaces, group_Grid, 'Grid lines');
	// addOverlayToMap(controlPlaces, group_POILabels, 'POI labels');

	// moveControltoSidebar(controlPlaces, 'overlay-places');

	////////////////////////////////////////////////////////////////////////////////

	// L.control.zoom({
	// 	zoomInText: '++',
	// 	zoomOutText: '--',
	// 	zoomInTitle: 'Zoom in',
	// 	zoomOutTitle: 'Zoom out',
	// 	position: "bottomright", zoomDelta: 0.5
	// }).addTo(map);
	L.control.zoom({ position: "bottomleft" }).addTo(map);

	document.addEventListener("keydown", (e) => {
		if (e.ctrlKey || e.altKey) {
			map.getContainer().style.cursor = "crosshair";
		}
	});
	document.addEventListener("keyup", (e) => {
		map.getContainer().style.cursor = "auto";
	});
	if (isDebug) {
		document.getElementById("debug").classList.add("open");

		function copyCoordinates(e) {
			if (e.originalEvent.ctrlKey) {
				let select = document.getElementById("debug-select");
				if (select.value === "0") return;

				// Get the coordinates of the click event
				var lat = e.latlng.lat;
				var lng = e.latlng.lng;
				// Format the coordinates as a string
				var coordinates = `"lat": "${lat.toFixed(
					2
				)}", "lng": "${lng.toFixed(2)}",`;
				// var coordinates = `${lat},${lng}`;

				var item = document.createElement("div");
				const debugList = document.getElementById("debug-list");
				item.innerHTML = `${selectedSector[0]}${selectedSector[1]} | ${coordinates}`;
				item.classList.add("btn-clipboard");
				let text;

				switch (select.value) {
					case "stronghold": {
						text = `{"name": "Stronghold - ${selectedSector[0]}${
							selectedSector[1]
						}","lat": "${lat.toFixed(2)}", "lng": "${lng.toFixed(
							2
						)}","description": null,"icon": "icon_stronghold"},`;
						break;
					}
					case "hiddencache": {
						text = `{"name": "Hidden Cache - ${selectedSector[0]}${
							selectedSector[1]
						}","lat": "${lat.toFixed(2)}", "lng": "${lng.toFixed(
							2
						)}","description": null,"icon": "icon_hiddenCache"},`;
						break;
					}
					case "key": {
						text = `"lat": "${lat.toFixed(
							4
						)}", "lng": "${lng.toFixed(4)}",`;
						break;
					}
					case "torche": {
						text = `{
								"name": "Blow Torch",
								"lat": "${lat.toFixed(3)}", "lng": "${lng.toFixed(3)}",
								"description": null,
								"icon": "icon_blow_torch",
							},`
						break;
					}
					case "gpu": {
						text = `{
								"name": "GPU",
								"lat": "${lat.toFixed(3)}", "lng": "${lng.toFixed(3)}",
								"description": null,
								"icon": "icon_gpu",
							},`
						break;
					}
				}

				// item.dataset.clipboardText = coordinates;
				item.dataset.clipboardText = text;

				document.getElementById('debug-textarea').value  = document.getElementById('debug-textarea').value + text;
				debugList.prepend(item);
			} else {
				map.getContainer().style.cursor = "auto";
			}
		}

		// Add a click event listener to the map
		map.on("click", copyCoordinates);
	}

	const tiles = 10;
	const tileSize = 800;
	const xTiles = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
	const yTiles = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
	function drawGrid() {
		// Create grid lines
		const lines = drawLines();
		const labels = drawLabels();
	}
	function drawLines() {
		const lines = [];
		const gridStyle = {
			fill: true,
			fillOpacity: 0,
			color: "white",
			opacity: 0.075,
			weight: 2,
		};
		xTiles.forEach((xTile, x) => {
			yTiles.forEach((yTile, y) => {
				// lines.push(
				// 	L.rectangle(
				// 		[
				// 			[tileSize * (tiles - y), tileSize * x],
				// 			[tileSize * (tiles - y - 1), tileSize * (x + 1)],
				// 		],
				// 		gridStyle
				// 	)
				// 		.on("mouseover", (e) => {
				// 			selectedSector = [xTile, yTile];
				// 		})
				// 		.addTo(group_Grid)
				// );
				let rectangle = L.rectangle(
					[
						[tileSize * (tiles - y), tileSize * x],
						[tileSize * (tiles - y - 1), tileSize * (x + 1)],
					],
					gridStyle
				)
					.on("mouseover", (e) => {
						selectedSector = [xTile, yTile];
					})
					.addTo(group_Grid);

				var label = L.marker(
					[
						rectangle.getBounds().getNorthEast().lat,
						rectangle.getBounds().getSouthWest().lng,
					],
					{
						icon: L.divIcon({
							className: "grid-sector-label",
							html: `${xTile}${yTile}`,
							iconSize: [20, 20],
							iconAnchor: [0, 0],
						}),
					}
				).addTo(group_Grid);
			});
		});
		return lines;
	}
	function drawLabels() {
		const labels = [];
		const labelSettings = {
			direction: "center",
			permanent: true,
			className: "grid-section-title",
		};
		xTiles.forEach((xTile, x) => {
			labels.push(
				L.tooltip(labelSettings)
					.setLatLng([
						tileSize * tiles + 100,
						tileSize * x + tileSize / 2,
					])
					.setContent(xTile)
					.addTo(group_Grid)
			);
		});
		yTiles.forEach((yTile, y) => {
			labels.push(
				L.tooltip(labelSettings)
					.setLatLng([
						tileSize * tiles - tileSize * y - tileSize / 2,
						-100,
					])
					.setContent(yTile)
					.addTo(group_Grid)
			);
		});
		return labels;
	}
	drawGrid();

	const container = L.DomUtil.create("div");
	const followMouse = document.createElement("div");
	followMouse.className = "follow-mouse";
	document.body.appendChild(followMouse);

	map.addEventListener("mousemove", (e) => {
		let sector = selectedSector;
		followMouse.textContent = `${sector}`;

		container.innerHTML = `
          <span class="mouse-position">
            <span>
              ${sector?.join("")}
            </span>
          </span>
        `;
	});

	//////////////////////////////////////////////////////
	if (isDebug) {
		let drawnItems = L.featureGroup().addTo(map);

		map.addControl(
			new L.Control.Draw({
				edit: {
					featureGroup: drawnItems,
					poly: {
						allowIntersection: false,
						showArea: true,
					},
				},
				draw: {
					featureGroup: drawnItems,
					polygon: {
						allowIntersection: false,
						showArea: true,
					},
				},
			})
		);
		map.on(L.Draw.Event.CREATED, function (event) {
			let layer = event.layer;

			let feature = (layer.feature = layer.feature || {});
			let type = event.layerType;

			feature.type = feature.type || "Feature";
			let props = (feature.properties = feature.properties || {});

			props.type = type;

			if (type === "circle") {
				props.radius = layer.getRadius();
			}

			drawnItems.addLayer(layer);
			var data = drawnItems.toGeoJSON();
			const data1 = drawnItems.toGeoJSON();
			const array = [];
			data1.features[0].geometry.coordinates[0].forEach((item, indx) => {
				array.push([item[1], item[0]]);
			});
		});
	}

	function centerLeafletMapOnMarker(map, marker) {
		var latLngs = [marker.getLatLng()];
		var markerBounds = L.latLngBounds(latLngs);
		map.fitBounds(markerBounds);
	}

	document.getElementById("auto-search-wrapper").style.display = "block";
	new Autocomplete("multi-layer-serch", {
		getValue: "name",
		list: {
			match: {
				enabled: true,
			},
		},

		onSearch: ({ currentValue }) => {
			let places = []; // array of places

			/**
			 * Get places from geojson and push them to places array
			 */

			group_deadDrops.eachLayer(function (layer) {
				if (layer instanceof L.Marker) {
					layer.options.type = "deaddrop";
					places.push(layer);
				}
			});
			group_keys.eachLayer(function (layer) {
				if (layer instanceof L.Marker) {
					layer.options.type = "key";
					places.push(layer);
				}
			});
			// filter places by currentValue
			let res = places
				.sort((a, b) => {
					a.options.name.localeCompare(b.name);
				})
				.filter(
					(element) =>
						element.options.name.match(
							new RegExp(currentValue, "i")
						) ||
						element.options.sector.match(
							new RegExp(currentValue, "i")
						)
				);

			return res;
		},

		// render the list of places
		onResults: ({ currentValue, matches, template }) => {
			// checking if we have results if we don't
			// take data from the noResults method
			return matches === 0
				? template
				: matches
						.map((element) => {
							return `
						<li class="place">
							<div class="type">${element.options.type}:</div>
						  <div>${element.options.sector.replace(
								new RegExp(currentValue, "i"),
								(str) => `<mark>${str}</mark>`
							)} - ${element.options.name.replace(
								new RegExp(currentValue, "i"),
								(str) => `<mark>${str}</mark>`
							)}</div>
						</li> `;
						})
						.join("");
		},

		// fly to the place and open popup
		onSubmit: ({ object }) => {
			const cord = object.getLatLng();

			// fly to coordinates
			// map.flyTo(cord, 1);

			let sharePoint = [cord.lat, cord.lng];
			// map.flyTo([sharePoint[0], +sharePoint[1]], 0);
			let group;
			switch (object.options.type) {
				case "deaddrop":
					group = group_deadDrops;
					break;
				case "key":
					group = group_keys;
					break;
			}

			group.addTo(map);
			let marker = group.eachLayer((layer) => {
				if (
					layer.getLatLng().lat === sharePoint[0] &&
					layer.getLatLng().lng === sharePoint[1]
				) {
					map.flyTo(layer.getLatLng(), 0);
					layer.openPopup();
				}
			});

			//   find marker in the layer and open it
			//   group_keys.eachLayer(function (layer) {
			// 	if (layer instanceof L.Marker) {
			// 		console.log(layer.id)
			// 		if (layer.id === object.id) {
			// 		  layer.openPopup();
			// 		}
			// 	  }
			//   });
		},

		// no results
		noResults: ({ currentValue, template }) =>
			template(`<li>No results found: "${currentValue}"</li>`),
	});

	// Add an image layer to the map
	L.imageOverlay("images/map/al-mazrah-4000.webp", bounds).addTo(map);
	// L.imageOverlay("images/overview-with-text.jpg", bounds).addTo(map);
	map.fitBounds(bounds);

	if (checkSharePoint() === undefined && getPointID() === undefined)
		map.setView([4000, 4000], -2);



	function changeMarkerSize(sizeName) {
		let size = 0;
		let defaultSize = [];

		switch(sizeName){
			case 'increase':
				size = +4;
			break;
			case 'decrease': 
				size = -4;
			break;
		}

		control._layers.forEach(featureGroup => {
			featureGroup.layer.eachLayer(marker => {
				if(marker.options.icon !== undefined){
					if(marker.options.icon.options.iconUrl !== undefined){
						marker.setIcon(L.icon({
							iconUrl: marker.options.icon.options.iconUrl,
							iconSize: [marker.options.icon.options.iconSize[0] + size, marker.options.icon.options.iconSize[1] + size]
						}));
					}
				}
			})
		})
	}

	function changeMarkerOpacity(opacity) {
		let size = 0;
		let defaultSize = [];

		control._layers.forEach(featureGroup => {
			featureGroup.layer.eachLayer(marker => {
				if(marker.options.icon !== undefined){
					if(marker.options.icon.options.iconUrl !== undefined){
						marker.setOpacity(+opacity);
					}
				}
			})
		})

		controlItems._layers.forEach(featureGroup => {
			featureGroup.layer.eachLayer(marker => {
				if(marker.options.icon !== undefined){
					if(marker.options.icon.options.iconUrl !== undefined){
						marker.setOpacity(+opacity);
					}
				}
			})
		})
	}


	//////////////////////////////////////////////////////////////////////
	map.on("click", (e) => {
		let { lat, lng } = e.latlng;

		group_userMarkers.clearLayers();

		if (e.originalEvent.altKey) {

			function copyToClipboard(text) {
				var textArea = document.createElement("textarea");
				textArea.value = text;
				document.body.appendChild(textArea);
				textArea.select();
				document.execCommand("Copy");
				textArea.remove();
			}
			showNotificationMessage("Link copied to clipboard!");
			copyToClipboard(
				`${window.location.origin}/warzonetacmap/?point=${lat.toFixed(
					3
				)},${lng.toFixed(3)}`
			);
			let marker = L.marker([lat, lng], {
				icon: L.divIcon({
					className: "selected-point",
					html: `<div></div>`,
					iconSize: [6, 6], // size of the icon
					iconAnchor: [3, 3],
				}),
			}).addTo(group_userMarkers);
		} else {
			// let marker = L.marker([lat, lng], {
			// 	icon: L.divIcon({
			// 		className: "selected-point",
			// 		html: `<div></div>`,
			// 		iconSize: [6, 6], // size of the icon
			// 		iconAnchor: [0, 0],
			// 	}),
			// }).bindPopup(
			// 	`<div class="popup-card">
			// 		<div class="title">Share Point</div>
			// 		<div class="description">This is your own marker that you can share with your teammates. Just click copy to copy the link to the clipboard.<br><br>Also, you can press alt+LMB to make it faster.</div>
			// 		<div class="nav">
			// 			<button data-clipboard-text="${window.location.origin}/warzonetacmap/?point=${lat.toFixed(3)},${lng.toFixed(3)}" class="btn-clipboard">Copy</button>
			// 		</div>
			// 	</div>`).addTo(group_userMarkers);
	
			// marker.openPopup();
		}

		if (L.Browser.mobile) {
			let { lat, lng } = e.latlng;

			function copyToClipboard(text) {
				var textArea = document.createElement("textarea");
				textArea.value = text;
				document.body.appendChild(textArea);
				textArea.select();
				document.execCommand("Copy");
				textArea.remove();
			}
			showNotificationMessage("Link copied to clipboard!");
			copyToClipboard(`${window.location.origin}/warzonetacmap/?point=${lat},${lng}`);

			group_userMarkers.clearLayers();

			let marker = L.marker([lat, lng], {
				icon: L.divIcon({
					className: "selected-point",
					html: `<div></div>`,
					iconSize: [6, 6], // size of the icon
					iconAnchor: [3, 3],
				}),
			}).addTo(group_userMarkers);
		}

	});
	//////////////////////////////////////////////////////////////////////

	map.on('overlayadd overlayremove', (e) => {
		saveMapControlOptions();
	})


	//////////////////////////////////////////////////////////////////////
	document.getElementById('remove-all-markers').addEventListener('click', (e) => {
		e.preventDefault();
		const checkbox = document.querySelectorAll(
			".header-section-nav input[type=checkbox]"
		  );
		  // Remove/add all layer from map when click on button
		  [].slice.call(checkbox).map((el) => {
			el.checked = false;
			el.dispatchEvent(new Event('click', { bubbles: true }));
		  });

	})
}


main();

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
			iconUrl: "images/icons/dots/icon-${item}.svg",
			iconSize: [14, 14], // size
			iconAnchor: [7, 7], // center
			popupAnchor: [0, -14], // popup
		});
	})
	return icons;
}

/**
 * Load
 */
function loadMapControlOptions(){
	let mapControlOptions = JSON.parse(localStorage.getItem('mapControlOptions'));
	if (mapControlOptions) {
		document.querySelectorAll('.leaflet-control-layers-selector').forEach((input, indx) => {
				if(mapControlOptions[input.name] !== undefined){
					input.checked = mapControlOptions[input.name];
					input.dispatchEvent(new Event('click'));
				}

		});
	}
}

function saveMapControlOptions(){
	let mapControlOptions = {};
	let control = document.querySelectorAll('.leaflet-control-layers-selector');
	control.forEach((input, indx) => {
		mapControlOptions[input.name] = input.checked;
	})
	localStorage.setItem('mapControlOptions', JSON.stringify(mapControlOptions));
}


function loadMapSettings(){
	let mapSettings = JSON.parse(localStorage.getItem('mapSettings'));
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
function saveMapSettings(){
	let mapSettings = {};
	let inputs = document.querySelectorAll('.map-settings-block input:checked');
	inputs.forEach(input => {
		mapSettings[input.name] = input.value;
	})
	localStorage.setItem('mapSettings', JSON.stringify(mapSettings));
}


document.getElementsByClassName("map-settings-block")[0].addEventListener("change", function(event) {
	if (event.target.matches("input")) {
		saveMapSettings();
	}
});


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