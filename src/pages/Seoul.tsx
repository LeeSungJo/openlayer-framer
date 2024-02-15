import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
// Openlayers
import Map from "ol/Map";
import View from "ol/View";
import { defaults } from "ol/control";
// proj4
import proj4 from "proj4";
import { register } from "ol/proj/proj4";
import { transform } from "ol/proj";
import { epsg5179ProjName } from "../utils/openLayers/coordinates";
import {
  useGetSeoulSigLayer,
  useGetSeoulSigCentroid,
  useGetSeoulData,
} from "../services/get";
import SideBar from "../components/home/SideBar";
import { getBaseLayer, getMapLayer } from "../utils/openLayers/mapLayers";
import { getFeatures } from "../utils/openLayers/features";

// EPSG:5179 좌표계 추가
proj4.defs("EPSG:5179", epsg5179ProjName);
register(proj4);

export default function Seoul() {
  const [map, setMap] = useState<Map | null>(null);

  const [isOpenSlide, setIsOpenSlide] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState(false);

  const mapRef = useRef<HTMLDivElement | null>(null);

  const handleSideBar = () => {
    setIsOpenSlide(!isOpenSlide);
  };
  // const handleClickItem = (name: string) => {
  //   console.log("YES!", name);
  // };

  // 서울 시군구 레이어
  const { data: seoulSigMap } = useGetSeoulSigLayer();
  // 서울 시군구 중심점
  const { data: seoulSigCentroid } = useGetSeoulSigCentroid();
  // 서울 데이터
  const { data: seoulData } = useGetSeoulData();

  /**
   * 메인 지도 & 데이터 뿌리기
   */
  useEffect(() => {
    if (mapRef.current && seoulSigMap && seoulSigCentroid) {
      // console.log("seoulSigMap : ", seoulSigMap);
      // console.log("seoulSigCentroid : ", seoulSigCentroid);
      // console.log("seoulData : ", seoulData);

      setMap(
        new Map({
          target: mapRef.current, // ID of the HTML element or useRef where the map should be rendered
          layers: [
            getBaseLayer(),
            getMapLayer("seoulLayer", seoulSigMap),
            // getFeatures(seoulData?.features),
            getFeatures(seoulData),
          ],
          //줌 버튼 숨김 처리
          controls: defaults({
            attribution: false,
            zoom: false,
          }),
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

  return (
    <>
      <SideBar
        isOpen={isOpenSlide}
        setIsOpen={handleSideBar}
        selectedMenu={selectedMenu}
        setSelectedMenu={setSelectedMenu}
      />
      <SeoulMap ref={mapRef} />
    </>
  );
}

const SeoulMap = styled.div`
  width: 100vw;
  height: 100vh;
`;
