import axios from "axios";
import { useQuery } from "react-query";

/**
 * 서울 시군구 레이어를 가져오는 쿼리
 * GeoJson, EPSG:5179
 * @returns {useQuery}
 */
export const useGetSeoulSigLayer = () => {
  const getSeoulSigLayer = async () => {
    try {
      const { data } = await axios.get(
        "/src/assets/maps/seoul_sig_5179.geojson"
      );
      return data;
    } catch (error) {
      return console.error("Error loading GeoJson file:", error);
    }
  };
  return useQuery("getSeoulSigLayer", () => getSeoulSigLayer());
};

/**
 * 서울 시군구 중심점을 가져오는 쿼리
 * GeoJson, EPSG:5179
 * @returns {useQuery}
 */
export const useGetSeoulSigCentroid = () => {
  const getSeoulSigCentroid = async () => {
    try {
      const { data } = await axios.get(
        "/src/assets/maps/seoul_sig_centroid.geojson"
      );
      return data;
    } catch (error) {
      return console.error("Error loading GeoJson file:", error);
    }
  };
  return useQuery("getSeoulSigCentroid", () => getSeoulSigCentroid());
};

/**
 * 서울 데이터를 가져오는 쿼리
 * GeoJson, EPSG:5179
 * @returns {useQuery}
 */
export const useGetSeoulData = () => {
  const getSeoulData = async () => {
    try {
      const { data } = await axios.get("/src/assets/datas/data.geojson");
      return data;
    } catch (error) {
      return console.error("Error loading GeoJson file:", error);
    }
  };
  return useQuery("getSeoulData", () => getSeoulData());
};
