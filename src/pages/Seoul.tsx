import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
// Openlayers
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import { OSM } from "ol/source";
import { Vector as VectorLayer } from "ol/layer";
import { Vector as VectorSource } from "ol/source";
import GeoJSON from "ol/format/GeoJSON";
// proj4
import proj4 from "proj4";
import { register } from "ol/proj/proj4";
import { transform } from "ol/proj";
import { useGetSeoulMap } from "../services/get";

// EPSG:5186 좌표계 추가
// proj4.defs(
//   "EPSG:5186",
//   "+proj=tmerc +lat_0=38 +lon_0=127.5 +k=0.9996 +x_0=1000000 +y_0=2000000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs"
// );
// register(proj4);

// EPSG:5179 좌표계 추가
proj4.defs(
  "EPSG:5179",
  "+proj=tmerc +lat_0=38 +lon_0=127.5 +k=0.9996 +x_0=1000000 +y_0=2000000 +ellps=GRS80 +units=m +no_defs"
);
register(proj4);

export default function Seoul() {
  const [map, setMap] = useState<Map | null>(null);

  const mapRef = useRef<HTMLDivElement | null>(null);

  const { data: seoulSigMap } = useGetSeoulMap();

  // 배경 지도
  const baseLayer = new TileLayer({
    source: new OSM(),
  });

  useEffect(() => {
    if (mapRef.current && seoulSigMap) {
      // 서울 지도
      const seoulLayer = new VectorLayer({
        layerName: "seoulLayer", // 레이어에 이름을 부여
        source: new VectorSource({
          features: new GeoJSON().readFeatures(seoulSigMap, {
            // dataProjection: "EPSG:4326",
            // featureProjection: "EPSG:5179",
          }),
        }),
      });

      setMap(
        new Map({
          target: mapRef.current, // ID of the HTML element or useRef where the map should be rendered
          layers: [baseLayer, seoulLayer],
          view: new View({
            // projection: getProjection("EPSG:5186"),
            projection: "EPSG:5179",
            // center: [1107627.718, 1817204.582559], // EPSG:5186 기준 서울의 경도와 위도
            // center: [126.9780, 37.5665], // EPSG:4326 기준 서울의 경도와 위도
            center: transform(
              [127.9055956, 36.5760207],
              "EPSG:4326",
              "EPSG:5179"
            ),
            zoom: 7, // Initial zoom level
          }),
        })
      );
    }
  }, [seoulSigMap]);

  return <SeoulMap ref={mapRef} />;
}

const SeoulMap = styled.div`
  width: 100vw;
  height: 100vh;
`;
