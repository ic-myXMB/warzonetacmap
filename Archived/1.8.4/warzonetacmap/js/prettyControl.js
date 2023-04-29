/**
 * Created: vogdb Date: 4/30/13 Time: 6:07 PM
 */

L.Control.prettyControl = L.Control.Layers.extend({

	initialize(baseLayers, overlays, options) {
		L.Util.setOptions(this, options);

		this._layerControlInputs = [];
		this._layers = [];
		this._lastZIndex = 0;
		this._handlingClick = false;

		for (const i in baseLayers) {
			this._addLayer(baseLayers[i], i);
		}

		for (const i in overlays) {
			this._addLayer(overlays[i], i, i, true);
		}
	},

    // @method addOverlay(layer: Layer, name: String): this
	// Adds an overlay (checkbox entry) with the given name to the control.
	addOverlay(layer, name, aliasName) {
		this._addLayer(layer, name, aliasName, true);
		return (this._map) ? this._update() : this;
	},

    _addLayer(layer, name, aliasName, overlay) {
		if (this._map) {
			layer.on('add remove', this._onLayerChange, this);
		}

		this._layers.push({
			layer,
			name,
            aliasName,
			overlay
		});

		if (this.options.sortLayers) {
			this._layers.sort(((a, b) => this.options.sortFunction(a.layer, b.layer, a.name, b.name)));
		}

		if (this.options.autoZIndex && layer.setZIndex) {
			this._lastZIndex++;
			layer.setZIndex(this._lastZIndex);
		}

		this._expandIfNotCollapsed();
	},

	_addItem(obj) {
		const label = document.createElement('label'),
		      checked = this._map.hasLayer(obj.layer);
		let input;
		if (obj.overlay) {
			input = document.createElement('input');
			input.type = 'checkbox';
			input.className = 'leaflet-control-layers-selector';
			input.defaultChecked = checked;
            input.name = obj.aliasName != undefined ? obj.aliasName.toLowerCase().replace(' ','-') : '';
		} else {
			input = this._createRadioElement(`leaflet-base-layers_${L.Util.stamp(this)}`, checked);
		}

		this._layerControlInputs.push(input);
		input.layerId = L.Util.stamp(obj.layer);

		L.DomEvent.on(input, 'click', this._onInputClick, this);

		const name = document.createElement('span');
		name.innerHTML = ` ${obj.name}`;

		// Helps from preventing layer control flicker when checkboxes are disabled
		// https://github.com/Leaflet/Leaflet/issues/2771
		const holder = document.createElement('div');

		label.appendChild(holder);
		holder.appendChild(input);
		holder.appendChild(name);

		const container = obj.overlay ? this._overlaysList : this._baseLayersList;
		container.appendChild(label);

		this._checkDisabledLayers();
		return label;
	},
  
  })
  
  L.control.prettyControl = function (baseLayers, overlays, options) {
    return new L.Control.prettyControl(baseLayers, overlays, options)
  }