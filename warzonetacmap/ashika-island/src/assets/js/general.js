const mapName 	= 'ashika-island';
const $icon		= [];
const isDebug 	= window.location.href.indexOf("?debug") != -1 ? true : false;
const mapPath = window.location.origin + "/warzonetacmap/" + "ashika-island";

let $markers;

async function main() {

	///////////////////// icons
	// const $icon = [];

	const iconArray = [
		{name: "dot", fileName: "icon-dot", iconSize: [14, 14], iconAnchor: [7, 7], popupAnchor: [0, -14]},
		{name: "dot_yellow", fileName: "icon-dot-yellow", iconSize: [14, 14], iconAnchor: [7, 7], popupAnchor: [0, -14]},
		{name: "dot_blue", fileName: "icon-dot-blue", iconSize: [14, 14], iconAnchor: [7, 7], popupAnchor: [0, -14]},
		{name: "dot_green", fileName: "icon-dot-green", iconSize: [14, 14], iconAnchor: [7, 7], popupAnchor: [0, -14]},
		{name: "mission", fileName: "icon-mission", iconSize: [14, 14], iconAnchor: [7, 7], popupAnchor: [0, -14]},

		{name: "key", fileName: "icon-key", iconSize: [20, 20], iconAnchor: [10, 10], popupAnchor: [0, -20]},
		{name: "key_green", fileName: "icon-key-green", iconSize: [20, 20], iconAnchor: [10, 10], popupAnchor: [0, -20]},
		{name: "key_orange", fileName: "icon-key-orange", iconSize: [20, 20], iconAnchor: [10, 10], popupAnchor: [0, -20]},
		{name: "hidden_cache", fileName: "icon-dot-yellow", iconSize: [12, 12],iconAnchor: [6, 6],popupAnchor: [0, -10]},
		{name: "spawn", fileName: "icon-spawn", iconAnchor: [15, 30], opupAnchor: [0, -30]},
		{name: "dead_drop", fileName: "icon-deaddrop_1", iconAnchor: [15, 30], opupAnchor: [0, -30]},
		{name: "exfil", fileName: "icon-exfil", iconSize: [26, 26], iconAnchor: [23, 23], popupAnchor: [0, -26]},
		{name: "exfil_last", fileName: "icon-exfil-last", iconSize: [26, 26], iconAnchor: [23, 23], popupAnchor: [0, -26]},
        {name: "exfil_both", fileName: "icon-exfil-both", iconSize: [26, 26], iconAnchor: [23, 23], popupAnchor: [0, -26]},
		{name: "safe", fileName: "icon-safe", iconSize: [18, 18], iconAnchor: [6, 6],popupAnchor: [0, -18]},
		{name: "game_machine", fileName: "icon-game-machine", iconAnchor: [15, 30], opupAnchor: [0, -30]},
		{name: "gpu", fileName: "dots/icon-dot-orange", iconSize: [10, 10], iconAnchor: [5, 5], popupAnchor: [0, -10]},
		{name: "weapon_case", fileName: "icon-weapon-case"},
		{name: "radiation_zone", fileName: "icon-radiation-zone"},
		{name: "easterEgg", fileName: "icon-easter-egg"},
		{name: "mask", fileName: "icon-mask"},
		{name: "mask_green", fileName: "icon-mask-green"},
		{name: "mask_red", fileName: "icon-mask-red"},
		{name: "radio", fileName: "icon-radio"},
		{name: "radio_start", fileName: "icon-radio-start"}, // TODO remove
		{name: "cave_entance", fileName: "icon-cave-entance", iconSize: [24, 24], iconAnchor: [12, 12], popupAnchor: [0, -24]},
		{name: "blow_torch", fileName: "dots/icon-dot-yellow-light", iconSize: [10, 10], iconAnchor: [5, 5], popupAnchor: [0, -10]},
		{name: "zipline", fileName: "icon-zipline"},
		{name: "zipline_down", fileName: "icon-zipline-down"},

        {name: "hospital", fileName: "icon-hospital", iconSize: [24, 24], iconAnchor: [12, 12], popupAnchor: [0, -24]},
        {name: "gas_station", fileName: "icon-gas-station", iconSize: [24, 24], iconAnchor: [12, 12], popupAnchor: [0, -24]},
        {name: "police", fileName: "icon-police", iconSize: [24, 24], iconAnchor: [12, 12], popupAnchor: [0, -24]},
        {name: "stronghold", fileName: "icon-stronghold"},
		{name: "uav_tower", fileName: "icon-uav-tower", iconSize: [26, 26], iconAnchor: [13, 13],popupAnchor: [0, -26]},
		{name: "helicopter", fileName: "icon-helicopter", iconSize: [30, 30], iconAnchor: [15, 15],popupAnchor: [0, -30]},
		{name: "trophyHunt", fileName: "icon-trophyhunt", iconSize: [30, 30], iconAnchor: [15, 15],popupAnchor: [0, -30]},
		{name: "bossPyro", fileName: "icon-bossPyro", iconSize: [30, 30], iconAnchor: [15, 15],popupAnchor: [0, -30]},
	]

	iconArray.forEach(item => $icon[item.name] = _createCustomIcon(item))
	//////////////////// icons end

	const markers = {
		hiddenCache: "hidden_cache",
		deadDrop: "dead_drop",
		poiLabels: "poi_labels",
		playerSpawn: "player_spawn",
		exfil: "exfil",
		gameMachine: "game_machine",
		safe: "safe",
		gpu: "gpu",
		chemicalZone: "chemical_zone",
		weaponCase: "weapon_case",
		downhill: "downhills",
		easterEgg: 'easter-egg',
		blowTorch: 'blow_torch',
		keys: 'keys',
		uavTower: 'uav_tower',
		trophyHunt: 'trophyhunt',
	};

	const fetchPromises = Object.entries(markers).map(([key, value]) => {
		const [fileName, subFolderName] = Array.isArray(value) ? value : [value, ""];
		return getJSONData('ashika-island', fileName, subFolderName).then((data) => [key, data]);
	});
	$markers = Object.fromEntries(await Promise.all(fetchPromises));

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

      div.setAttribute('id', 'legend');
      div.setAttribute('class', 'legend legend-content');
      div.setAttribute('style', 'height: 180px; width: 114px;');

	  div.innerHTML += "<h4>Legend</h4>";
	  div.innerHTML += '<i class="icon" style="background-image: url(../images/icons/icon-trophyhunt.svg);background-repeat: no-repeat;"></i><span>Trophy Station</span><br>';	  
	  div.innerHTML += '<i class="icon" style="background-image: url(../images/icons/icon-key.svg);background-repeat: no-repeat;"></i><span>Key</span><br>';	  
	  div.innerHTML += '<i class="icon" style="background-image: url(../images/icons/icon-dot-yellow.svg);background-repeat: no-repeat;"></i><span>Hidden Cache</span><br>';
	  div.innerHTML += '<i class="icon" style="background-image: url(../images/icons/icon-spawn.svg);background-repeat: no-repeat;"></i><span>Player Spawn</span><br>';
	  div.innerHTML += '<i class="icon" style="background-image: url(../images/icons/icon-deaddrop_1.svg);background-repeat: no-repeat;"></i><span>Dead Drop</span><br>';
	  div.innerHTML += '<i class="icon" style="background-image: url(../images/icons/icon-exfil.svg);background-repeat: no-repeat;"></i><span>Exfil</span><br>';
	  div.innerHTML += '<i class="icon" style="background-image: url(../images/icons/icon-safe.svg);background-repeat: no-repeat;"></i><span>Safe</span><br>';	  	  
	  div.innerHTML += '<i class="icon" style="background-image: url(../images/icons/icon-game-machine.svg);background-repeat: no-repeat;"></i><span>Game Machine</span><br>';
	  div.innerHTML += '<i class="icon" style="background-image: url(../images/icons/icon-radiation-zone.svg);background-repeat: no-repeat;"></i><span>Radiation Zone</span><br>';
	  div.innerHTML += '<i class="icon" style="background-image: url(../images/icons/icon-weapon-case.svg);background-repeat: no-repeat;"></i><span>Weapon Case</span><br>';
	  div.innerHTML += '<i class="icon" style="background-image: url(../images/icons/icon-zipline.svg);background-repeat: no-repeat;"></i><span>Downhills & Caves</span><br>';
	  div.innerHTML += '<i class="icon" style="background-image: url(../images/icons/icon-uav-tower.svg);background-repeat: no-repeat;"></i><span>UAV Tower</span><br>';	  
	  div.innerHTML += '<i class="icon" style="background-image: url(../images/icons/icon-easter-egg.svg);background-repeat: no-repeat;"></i><span>Easter Egg</span><br>';
	  div.innerHTML += '<i class="icon" style="background-image: url(../images/icons/icon-radio.svg);background-repeat: no-repeat;"></i><span>Mystery Radio</span><br>';
	  div.innerHTML += '<i class="icon" style="background-image: url(../images/icons/icon-mask.svg);background-repeat: no-repeat;"></i><span>Mystery Item</span><br>';
	  
	  return div;

	};

	legend.addTo(map);
	
	//////////////////////////////////////////////////////////////////////
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


	const group_hiddenCache = new L.FeatureGroup(); // create group for markers
	addMarkersToMap2($markers.hiddenCache, group_hiddenCache); // create markers and add to group
	group_hiddenCache.addTo(map); // add group to map

	const group_playerSpawn = new L.FeatureGroup(); // create group for markers
	addMarkersToMap2($markers.playerSpawn, group_playerSpawn); // create markers and add to group
	// group_playerSpawn.addTo(map); // add group to map

	const group_downhill = new L.FeatureGroup(); // create group for markers
	addMarkersToMap2($markers.downhill[0], group_downhill); // create markers and add to group
	// group_playerSpawn.addTo(map); // add group to map

	addLines($markers.downhill[1], group_downhill); // create markers and add to group
	// group_playerSpawn.addTo(map); // add group to map

	const group_keys = new L.FeatureGroup(); // create group for markers
	addKeys($markers.keys, group_keys); // create markers and add to group
	// group_playerSpawn.addTo(map); // add group to map

	const group_blowTorch = new L.FeatureGroup(); // create group for markers
	addMarkersToMap2($markers.blowTorch, group_blowTorch); // create markers and add to group
	// group_playerSpawn.addTo(map); // add group to map

	const group_deadDrop = new L.FeatureGroup(); // create group for markers
	addMarkersToMap2($markers.deadDrop, group_deadDrop); // create markers and add to group
	// group_deadDrop.addTo(map); // add group to map

	const group_exfil = new L.FeatureGroup(); // create group for markers
	addMarkersToMap2($markers.exfil, group_exfil); // create markers and add to group
	// group_deadDrop.addTo(map); // add group to map

	const group_safe = new L.FeatureGroup(); // create group for markers
	addMarkersToMap2($markers.safe, group_safe); // create markers and add to group
	// group_deadDrop.addTo(map); // add group to map

	const group_gameMachine = new L.FeatureGroup(); // create group for markers
	addMarkersToMap2($markers.gameMachine, group_gameMachine); // create markers and add to group
	// group_deadDrop.addTo(map); // add group to map

	const group_chemicalZone = new L.FeatureGroup(); // create group for markers
	addCircle($markers.chemicalZone, group_chemicalZone); // create markers and add to group
	// group_deadDrop.addTo(map); // add group to map

	const group_weaponCase = new L.FeatureGroup(); // create group for markers
	addCircle($markers.weaponCase, group_weaponCase); // create markers and add to group
	// group_deadDrop.addTo(map); // add group to map

	const group_gpu = new L.FeatureGroup(); // create group for markers
	addMarkersToMap2($markers.gpu, group_gpu); // create markers and add to group
	// group_deadDrop.addTo(map); // add group to map

	const group_Grid = new L.FeatureGroup(); // create group for markers
	group_Grid.addTo(map); // add group to map

	const group_POILabels = new L.FeatureGroup(); // create group for markers
	addLabels($markers.poiLabels, group_POILabels); // create markers and add to group
	group_POILabels.addTo(map); // add

	const group_userMarkers = new L.FeatureGroup(); // create group for markers
	group_userMarkers.addTo(map); // add group to map

	const group_uavTower = new L.FeatureGroup(); // create group for markers
	addCircle2($markers.uavTower, group_uavTower); // create markers and add to group
	group_uavTower.addTo(map); // add group to map

	const group_trophyHunt = new L.FeatureGroup(); // create group for markers
	addMarkersToMap2($markers.trophyHunt, group_trophyHunt); // create markers and add to group
	group_trophyHunt.addTo(map); // ad

	////////////////////////////////////////////////////////////////////////////////
	const easterEggLayers = L.control.prettyControl(null, null, { collapsed: false });
	easterEggLayers.addTo(map);
	

	addEasterEggtoMap($markers.easterEgg, easterEggLayers); // create markers and add to group

	moveControltoSidebar(easterEggLayers, "header-control-easteregglayers");
	////////////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////
	
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
			// group_hiddenCache.addTo(map);

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

		loadMapControlOptions("ashikaIsland");
		loadMapSettings("ashikaIsland");
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
	const control = L.control.prettyControl(null, null, { collapsed: false });
	control.addTo(map);

	addOverlayToMap(control, group_keys, "Keys", {
		dmz: true,
	});
	addOverlayToMap(control, group_hiddenCache, "Hidden caches", {
		dmz: true,
		br: true,
	});
	addOverlayToMap(control, group_playerSpawn, "Player Spawn", {
		dmz: true, season: 'S03'
	});
	addOverlayToMap(control, group_deadDrop, "Dead Drop", { dmz: true });
	addOverlayToMap(control, group_exfil, "Exfil", { dmz: true, season: 'S03' });
	addOverlayToMap(control, group_safe, "Safe", { dmz: true });
	addOverlayToMap(control, group_gameMachine, "Game Machine", { br: true });
	addOverlayToMap(control, group_chemicalZone, "Radiation Zone", {
		dmz: true,
	});
	addOverlayToMap(control, group_weaponCase, "Weapon Case", { dmz: true });
	addOverlayToMap(control, group_downhill, "Downhills & Caves", {
		dmz: true,
		br: true,
	});
	addOverlayToMap(control, group_uavTower, 'UAV Towers', {dmz: true, newIn: true});

	moveControltoSidebar(control, "header-control");
	////////////////////////////////////////////////////////////////////////////////
	const controlEvents = L.control.prettyControl(null, null, { collapsed: false, });
	controlEvents.addTo(map);
	
	// // Add sliders to sidebar
	addOverlayToMap(controlEvents, group_trophyHunt, 'Trophy Upload Station', {dmz: true, br: true});
	// addOverlayToMap(controlItems, group_gpu, 'GPU', {dmz: true});

	moveControltoSidebar(controlEvents, 'header-control-events');
	////////////////////////////////////////////////////////////////////////////////
	// const easterEggLayers = L.control.prettyControl(null, null, { collapsed: false });
	// easterEggLayers.addTo(map);

	// console.log(group_easterEgg)
	// addOverlayToMap(easterEggLayers, group_easterEgg, "Easter Egg", {br: true});

	// moveControltoSidebar(easterEggLayers, "header-control-easteregglayers");
	////////////////////////////////////////////////////////////////////////////////

	const controlItems = L.control.prettyControl(null, null, {
		collapsed: false,
	});
	// controlItems.addTo(map);

	// // Add sliders to sidebar
	// // addOverlayToMap(controlItems, group_blowTorch, 'Blow Torch', {dmz: true});
	// addOverlayToMap(controlItems, group_gpu, "GPU", { dmz: true });

	// moveControltoSidebar(controlItems, "header-control-items");
	////////////////////////////////////////////////////////////////////////////////
	const controlMapView = L.control.prettyControl(null, null, {
		collapsed: false,
	});
	controlMapView.addTo(map);

	// Add sliders to sidebar
	addOverlayToMap(controlMapView, group_Grid, "Grid lines");
	addOverlayToMap(controlMapView, group_POILabels, "POI labels");

	moveControltoSidebar(controlMapView, "header-control-map");
	////////////////////////////////////////////////////////////////////////////////
	// let overlayMapsPlaces = {
	// 	"<img width='16' src='../images/icons/places/icon-hospital.svg'><span>Hospital</span>": group_hospital,
	// 	"<img width='16' src='../images/icons/places/icon-police.svg'><span>Police</span>": group_police,
	// 	"<img width='16' src='../images/icons/places/icon-gas-station.svg'><span>Gas Station</span>": group_gasStation
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
	L.control.zoom({ position: "topright" }).addTo(map);

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
				var coordinates = `"lat": "${lat.toFixed(2)}", "lng": "${lng.toFixed(
					2
				)}",`;
				// var coordinates = `${lat},${lng}`;

				var item = document.createElement("div");
				const debugList = document.getElementById("debug-list");
				item.innerHTML = `${selectedSector[0]}${selectedSector[1]} | ${coordinates}`;
				item.classList.add("btn-clipboard");
				let text;

				switch (select.value) {
					case "stronghold": {
						text = `{"name": "Stronghold - ${selectedSector[0]}${selectedSector[1]
							}","lat": "${lat.toFixed(2)}", "lng": "${lng.toFixed(
								2
							)}","description": null,"icon": "icon_stronghold"},`;
						break;
					}
					case "hiddencache": {
						text = `{"name": "Hidden Cache - ${selectedSector[0]}${selectedSector[1]
							}","lat": "${lat.toFixed(2)}", "lng": "${lng.toFixed(
								2
							)}","description": null,"icon": "icon_hiddenCache"},`;
						break;
					}
					case "key": {
						text = `"lat": "${lat.toFixed(4)}", "lng": "${lng.toFixed(4)}",`;
						break;
					}
					case "torche": {
						text = `{
								"name": "Blow Torch",
								"lat": "${lat.toFixed(3)}", "lng": "${lng.toFixed(3)}",
								"description": null,
								"icon": "icon_blow_torch",
							},`;
						break;
					}
					case "gpu": {
						text = `{
								"name": "GPU",
								"lat": "${lat.toFixed(3)}", "lng": "${lng.toFixed(3)}",
								"description": null,
								"icon": "icon_gpu",
							},`;
						break;
					}
				}

				// item.dataset.clipboardText = coordinates;
				item.dataset.clipboardText = text;

				document.getElementById("debug-textarea").value =
					document.getElementById("debug-textarea").value + text;
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
					.setLatLng([tileSize * tiles + 100, tileSize * x + tileSize / 2])
					.setContent(xTile)
					.addTo(group_Grid)
			);
		});
		yTiles.forEach((yTile, y) => {
			labels.push(
				L.tooltip(labelSettings)
					.setLatLng([tileSize * tiles - tileSize * y - tileSize / 2, -100])
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

			group_deadDrop.eachLayer(function (layer) {
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
						element.options.name.match(new RegExp(currentValue, "i")) ||
						element.options.sector.match(new RegExp(currentValue, "i"))
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
	L.imageOverlay(
		`${mapPath}/src/assets/images/map/ashika-island-4000.jpg`,
		bounds
	).addTo(map);
	// L.imageOverlay("../images/overview-with-text.jpg", bounds).addTo(map);
	map.fitBounds(bounds);

	if (checkSharePoint() === undefined && getPointID() === undefined)
		map.setView([4000, 4000], -2);

	function changeMarkerSize(sizeName) {
		let size = 0;
		let defaultSize = [];

		switch (sizeName) {
			case "increase":
				size = +4;
				break;
			case "decrease":
				size = -4;
				break;
		}

		control._layers.forEach((featureGroup) => {
			featureGroup.layer.eachLayer((marker) => {
				if (marker.options.icon !== undefined) {
					if (marker.options.icon.options.iconUrl !== undefined) {
						marker.setIcon(
							L.icon({
								iconUrl: marker.options.icon.options.iconUrl,
								iconSize: [
									marker.options.icon.options.iconSize[0] + size,
									marker.options.icon.options.iconSize[1] + size,
								],
							})
						);
					}
				}
			});
		});
	}

	function changeMarkerOpacity(opacity) {
		let size = 0;
		let defaultSize = [];

		control._layers.forEach((featureGroup) => {
			featureGroup.layer.eachLayer((marker) => {
				if (marker.options.icon !== undefined) {
					if (marker.options.icon.options.iconUrl !== undefined) {
						marker.setOpacity(+opacity);
					}
				}
			});
		});

		easterEggLayers._layers.forEach((featureGroup) => {
			featureGroup.layer.eachLayer((marker) => {
				if (marker.options.icon !== undefined) {
					if (marker.options.icon.options.iconUrl !== undefined) {
						marker.setOpacity(+opacity);
					}
				}
			});
		});

		controlItems._layers.forEach((featureGroup) => {
			featureGroup.layer.eachLayer((marker) => {
				if (marker.options.icon !== undefined) {
					if (marker.options.icon.options.iconUrl !== undefined) {
						marker.setOpacity(+opacity);
					}
				}
			});
		});
	}

	//////////////////////////////////////////////////////////////////////
	map.on("click", (e) => {
		let { lat, lng } = e.latlng;

		group_userMarkers.clearLayers();

		if (e.originalEvent.ctrlKey) {
			function copyToClipboard(text) {
				var textArea = document.createElement("textarea");
				textArea.value = text;
				document.body.appendChild(textArea);
				textArea.select();
				document.execCommand("Copy");
				textArea.remove();
			}
			showNotificationMessage("Link copied to clipboard!");
			copyToClipboard(`"lat": "${lat.toFixed(3)}", "lng":"${lng.toFixed(3)}"`);
		}

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
			copyToClipboard(`${mapPath}?point=${lat.toFixed(3)},${lng.toFixed(3)}`);
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
			// 			<button data-clipboard-text="${window.location.origin}/warzonetacmap/ashika-island/?point=${lat.toFixed(3)},${lng.toFixed(3)}" class="btn-clipboard">Copy</button>
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
			copyToClipboard(`${window.location.origin}/warzonetacmap/ashika-island/?point=${lat},${lng}`);

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
	map.on("overlayadd overlayremove", (e) => {
		saveMapControlOptions("ashikaIsland");
	});
	//////////////////////////////////////////////////////////////////////
	document
		.getElementById("remove-all-markers")
		.addEventListener("click", (e) => {
			e.preventDefault();
			const checkbox = document.querySelectorAll(
				".header-section-nav input[type=checkbox], .sidebar-layers-content input[type=checkbox]"
			);
			// Remove/add all layer from map when click on button
			[].slice.call(checkbox).map((el) => {
				el.checked = false;
				el.dispatchEvent(new Event("click", { bubbles: true }));
			});
		});

}

main();

document
	.getElementsByClassName("map-settings-block")[0]
	.addEventListener("change", function (event) {
		if (event.target.matches("input")) {
			saveMapSettings("ashikaIsland");
		}
	});
