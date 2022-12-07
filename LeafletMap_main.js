var that = this;

var getScriptPromisify = (src) => {
  return new Promise(resolve => {
    $.getScript(src, resolve)
  })
}

function buttonDetails(e) {
		console.log("openDetails außen ("+e+")");
	  var event = new Event("onClick");
	  that.dispatchEvent(event);

}

(function () {
  const prepared = document.createElement('template')
  prepared.innerHTML = `
      <style>
		#map {
			height: 100%;
			width: 100vw;
		}
      </style>
	<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.1/dist/leaflet.css" integrity="sha256-sA+zWATbFveLLNqWO2gtiw3HL/lh1giY/Inf1BJ0z14=" crossorigin=""/>
	<script>
		function buttonDetails(inDetails) {
			alert("buttonDetails pressed at "+inDetails);
		}
		
	</script>	
      <div id="root" style="width: 100%; height: 100%;">
		<div id="map"></div>
      </div>
    `
	
	//var that = this;
	
	var theMap, map;//, lidlIcon;
	
	// Url to the data json:
	//var url = 'https://haraldamueller.github.io/Leafletmap/testdata_clean.json';

	const mapboxUrl = 'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw';
	const mapboxAttribution = 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>';



	function buttonDetails(e) {
		console.log("openDetails("+e+")");
	}

	function onLocationFound(e) {
 	    console.log("> onLocationFound - e.latlng;: "+e.latlng);
		var radius = e.accuracy;
		var actLatLon = e.latlng;
		var radiusRound = radius.toFixed(2);

		try {
		
			//var marker = L.marker(e.latlng, {icon: lidlIcon}).addTo(theMap);
	//		var marker = L.marker(e.latlng).addTo(theMap);
			var marker = L.marker(e.latlng).addTo(this.map);
			
			marker.bindPopup("You are " + radiusRound + " m from Lidl Filiale 4711<br><button id='button1' class='button1' onClick='buttonDetails();'>Details</button>");//.openPopup();
			marker.on('click', function() {  
				console.log("Marker clicked at: "+marker.getLatLng());
				//alert("Jetzt kommen die Details für Lidl 4711");
			  
				// Working fine!!
				//var event = new Event("onClick");
				//that.dispatchEvent(event);
			});


	/*
			this.addEventListener("click", event => {
				var event = new Event("onClick");
				this.dispatchEvent(event);
			});
	*/
			
			L.circle(e.latlng, radius).addTo(this.map);
		} catch (e) {
			console.log("! Exception in onLocationFound(): "+e);
		}

//we need a + in the script tags because of the way jsFiddle is set up;
//var popup_content = 'Testing the Link: <a href="#" class="speciallink">TestLink</a>'+
//var popup_content = 'Testing the Link: <button class="speciallink">TestLink</button>'+
//    '<script> $(".speciallink").on("click", function(){alert("hello from inside the popup")});</script>';

//marker.bindPopup(popup_content);


//this could probably be shorter if included straight jQUery code, but used it from a
//source where i didn't use jquery as a dependency, and i'm to lazy to change it
/*
map.on('popupopen', function(){
    var cont = document.getElementsByClassName('leaflet-popup-content')[0];    
    var lst = cont.getElementsByTagName('script');
    for (var i=0; i<lst.length;i++) {
        eval(lst[i].innerText)
    }
});

		
		//the .on() here is part of leaflet
		theMap.on('popupopen', function() {  
		  console.log("Popupopen received.");
		  $('button .button1').click(function(e){
			console.log("The button was clicked. e="+e);
		  });
		});
		

		theMap.on('popupopen', _bindPopupClick);
		theMap.on('popupclose', _unbindPopupClick);

		var _bindPopupClick = function (e) {
			if (e.popup) {
				e.popup._wrapper.addEventListener('click', _bindPopupClickHandler);
			}
		};
		var _unbindPopupClick = function (e) {
			if (e.popup) {
				e.popup._wrapper.removeEventListener('click', _bindPopupClickHandler);
			}
		};
		
		var _bindPopupClickHandler = function (e) {
			console.log("-- ClickHandler used with e: "+e);
		};
*/
	}
	

	
  class SchwarzLeafletMap extends HTMLElement {
    constructor () {
		console.log("> SchwarzLeafletMap.constructor called");
		super()

		that = this;
		
		this._shadowRoot = this.attachShadow({ mode: 'open' })
		this._shadowRoot.appendChild(prepared.content.cloneNode(true))

		this._root = this._shadowRoot.getElementById('root')
		this._map = this._shadowRoot.getElementById('map')

/*
		this.addEventListener("click", event => {
			var event = new Event("onClick");
			this.dispatchEvent(event);
		});
*/
		this._props = {}

		this.render()
    }

    onCustomWidgetResize (width, height) {
		console.log("> onCustomWidgetResize()");
		//this.render()
    }


    onCustomWidgetBeforeUpdate (oChangedProperties) {
		console.log("> onCustomWidgetBeforeUpdate("+oChangedProperties+")");
		//console.log(`${this._props["widgetName"]}`);

    }

    onCustomWidgetAfterUpdate (oChangedProperties) {
		console.log("> onCustomWidgetAfterUpdate("+oChangedProperties+")");
		if ("dataUrl" in oChangedProperties) {
			this.dataUrl = oChangedProperties["dataUrl"];
			console.log("> onCustomWidgetAfterUpdate("+oChangedProperties+") - dataUrl set to "+this.dataUrl);
			this.render();
		}
		 
    }

	function onLocationFoundInt(e) {
 	    console.log("> onLocationFoundInt - e.latlng;: "+e.latlng);
		var radius = e.accuracy;
		var actLatLon = e.latlng;
		var radiusRound = radius.toFixed(2);

		try {
			var marker = L.marker(e.latlng).addTo(this.map);
			
			marker.bindPopup("You are " + radiusRound + " m from Lidl Filiale 4711<br><button id='button1' class='button1' onClick='buttonDetails();'>Details</button>");//.openPopup();
			marker.on('click', function() {  
				console.log("Marker clicked at: "+marker.getLatLng());
			});
			
			L.circle(e.latlng, radius).addTo(this.map);
		} catch (e) {
			console.log("! Exception in onLocationFound(): "+e);
		}
	}

	buttonDetails(e) {
		console.log("openDetails("+e+")");
	}

/*
    set myDataSource (dataBinding) {
		console.log("> set myDataSource("+dataBinding+")");
      this._myDataSource = dataBinding
      this.render()
    }
*/

	
    async render () {
  	  //console.log(">> render()");
      await getScriptPromisify('https://unpkg.com/leaflet@1.9.1/dist/leaflet.js')

		// Added by HM now:
		console.log("-- render() - js Libs loaded now!");

		// Define the basemaps:
		var osm=new L.tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png',{ 
					attribution: '&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'});
					
		var streets = L.tileLayer(mapboxUrl, {id: 'mapbox/streets-v11', tileSize: 512, zoomOffset: -1, attribution: mapboxAttribution});

		const satellite = L.tileLayer(mapboxUrl, {id: 'mapbox/satellite-v9', tileSize: 512, zoomOffset: -1, attribution: mapboxAttribution});

		// Define the layergroups:
		const Lidl = L.layerGroup();
		const Kaufland = L.layerGroup();
		const AldiSued = L.layerGroup();
		const Others = L.layerGroup();
		
		// Define the icons:
		var lidlIcon = L.icon({
			iconUrl: 'https://haraldamueller.github.io/Leafletmap/Lidl.png',
	//		iconUrl: 'Lidl.png',
			//shadowUrl: 'leaf-shadow.png',

			iconSize:     [36, 36], // size of the icon
			//shadowSize:   [50, 64], // size of the shadow
			//iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
			//shadowAnchor: [4, 62],  // the same for the shadow
			//popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
			});

		var kauflandIcon = L.icon({
			iconUrl: 'https://haraldamueller.github.io/Leafletmap/Kaufland.png',
	//		iconUrl: 'Kaufland.png',
			iconSize:     [36, 36], // size of the icon
			});

		var AldiSuedIcon = L.icon({
			iconUrl: 'https://haraldamueller.github.io/Leafletmap/AldiSued.png',
	//		iconUrl: 'AldiSued.png',
			iconSize:     [36, 36], // size of the icon
			});

		if (this.map != undefined) {
			map = this.map;
		} else {
			map = L.map(this._map, {
				center: [49.50000, 9.50000],
				zoom: 8
			});
		}

	/*
		const map = L.map('map', {
			center: [49.50000, 9.50000],
			zoom: 9,
			layers: [osm, streets, satellite]
		});
	*/
		const baseLayers = {
			'OpenStreetMap': osm,
			'Streets': streets,
			'Satellite': satellite
		};

		const overlays = {
			'Lidl': Lidl,
			'Kaufland': Kaufland,
			'Aldi Sued': AldiSued,
			'Andere': Others
		};

	// Set the active layers:
		osm.addTo(map);
		Lidl.addTo(map);
		
	// Add the layer control
		const layerControl = L.control.layers(baseLayers, overlays).addTo(map);

		var dataUrl = 'https://haraldamueller.github.io/Leafletmap/testdata_clean.json';

		console.log("-- render() - before getJSON("+dataUrl+")");
		console.log("-- render() - before getJSON("+this.dataUrl+")");

		if (this.dataUrl != "" && this.dataUrl != undefined) {
			dataUrl = this.dataUrl;
			console.log("-- render() - dataUrl updated to "+dataUrl);
		}
		$.getJSON(dataUrl, function(data) {
			var posData = data.d.Data;
			var actMarker;
			var i = 0;

			for (i = 0; i < posData.length; i++) { 
				//var coords = data[i].latlng;
				//var a = coords.split(",");
				var lat = posData[i].latitude;
				var lng = posData[i].longitude;
				//var lng = parseFloat(a[1]);
				var filialID = posData[i].filialid;
				var sparte = posData[i].sparte;
				var text = posData[i].text;
				var sparte = posData[i].sparte;
				
	console.log("-- text: "+text+", Sparte: "+sparte+", Lat: "+lat+", Lon: "+lng);

				actMarker = L.marker([lat,lng]).bindPopup("<b>Name: </b>" + text );

				if (sparte=="Lidl") {
					actMarker.setIcon(lidlIcon);
					actMarker.addTo(Lidl);
				} else if (sparte=="Kaufland") {
					actMarker.setIcon(kauflandIcon);
					actMarker.addTo(Kaufland);
				} else if (sparte=="AldiSued") {
					actMarker.setIcon(AldiSuedIcon);
					actMarker.addTo(AldiSued);
				} else {
					actMarker.addTo(Others);
				}
				
	//            myPts.addLayer(x);
			} 
		});

		console.log("-- render() - after getJSON("+dataUrl+")");

	// Set the active layers:
		osm.addTo(map);
		Lidl.addTo(map);

/*
Data should be:
data: [
        { value: 119633, name: 'Profit' },
        { value: 341822, name: 'Net Revenue' },
        { value: 525846, name: 'Gross Revenue' }
      ]
*/

		//var map = L.map('map').fitWorld();
		//var map = L.map(this._map).fitWorld();
//		theMap = L.map(this._map).fitWorld();
//		theMap = L.map(this._map).fitWorld();

		L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
			maxZoom: 19,
			attribution: '© OpenStreetMap'
//		}).addTo(theMap);
		}).addTo(map);
		
//		L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
//			maxZoom: 19,
//			attribution: '© OpenStreetMap'
//		}).addTo(map);
		
		
		
		map.locate({setView: true, maxZoom: 16});
//		theMap.locate({setView: true, maxZoom: 16});
		
		this.map = map;
		
		console.log("+-+ Trying to add onLocationFound-Event");

		map.on('locationfound', this.onLocationFoundInt);
//		map.on('locationfound', onLocationFound);
//		theMap.on('locationfound', onLocationFound);

    }
  }

  customElements.define('com-sap-sample-schwarz-leaflet_map', SchwarzLeafletMap)
})()
