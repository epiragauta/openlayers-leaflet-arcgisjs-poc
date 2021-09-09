import React, { useEffect } from 'react';
import { Map, View } from 'ol';
import { transform } from 'ol/proj';
import OSM from 'ol/source/OSM';
import TileLayer from 'ol/layer/Tile';
import {OverviewMap, ScaleLine, defaults as defaultControls} from 'ol/control';
import olms from 'ol-mapbox-style';
import 'ol/ol.css';
import '../css/map.css';

const EPSG_3857 = 'EPSG:3857';
const EPSG_4326 = 'EPSG:4326';
const apiKey = 'USE_YOUR_API_KEY';
const basemapId = "ArcGIS:Streets";
const center = [-74.0, 4.0];
const basemapURL = "https://basemaps-api.arcgis.com/arcgis/rest/services/styles/" + basemapId + "?type=style&token=" + apiKey;
const scaleBarSteps = 4;
const scaleBarText = true;


const OlMapBase = () => {
  useEffect(() => {
    map.setTarget('ol-map');
  });

  let scaleControl;

  const source = new OSM();
  const overviewMapControl = new OverviewMap({
    layers: [
      new TileLayer({
        source: source,
      }),
    ],
  });

  const map = new Map({
    controls: defaultControls().extend([scaleLineControl(), overviewMapControl]),
    target: null,
    view: new View({
      center: transform(center, EPSG_4326, EPSG_3857),
      zoom: 6,
    })
  });

  

  olms(map, basemapURL);

  function scaleLineControl() {  
    scaleControl = new ScaleLine({
      units: 'metric',
      bar: true,
      steps: scaleBarSteps,
      text: scaleBarText,
      minWidth: 140,
    });
    return scaleControl;
  }

  return (
    <>
      <div id="ol-map"></div>
    </>
  );
};



export default OlMapBase;
