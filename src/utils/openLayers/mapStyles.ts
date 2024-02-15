import { Fill, Stroke, Style, Text } from "ol/style";
// interface FeatureCollection {
//   type: "FeatureCollection";
//   features: Feature[];
// }

// interface Feature {
//   type: "Feature";
//   geometry: {
//     coordinates: Array<2>;
//     type: string;
//   }; // Geometry 타입에 맞게 세부적으로 정의할 수 있습니다.
//   properties: {
//     SIG_CD: string;
//     SIG_ENG_NM: string;
//     SIG_KOR_NM: string;
//   }; // 속성에 대한 타입도 정의할 수 있습니다.
// }

/**
 * QGIS 기준 중심점 찾기
 * @deprecated
 * @param {*} code 지역 코드
 * @returns 중심점
 */
export const getCenterCoordinate = (code, centroid) => {
  // let selectedFeature = {};
  let selectedFeature = null;
  if (code && centroid) {
    selectedFeature = centroid.features.find(
      (feature) => feature.properties.SIG_CD === code
    );
  }
  // console.log("TARGET : ", selectedFeature);
  return selectedFeature?.geometry?.coordinates;
};

/**
 * 스타일 정의
 * @returns {Style}
 */
export const seoulLayerStyle = (features) => {
  // if (features && centroid) {
  // const centerPoint = getCenterCoordinate(features?.values_?.SIG_CD, centroid);
  // console.log(centerPoint);
  // const centerPointFeature = getCenterCoordinate(
  //   features?.values_?.SIG_CD,
  //   centroid
  // );
  // const centerPoint = centerPointFeature?.geometry?.coordinates;
  const textStyle = new Style({
    fill: new Fill({
      // color: "#eceef5",
      color: "rgba(91, 185,252,0.1)",
    }),
    stroke: new Stroke({
      color: "#4c8ffc",
      width: 2,
    }),
    text: new Text({
      text: features?.values_?.SIG_KOR_NM,
      // text: features?.properties?.SIG_KOR_NM,
      font: "15px NotoSans,sans-serif",
      overflow: true,
      fill: new Fill({
        color: "#0c0c0c",
      }),
      stroke: new Stroke({
        color: "#fff",
        width: 4,
      }),
    }),
    // geometry: new Point(transform(centerPoint, "EPSG:5179", "EPSG:5179")),
    // geometry: centerPoint,
  });
  return textStyle;
  // }
};
