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
import { epsg5179ProjName } from "../utils/openLayers/coordinate";
import {
  useGetSeoulSigLayer,
  useGetSeoulSigCentroid,
  useGetSeoulData,
} from "../services/get";
import { seoulLayerStyle } from "../utils/openLayers/mapStyle";
import SideBar from "../components/home/SideBar";
import { getBaseLayer, getMapLayer } from "../utils/openLayers/mapLayers";

// EPSG:5179 좌표계 추가
proj4.defs("EPSG:5179", epsg5179ProjName);
register(proj4);

export default function Seoul() {
  const [map, setMap] = useState<Map | null>(null);

  const mapRef = useRef<HTMLDivElement | null>(null);

  const [isOpen, setIsOpen] = useState(false);

  const handleSideBar = () => {
    setIsOpen(!isOpen);
  };

  // 서울 시군구 레이어
  const { data: seoulSigMap } = useGetSeoulSigLayer();
  // 서울 시군구 중심점
  const { data: seoulSigCentroid } = useGetSeoulSigCentroid();

  // 서울 데이터
  const { data: seoulData, isFetched: dataFetched } = useGetSeoulData();

  // 배경 지도
  // const baseLayer = new TileLayer({
  //   source: new OSM(),
  // });

  /**
   * 기본 지도 & 데이터 뿌리기
   */
  useEffect(() => {
    if (mapRef.current && seoulSigMap && seoulSigCentroid) {
      // // 서울 지도
      console.log("seoulSigMap : ", seoulSigMap);
      console.log("seoulSigCentroid : ", seoulSigCentroid);
      // const seoulLayer = new VectorLayer({
      //   layerName: "seoulLayer", // 레이어에 이름을 부여
      //   source: new VectorSource({
      //     features: new GeoJSON().readFeatures(seoulSigMap, {
      //       // dataProjection: "EPSG:4326",
      //       // featureProjection: "EPSG:5179",
      //     }),
      //   }),
      //   style: (features) => [seoulLayerStyle(features, seoulSigCentroid)],
      //   declutter: true, // text가 겹치면 사라짐
      // });

      setMap(
        new Map({
          target: mapRef.current, // ID of the HTML element or useRef where the map should be rendered
          layers: [getBaseLayer(), getMapLayer("seoulLayer", seoulSigMap)],
          view: new View({
            // projection: getProjection("EPSG:5186"),
            projection: "EPSG:5179",
            // center: [1107627.718, 1817204.582559], // EPSG:5186 기준 서울의 경도와 위도
            // center: [126.9780, 37.5665], // EPSG:4326 기준 서울의 경도와 위도
            center: transform(
              [126.972317, 37.555946],
              "EPSG:4326",
              "EPSG:5179"
            ),
            zoom: 11, // Initial zoom level
          }),
        })
      );
    }
  }, [seoulSigMap, seoulSigCentroid]);

  useEffect(() => {
    console.log("dataFetched1 : ", dataFetched);

    console.log("dataFetched2 : ", dataFetched);
    console.log("DATA : ", seoulData);
  }, [seoulData, dataFetched]);

  return (
    <>
      <SideBar isOpen={isOpen} setIsOpen={handleSideBar} />
      <SeoulMap ref={mapRef} />
    </>
  );
}

const SeoulMap = styled.div`
  width: 100vw;
  height: 100vh;
`;
