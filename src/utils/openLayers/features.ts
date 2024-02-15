import "ol/ol.css";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import { Stroke, Style, Circle, Fill } from "ol/style";
import { Vector as VectorLayer } from "ol/layer";
import { Vector as VectorSource } from "ol/source";
import DropPinSvg from "../../assets/dropPin.svg";
import { transform } from "ol/proj";
import GeoJSON from "ol/format/GeoJSON";

import proj4 from "proj4";
import { register } from "ol/proj/proj4";
import { epsg5179ProjName } from "./coordinates";
// EPSG:5179 좌표계 추가
proj4.defs("EPSG:5179", epsg5179ProjName);
register(proj4);

/**
 * 지도에 마커 표시
 * @returns {VectorLayer}
 */
export const getFeatures = (featureDatas: GeoJSON) => {
  console.log("TEST : ", featureDatas);

  const features = new GeoJSON().readFeatures(featureDatas, {
    dataProjection: "EPSG:5186", // GeoJSON의 원본 좌표체계를 설정
    featureProjection: "EPSG:5179", // 사용할 좌표체계를 설정
  });

  // Feature 스타일 정의
  const style = new Style({
    image: new Circle({
      radius: 6,
      fill: new Fill({ color: "red" }),
      stroke: new Stroke({ color: "white", width: 2 }),
    }),
  });

  // Vector 레이어 생성 및 스타일 적용
  const vectorLayer = new VectorLayer({
    source: new VectorSource({
      features: features,
    }),
    style: style,
  });
  return vectorLayer;
};

// ------------------------------------------------
// export const getFeatures = (featureArray) => {
//   console.log("TEST : ", featureArray);
//   // console.log("위도 : ", feature?.properties?.위도);
//   // console.log("경도 : ", feature?.properties?.경도);
//   // SVG 아이콘 스타일 정의
//   const iconStyle = new Style({
//     image: new Icon({
//       src: DropPinSvg,
//       scale: 0.2, // 아이콘 크기 조절
//     }),
//   });

//   const centerPoint = [126.972317, 37.555946];

//   // 아이콘의 위치 설정
//   const iconFeature = new Feature({
//     // geometry: new Point([0, 0]), // 아이콘이 표시될 좌표 설정
//     geometry: new Point(transform(centerPoint, "EPSG:4326", "EPSG:5179")),
//   });

//   // 아이콘 Feature에 스타일 적용
//   iconFeature.setStyle(iconStyle);

//   // Vector Source 생성 및 Feature 추가
//   const vectorSource = new VectorSource();
//   vectorSource.addFeature(iconFeature);

//   // Vector Layer 생성
//   // const vectorLayer = new VectorLayer({
//   //   source: vectorSource,
//   // });

//   const vectorLayer = new VectorLayer({
//     source: vectorSource,
//   });
//   return vectorLayer;
// };
