import CONST from "redux/constants";

export type TZone = {
  id: string;
  name: string;
  center: google.maps.LatLngLiteral;
  zoom: number;
  paths: google.maps.LatLngLiteral[];
};

export interface IZonesLoad {
  type: typeof CONST.LOAD_ZONES;
  zones: TZone[];
}

export type TZoneActionTypes = IZonesLoad;
