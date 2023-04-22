const mapPath	= window.location.origin + "/warzonetacmap" + "";
const mapName 	= 'almazrah';
const $icon		= [];
const isDebug 	= window.location.href.indexOf("?debug") != -1 ? true : false;

let $markers;

async function main() {

	///////////////////// icons
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
		poiLabels: 'poi_labels',
		hiddenCache: 'hidden_cache',
		deadDrop: 'dead_drop',
		exfil: 'exfil',
		playerSpawn: 'player_spawn',
		stronghold: 'stronghold',
		poiZones: 'markers_poiZones',
		safe: 'safe',
		weaponCase: 'weapon_case',
		radiationZone: 'chemical_zone',
		keys: 'keys',
		// glitch: 'glitch',
		intel: 'intel',
		blowTorch: 'blow_torch',
		gpu: 'gpu',
		hospital: 'hospital',
		police: 'police',
		gasStation: 'gas_station',
		caveEntance: 'cave_entance',
		poiLabels: 'poi_labels',
		uavTower: 'uav_tower',
		helicopter: 'helicopter',
		trophyHunt: 'trophyhunt',
		bossPyro: 'boss-pyro',
		heavyChopperFuel: 'heavy-chopper-gas'
	};
	
	const fetchPromises = Object.entries(markers).map(([key, value]) => {
		const [fileName, subFolderName] = Array.isArray(value) ? value : [value, ""];
		return getJSONData('al-mazrah', fileName, subFolderName).then((data) => [key, data]);
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
	  //div.innerHTML += "<h4>Legend</h4>";
	  div.innerHTML += '<i class="icon" style="background-image: url(images/icons/icon-trophyhunt.svg);background-repeat: no-repeat;"></i><span>Trophy Station</span><br>';	  
	  div.innerHTML += '<i class="icon" style="background-image: url(images/icons/icon-key.svg);background-repeat: no-repeat;"></i><span>Key</span><br>';
	  div.innerHTML += '<i class="icon" style="background-image: url(images/icons/icon-deaddrop_1.svg);background-repeat: no-repeat;"></i><span>Dead Drop</span><br>';
	  div.innerHTML += '<i class="icon" style="background-image: url(images/icons/icon-spawn.svg);background-repeat: no-repeat;"></i><span>Player Spawn</span><br>';
	  div.innerHTML += '<i class="icon" style="background-image: url(images/icons/icon-exfil.svg);background-repeat: no-repeat;"></i><span>Exfil</span><br>';
	  div.innerHTML += '<i class="icon" style="background-image: url(images/icons/icon-safe.svg);background-repeat: no-repeat;"></i><span>Safe</span><br>';
	  div.innerHTML += '<i class="icon" style="background-image: url(images/icons/icon-dot-yellow.svg);background-repeat: no-repeat;"></i><span>Hidden Cache</span><br>';
	  div.innerHTML += '<i class="icon" style="background-image: url(images/icons/icon-stronghold.svg);background-repeat: no-repeat;"></i><span>Strongholds</span><br>';
	  div.innerHTML += '<i class="icon" style="background-image: url(images/icons/icon-weapon-case.svg);background-repeat: no-repeat;"></i><span>Weapon Case</span><br>';
	  div.innerHTML += '<i class="icon" style="background-image: url(images/icons/icon-radiation-zone.svg);background-repeat: no-repeat;"></i><span>Radiation Zone</span><br>';
	  div.innerHTML += '<i class="icon" style="background-image: url(images/icons/icon-cave-entance.svg);background-repeat: no-repeat;"></i><span>Cave Entrance</span><br>';
	  div.innerHTML += '<i class="icon" style="background-image: url(images/icons/icon-uav-tower.svg);background-repeat: no-repeat;"></i><span>UAV Tower</span><br>';
	  div.innerHTML += '<i class="icon" style="background-image: url(images/icons/icon-helicopter.svg);background-repeat: no-repeat;"></i><span>Heavy Chopper</span><br>';
	  div.innerHTML += '<i class="icon" style="background-image: url(images/icons/icon-bossPyro.svg);background-repeat: no-repeat;"></i><span>Boss Pyro</span><br>';
	  div.innerHTML += '<i class="icon" style="background-image: url(images/icons/icon-hospital.svg);background-repeat: no-repeat;"></i><span>Hospital</span><br>';
	  div.innerHTML += '<i class="icon" style="background-image: url(images/icons/icon-police.svg);background-repeat: no-repeat;"></i><span>Police</span><br>';
	  div.innerHTML += '<i class="icon" style="background-image: url(images/icons/icon-gas-station.svg);background-repeat: no-repeat;"></i><span>Gas Station</span><br>';

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
		pointsArray.forEach((point) => {
			const markerOptions = {
				icon: point.alternative_icon ? eval(point.alternative_icon) : eval(point.icon),
				name: point.name,
				sector: point.sector ?? null,
			};
			const marker = L.marker(
				[point.lat, point.lng],
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

	// function addIntels(points, markersGroup, isPopup = true) {
	// 	let markersStore = [];
	// 	var container = document.getElementById("map");

	// 	// add a delegated event listener to the container element
	// 	container.addEventListener("click", function(event) {
	// 		if(event.target.classList.contains('popup-btn')){
	// 			let alias = event.target.dataset.alias;
	// 			map.flyTo(markersStore[alias].getLatLng());
	// 			markersStore[alias].openPopup();
	// 		}
	// 	});
	
	// 	points.forEach((intel, indx) => {
	// 		intel.steps.forEach((step, indx) => {
	// 			let marker = L.marker([step.lat, step.lng], {
	// 				icon: eval(`${intel.icon}`),
	// 			})

	// 			let prev, next;

	// 			if(intel.steps[indx - 1] != undefined) {
	// 				prev = `<button class="popup-btn" data-alias="${intel.alias}-${intel.steps[indx - 1].name.toLowerCase().replace(' ', '-')}">Prev</button>`;
	// 			}

	// 			if(intel.steps[indx + 1] != undefined) {
	// 				next = `<button class="popup-btn" data-alias="${intel.alias}-${intel.steps[indx + 1].name.toLowerCase().replace(' ', '-')}">Next</button>`;
	// 			}

	// 			marker.bindPopup(
	// 				`<div class="">${intel.name} - ${step.name}</div>${prev ? prev : ''}${next ? next : ''}`
	// 			)
			
	// 			markersStore[intel.alias +'-'+ step.name.toLowerCase().replace(' ', '-')] = marker;
	// 			markersGroup.addLayer(marker);
	// 		})
	// 	})
	// }

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
	addMarkersToMap2($markers.hiddenCache, group_hiddenCache); // create markers and add to group
	group_hiddenCache.addTo(map); // add group to map

	const group_deadDrop = new L.FeatureGroup(); // create group for markers
	addMarkersToMap2($markers.deadDrop, group_deadDrop); // create markers and add to group
	// group_deadDrop.addTo(map); // add group to map

	const group_playerSpawn = new L.FeatureGroup(); // create group for markers
	addMarkersToMap2($markers.playerSpawn, group_playerSpawn); // create markers and add to group
	// group_playersSpawn.addTo(map); // add group to map

	const group_exfil = new L.FeatureGroup(); // create group for markers
	addMarkersToMap2($markers.exfil, group_exfil); // create markers and add to group
	// group_exfil.addTo(map); // add group to map

	const group_POILabels = new L.FeatureGroup(); // create group for markers
	addLabels($markers.poiLabels, group_POILabels); // create markers and add to group
	group_POILabels.addTo(map); // add group to map

	const group_stronghold = new L.FeatureGroup(); // create group for markers
	addMarkersToMap2($markers.stronghold, group_stronghold); // create markers and add to group
	// group_stronghold.addTo(map); // add group to map

	const group_safe = new L.FeatureGroup(); // create group for markers
	addMarkersToMap2($markers.safe, group_safe, true); // create markers and add to group
	// group_stronghold.addTo(map); // add group to map

	const group_Grid = new L.FeatureGroup(); // create group for markers
	group_Grid.addTo(map); // add group to map

	// const group_glitch = new L.FeatureGroup(); // create group for markers
	// addGlitch($markers.glitch, group_glitch); // create markers and add to group
	// group_glitch.addTo(map); // add group to map

	const group_blowTorch = new L.FeatureGroup(); // create group for markers
	addMarkersToMap2($markers.blowTorch, group_blowTorch); // create markers and add to group
	// group_blowTorch.addTo(map); // add group to map

	const group_gpu = new L.FeatureGroup(); // create group for markers
	addMarkersToMap2($markers.gpu, group_gpu); // create markers and add to group
	// group_blowTorch.addTo(map); // add group to map

	// const group_poiZones = new L.FeatureGroup(); // create group for markers
	// addPOI_Zones(markers_poiZones, group_poiZones, false); // create markers and add to group
	// group_poiZones.addTo(map); // add group to map

	const group_hospital = new L.FeatureGroup(); // create group for markers
	addMarkersToMap2($markers.hospital, group_hospital); // create markers and add to group
	// group_hospital.addTo(map); // add group to map

	const group_police = new L.FeatureGroup(); // create group for markers
	addMarkersToMap2($markers.police, group_police); // create markers and add to group
	// group_police.addTo(map); // add group to map

	const group_gasStation = new L.FeatureGroup(); // create group for markers
	addMarkersToMap2($markers.gasStation, group_gasStation); // create markers and add to group
	// group_gasStation.addTo(map); // add group to map

	const group_userMarkers = new L.FeatureGroup(); // create group for markers
	group_userMarkers.addTo(map); // add group to map

	const group_caveEntance = new L.FeatureGroup(); // create group for markers
	addMarkersToMap2($markers.caveEntance, group_caveEntance); // create markers and add to group
	// group_blowTorch.addTo(map); // add group to map

	const group_uavTower = new L.FeatureGroup(); // create group for markers
	addCircle2($markers.uavTower, group_uavTower); // create markers and add to group
	group_uavTower.addTo(map); // add group to map

	const group_helicopter = new L.FeatureGroup(); // create group for markers
	addMarkersToMap2($markers.helicopter, group_helicopter); // create markers and add to group
	group_helicopter.addTo(map); // add group to map
	
	const group_trophyHunt = new L.FeatureGroup(); // create group for markers
	addMarkersToMap2($markers.trophyHunt, group_trophyHunt); // create markers and add to group
	group_trophyHunt.addTo(map); // ad

	const group_bossPyro = new L.FeatureGroup(); // create group for markers
	addMarkersToMap2($markers.bossPyro, group_bossPyro); // create markers and add to group
	// group_bossPyro.addTo(map); // ad


	const group_heavyChopperFuel = new L.FeatureGroup();
	addFigure($markers.heavyChopperFuel, group_heavyChopperFuel); 
	group_heavyChopperFuel.addTo(map); 

	// Object with layers
	// let overlayLayers = {
	// 	"Keys <span class='badge dmz'>DMZ</span>": group_keys,
	// 	"Dead drops <span class='badge dmz'>DMZ</span>": group_deadDrop,
	// 	"Players spawn <span class='badge dmz'>DMZ</span>": group_playersSpawn,
	// 	"Exfils <span class='badge dmz'>DMZ</span>": group_exfil,
	// 	"safe <span class='badge dmz'>DMZ</span>": group_safe,
	// 	"Hidden caches <span class='badge dmz'>DMZ</span><span class='badge br'>BR</span>":
	// 		group_hiddenCache,
	// 	"stronghold <span class='badge dmz'>DMZ</span><span class='badge br'>BR</span>":
	// 		group_stronghold,
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
		
		loadMapControlOptions("al-mazrah");
		loadMapSettings("al-mazrah");
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
	addOverlayToMap(control, group_deadDrop, 'Dead Drops', {dmz: true});
	addOverlayToMap(control, group_playerSpawn, 'Player Spawn', {dmz: true, season: 'S03'});
	addOverlayToMap(control, group_exfil, 'Exfil', {dmz: true, season: 'S03'});
	addOverlayToMap(control, group_safe, 'Safe', {dmz: true});
	addOverlayToMap(control, group_hiddenCache, 'Hidden caches', {dmz: true, br: true});
	addOverlayToMap(control, group_stronghold, 'Stronghold', {dmz: true, br: true});
	addOverlayToMap(control, group_weaponCases_zones, 'Weapon Case', {dmz: true});
	addOverlayToMap(control, group_radiation_zones, 'Radiation Zones', {dmz: true});
	// addOverlayToMap(control, group_glitch, 'Glitches', {dmz: true, br: true});
	addOverlayToMap(control, group_caveEntance, 'Cave Entrance', {dmz: true, br: true});
	addOverlayToMap(control, group_uavTower, 'UAV Towers', {dmz: true});
	addOverlayToMap(control, group_helicopter, 'Heavy Chopper', {dmz: true});
	addOverlayToMap(control, group_bossPyro, 'Boss Pyro', {dmz: true});

	moveControltoSidebar(control, 'header-control');
	////////////////////////////////////////////////////////////////////////////////
	const controlEvents = L.control.prettyControl(null, null, { collapsed: false, });
	controlEvents.addTo(map);
	
	// // Add sliders to sidebar
	addOverlayToMap(controlEvents, group_trophyHunt, 'Trophy Upload Station', {dmz: true, br: true});
	// addOverlayToMap(controlItems, group_gpu, 'GPU', {dmz: true});

	moveControltoSidebar(controlEvents, 'header-control-events');
	////////////////////////////////////////////////////////////////////////////////
	const controlItems = L.control.prettyControl(null, null, { collapsed: false, });
	controlItems.addTo(map);
	
	// Add sliders to sidebar
	// addOverlayToMap(controlItems, group_blowTorch, 'Blow Torch', {dmz: true});
	// addOverlayToMap(controlItems, group_gpu, 'GPU', {dmz: true});
	addOverlayToMap(controlItems, group_heavyChopperFuel, 'Heavy Chopper Fuel', {dmz: true, newIn: true});

	moveControltoSidebar(controlItems, 'header-control-items');
	////////////////////////////////////////////////////////////////////////////////
    const controlBuildings = L.control.prettyControl(null, null, { collapsed: false, });
	controlBuildings.addTo(map);
	
	// Add sliders to sidebar
	addOverlayToMap(controlBuildings, group_hospital, 'Hospital', {});
    addOverlayToMap(controlBuildings, group_police, 'Police', {});
    addOverlayToMap(controlBuildings, group_gasStation, 'Gas station', {});
	// addOverlayToMap(controlBuildings, group_gpu, 'GPU', {dmz: true});

	moveControltoSidebar(controlBuildings, 'header-control-buildings');
	////////////////////////////////////////////////////////////////////////////////
	const controlMapView = L.control.prettyControl(null, null, { collapsed: false, });
	controlMapView.addTo(map);

	// Add sliders to sidebar
	addOverlayToMap(controlMapView, group_Grid, 'Grid lines');
	addOverlayToMap(controlMapView, group_POILabels, 'POI labels');

	moveControltoSidebar(controlMapView, 'header-control-map');
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
				copyToClipboard(
					// `"lat": "${lat.toFixed(3)}", "lng": "${lng.toFixed(3)}"`
					`${lat.toFixed(3)}, ${lng.toFixed(3)}`
				);
				let marker = L.marker([lat, lng], {
					icon: L.divIcon({
						className: "selected-point",
						html: `<div></div>`,
						iconSize: [6, 6], // size of the icon
						iconAnchor: [3, 3],
					}),
				}).addTo(group_userMarkers);
			} 
			// if (e.originalEvent.ctrlKey) {
			// 	let select = document.getElementById("debug-select");
			// 	if (select.value === "0") return;

			// 	// Get the coordinates of the click event
			// 	var lat = e.latlng.lat;
			// 	var lng = e.latlng.lng;
			// 	// Format the coordinates as a string
			// 	var coordinates = `"lat": "${lat.toFixed(
			// 		2
			// 	)}", "lng": "${lng.toFixed(2)}",`;
			// 	// var coordinates = `${lat},${lng}`;

			// 	var item = document.createElement("div");
			// 	const debugList = document.getElementById("debug-list");
			// 	item.innerHTML = `${selectedSector[0]}${selectedSector[1]} | ${coordinates}`;
			// 	item.classList.add("btn-clipboard");
			// 	let text;

			// 	switch (select.value) {
			// 		case "stronghold": {
			// 			text = `{"name": "Stronghold - ${selectedSector[0]}${
			// 				selectedSector[1]
			// 			}","lat": "${lat.toFixed(2)}", "lng": "${lng.toFixed(
			// 				2
			// 			)}","description": null,"icon": "icon_stronghold"},`;
			// 			break;
			// 		}
			// 		case "hiddencache": {
			// 			text = `{"name": "Hidden Cache - ${selectedSector[0]}${
			// 				selectedSector[1]
			// 			}","lat": "${lat.toFixed(2)}", "lng": "${lng.toFixed(
			// 				2
			// 			)}","description": null,"icon": "icon_hiddenCache"},`;
			// 			break;
			// 		}
			// 		case "key": {
			// 			text = `"lat": "${lat.toFixed(
			// 				4
			// 			)}", "lng": "${lng.toFixed(4)}",`;
			// 			break;
			// 		}
			// 		case "torche": {
			// 			text = `{
			// 					"name": "Blow Torch",
			// 					"lat": "${lat.toFixed(3)}", "lng": "${lng.toFixed(3)}",
			// 					"description": null,
			// 					"icon": "icon_blow_torch",
			// 				},`
			// 			break;
			// 		}
			// 		case "gpu": {
			// 			text = `{
			// 					"name": "GPU",
			// 					"lat": "${lat.toFixed(3)}", "lng": "${lng.toFixed(3)}",
			// 					"description": null,
			// 					"icon": "icon_gpu",
			// 				},`
			// 			break;
			// 		}
			// 	}

			// 	// item.dataset.clipboardText = coordinates;
			// 	item.dataset.clipboardText = text;

			// 	document.getElementById('debug-textarea').value  = document.getElementById('debug-textarea').value + text;
			// 	debugList.prepend(item);
			// } else {
			// 	map.getContainer().style.cursor = "auto";
			// }
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
					group = group_deadDrop;
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
	L.imageOverlay("images/map/al-mazrah-map-4000-S02.jpg", bounds).addTo(map);
	// L.imageOverlay("../images/overview-with-text.jpg", bounds).addTo(map);
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
		saveMapControlOptions("al-mazrah");
	})


	//////////////////////////////////////////////////////////////////////
	document.getElementById('remove-all-markers').addEventListener('click', (e) => {
		e.preventDefault();
		const checkbox = document.querySelectorAll(
			".header-section-nav input[type=checkbox], .sidebar-layers-content input[type=checkbox]"
		  );
		  // Remove/add all layer from map when click on button
		  [].slice.call(checkbox).map((el) => {
			el.checked = false;
			el.dispatchEvent(new Event('click', { bubbles: true }));
		  });

	})
}


main();

document
	.getElementsByClassName("map-settings-block")[0]
	.addEventListener("change", function (event) {
		if (event.target.matches("input")) {
			saveMapSettings("al-mazrah");
		}
	});
