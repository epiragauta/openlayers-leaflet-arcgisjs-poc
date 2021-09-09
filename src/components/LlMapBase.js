import { useEffect, useRef } from "react";
import { Map as LeafletMap, Icon, Marker, Control, TileLayer } from "leaflet";
import { vectorBasemapLayer } from "esri-leaflet-vector";
import MiniMap from 'leaflet-minimap';
import "leaflet/dist/leaflet.css";

import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

const apiKey = 'AAPKc425cb71a25f42ff8fcd7189f096fe68lWrGdnyLYwh3MBvAK2Dh9HRl9OKBS9jtkJVPSDBSa5s3Q-Icse0-pRCdtI4W8D25';
const basemapId = "ArcGIS:Streets";
const center = [4.0, -74.0];
const zoom = 6;


const LlMapBase = () => {

  const mapRef = useRef(null);

  
  useEffect(() => {
    
    if (mapRef.current !== null) {
      // The default icon does not work due to webpack issues
      let DefaultIcon = new Icon({
        iconUrl: icon,
        shadowUrl: iconShadow,
        iconAnchor: [12, 41],
        popupAnchor: [0, -41],
      });
      Marker.prototype.options.icon = DefaultIcon;

      const map = new LeafletMap(mapRef.current);
      map.setView(center, zoom);

      // Add a basemap
      var vectorBaseLyr = vectorBasemapLayer(basemapId, {
        apiKey: apiKey //process.env.REACT_APP_ARCGIS_API_KEY, // https://developers.arcgis.com
      }).addTo(map);

      const scale = new Control.Scale();
      scale.addTo(map);      

      var osmUrl='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
      var osmAttrib='Map data &copy; OpenStreetMap contributors';
      var osm = new TileLayer(osmUrl, {minZoom: 2, maxZoom: 18, attribution: osmAttrib});
      new MiniMap(osm).addTo(map);

    }
  }, [mapRef]);

  return <div className="ll-map" ref={mapRef}></div>;

};

export default LlMapBase;