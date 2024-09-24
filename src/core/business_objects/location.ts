import { Address } from "./address";
import { GeoPoint } from "./geo_point";

export interface Location {

    readonly name: string;
    readonly address: Address;
    readonly geoPoint?: GeoPoint;

}