import CONST from "redux/constants";
import { WithId } from "./Doc";

export type TZone = {
  name: string;
  description: string;
  center: google.maps.LatLngLiteral;
  zoom: number;
  smallZone: google.maps.LatLngLiteral[];
  mediumZone: google.maps.LatLngLiteral[];
  largeZone: google.maps.LatLngLiteral[];
};

export type Zone = TZone & WithId

export interface IZonesLoad {
  type: typeof CONST.ZONE.LOAD;
  zones: TZone[];
}

export interface IZonesLoadOne {
  type: typeof CONST.ZONE.LOAD_ONE;
  zones: TZone;
}

export type TZoneActionTypes = IZonesLoad;
