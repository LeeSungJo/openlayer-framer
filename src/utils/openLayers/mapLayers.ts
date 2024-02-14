import TileLayer from "ol/layer/Tile";
import { OSM } from "ol/source";
import { Vector as VectorLayer } from "ol/layer";
import { Vector as VectorSource } from "ol/source";
import GeoJSON from "ol/format/GeoJSON";
import { seoulLayerStyle } from "./mapStyle";

/**
 * 기본 배경지도(OSM - Open Street Map)
 * @returns {TileLayer}
 */
export const getBaseLayer = () => {
  const baseLayer = new TileLayer({
    source: new OSM(),
  });
  return baseLayer;
};

/**
 * 지도 레이어 불오기
 * @param layerName 지도 레이어에 이름을 부여
 * @param mapData useQuery를 통해 불러온 GeoJSON 데이터
 * @returns {VectorLayer}
 */
export const getMapLayer = (layerName: string, mapData: GeoJSON) => {
  const mapLayer = new VectorLayer({
    // layerName: "seoulLayer", // 레이어에 이름을 부여
    layerName: layerName,
    source: new VectorSource({
      features: new GeoJSON().readFeatures(mapData, {
        // dataProjection: "EPSG:4326",
        // featureProjection: "EPSG:5179",
      }),
    }),
    style: (features) => [seoulLayerStyle(features)],
    declutter: true, // text가 겹치면 사라지는 기능 ON
  });
  console.log("MAP : ", mapLayer);
  return mapLayer;
};
