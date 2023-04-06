import CONST from "redux/constants";

export type TZone = {
  _id: string;
  name: string;
  description: string;
  center: google.maps.LatLngLiteral;
  zoom: number;
  smallZone: google.maps.LatLngLiteral[];
  meduimZone: google.maps.LatLngLiteral[];
  largeZone: google.maps.LatLngLiteral[];
};

export interface IZonesLoad {
  type: typeof CONST.ZONE.LOAD;
  zones: TZone[];
}

export interface IZonesLoadOne {
  type: typeof CONST.ZONE.LOAD_ONE;
  zones: TZone;
}

export type TZoneActionTypes = IZonesLoad;
