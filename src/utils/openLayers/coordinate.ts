/**
 * 기존 사용 방식
 */
// EPSG:5186 좌표계 추가
// proj4.defs(
//   "EPSG:5186",
//   "+proj=tmerc +lat_0=38 +lon_0=127.5 +k=0.9996 +x_0=1000000 +y_0=2000000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs"
// );
// register(proj4);

// EPSG:5186 좌표계
export const epsg5186ProjName =
  "+proj=tmerc +lat_0=38 +lon_0=127.5 +k=0.9996 +x_0=1000000 +y_0=2000000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs";

// EPSG:5179 좌표계
export const epsg5179ProjName =
  "+proj=tmerc +lat_0=38 +lon_0=127.5 +k=0.9996 +x_0=1000000 +y_0=2000000 +ellps=GRS80 +units=m +no_defs";
