import React, { useEffect, useRef } from "react";
import MapView from "@arcgis/core/views/MapView";
import esriConfig from '@arcgis/core/config.js';
import BasemapToggle  from '@arcgis/core/widgets/BasemapToggle';
import Map from '@arcgis/core/Map';
import ScaleBar from "@arcgis/core/widgets/ScaleBar";



const center = [-74.0, 4.0];
const zoom = 5;




const AjsMapBase = () => {
  
  const mapDiv = useRef(null);
  esriConfig.apiKey = "USE_YOUR_API_KEY";
  
  useEffect(() => {
    if (mapDiv.current) {

      const map = new Map({
        basemap: "streets-vector" // Basemap layer service
      });

      const view = new MapView({
        map: map,
        center: center, // Longitude, latitude
        zoom: zoom, // Zoom level
        container: mapDiv.current // Div element
      });

      var basemapToggle  = new BasemapToggle ({
        view: view
      });

      // Add the widget to the top-right corner of the view
      view.ui.add(basemapToggle, {
        position: "top-right"
      });

      let scaleBar = new ScaleBar({
        view: view
      });
      
      // Add widget to the bottom left corner of the view
      view.ui.add(scaleBar, {
        position: "bottom-left"
      });
    }
  }, []);

  return <div className="mapDiv" ref={mapDiv}></div>;
}

export default AjsMapBase;