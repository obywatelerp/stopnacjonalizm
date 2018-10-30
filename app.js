(function(L, wms) {
    var overlayMap = createMap1('map', false);

    function createMap1(div, tiled) {
        // Map configuration
        var map = L.map(div);
        map.setView([52, 19], 6);

        var basemaps = {
            'Mapa bazowa': basemap().addTo(map),
            'Bez mapy bazowej': blank()
        };

        var infoElement = document.querySelector('#info');

        xsl = loadXMLDoc("./mapXsl.xsl");

        var MySource = L.WMS.Source.extend({
            'parseFeatureInfo': function(mapXml, url) {
                var result;

                var xml = parseXml(mapXml);

                if (
                    xml
                    && document.implementation 
                    && document.implementation.createDocument 
                    && !(window.ActiveXObject || "ActiveXObject" in window)
                ) {
                    var xsltProcessor = new XSLTProcessor();

                    xsltProcessor.importStylesheet(xsl);
                    result = xsltProcessor.transformToFragment(xml, document);
                } else {
                    return null;
                }

                return result;
            },
            'showFeatureInfo': function(latlng, info) {
                if (info) {
                    infoElement.innerHTML = "";
                    infoElement.appendChild(info);
                } else {
                    infoElement.parentNode.style.display = 'none';
                }
            }
        });

        // Add WMS source/layers
        var source = new MySource(
            "https://mapy.obywatelerp.org/cgi-bin/stopn3/qgis_mapserv.fcgi",
            {
                "version": "1.3.0",
                "format": "image/png",
                "transparent": "true",
                "attribution": "<a href='https://obywatelerp.org/'>ObywateleRP</a>",
                "info_format": "text/xml",
                "tiled": tiled
            }
        );

        // var layers = {
        //     'Konstytucja': source.getLayer("powiaty,wojewodztwa,konstytucja").addTo(map)
        // };
        var layers = {
            'Województwa': source.getLayer("wojewodztwa").addTo(map),
            'Powiaty': source.getLayer("powiaty").addTo(map),
            'Miasta/gminy': source.getLayer("gminy").addTo(map),
            'Kandydaci - Sejmiki wojewódzkie': source.getLayer("kandydaci_wojewodztwa").addTo(map),
            'Kandydaci - Rady powiatów': source.getLayer("kandydaci_powiaty").addTo(map),
    	    'Kandydaci - Rady miast/gmin,prezydenci,wójtowie': source.getLayer("kandydaci_gminy").addTo(map),
    	    'Kandydaci - na karcie głosowania ': source.getLayer("kandydaci_w_komisji").addTo(map),    	    
        };
        // Create layer control
        L.control.layers(basemaps, layers).addTo(map);


        var geoOptions = {
            locateOptions: {
                maxZoom: 11
            },
            flyTo: true
        };

        L.control.locate(geoOptions).addTo(map);
        
    	
        var geocoder = L.Control.geocoder({
                defaultMarkGeocode: false ,
                position: "topleft",
                placeholder: "Miejscowość"
            })
            .on('markgeocode', function(e) {
                var bbox = e.geocode.bbox;
                var poly = L.polygon([
                     bbox.getSouthEast(),
                     bbox.getNorthEast(),
                     bbox.getNorthWest(),
                     bbox.getSouthWest()
                ]).addTo(map);
                map.fitBounds(poly.getBounds());
            })
            .addTo(map);

        // Opacity slider
        //    var slider = L.DomUtil.get('range-' + div);
        //    L.DomEvent.addListener(slider, 'change', function() {
        //        source.setOpacity(this.value);
        //    });
        return map;
    }

    function basemap() {
        // maps.stamen.com
        var attr = 'Map tiles CC BY <a href="http://stamen.com">Stamen Design</a>, Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.';
        return L.tileLayer("http://tile.stamen.com/toner-background/{z}/{x}/{y}.png", {
            opacity: 0.3,
            attribution: attr
        });
    }

    function blank() {
        var layer = new L.Layer();
        layer.onAdd = layer.onRemove = function() {};
        return layer;
    }

    function loadXMLDoc(dname) {
        if (window.XMLHttpRequest) {
            xhttp = new XMLHttpRequest();
        } else {
            xhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xhttp.open("GET", dname, false);
        xhttp.send("");
        return xhttp.responseXML;
    }

    var parseXml;

    if (window.DOMParser) {
        parseXml = function(xmlStr) {
            return (new window.DOMParser()).parseFromString(xmlStr, "text/xml");
        };
    } else if (typeof window.ActiveXObject != "undefined" && new window.ActiveXObject("Microsoft.XMLDOM")) {
        parseXml = function(xmlStr) {
            var xmlDoc = new window.ActiveXObject("Microsoft.XMLDOM");
            xmlDoc.async = "false";
            xmlDoc.loadXML(xmlStr);
            return xmlDoc;
        };
    } else {
        parseXml = function() { return null; }
    }
})(L, L.WMS);
