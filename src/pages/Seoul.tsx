import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
// Openlayers
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import { OSM, TileWMS } from "ol/source";

export default function Seoul() {
  const [map, setMap] = useState<Map | null>(null);

  const mapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Create a new OpenLayers map
    if (mapRef.current) {
      console.log("SET");
      setMap(
        new Map({
          target: mapRef.current, // ID of the HTML element or useRef where the map should be rendered
          layers: [
            // OpenStreetMap base layer
            new TileLayer({
              source: new OSM(),
            }),
            // Additional layers if needed
            new TileLayer({
              source: new TileWMS({
                url: "your-wms-url-here",
                params: { LAYERS: "your-layer-name-here", TILED: true },
                // serverType: 'your-server-type-here', // e.g., 'geoserver'
              }),
            }),
          ],
          view: new View({
            center: [0, 0], // Initial map center coordinates
            zoom: 2, // Initial zoom level
          }),
        })
      );
    }
  }, []);

  return <SeoulMap ref={mapRef} />;
}

const SeoulMap = styled.div`
  width: 100vw;
  height: 100vh;
`;
