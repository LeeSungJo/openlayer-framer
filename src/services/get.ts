import axios from "axios";
import { useQuery } from "react-query";

/**
 * 서울 지도 레이어를 가져오는 쿼리
 * GeoJson, EPSG:5179
 * @returns {useQuery}
 */
export const useGetSeoulMap = () => {
  const mapData = async () => {
    try {
      const { data } = await axios.get(
        "/src/assets/maps/seoul_sig_5179.geojson"
      );
      return data;
    } catch (error) {
      return console.error("Error loading GeoJson file:", error);
    }
  };
  return useQuery("mapData", () => mapData());
};
