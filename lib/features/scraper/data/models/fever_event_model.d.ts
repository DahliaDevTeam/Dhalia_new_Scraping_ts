import { EventOrganizer } from "../../../../core/business_objects/event_organizer";
import { Location } from "../../../../core/business_objects/location";
import { Price } from "../../../../core/business_objects/price";
import { EventModel } from "./event_model";
export interface IFeverEventModel {
    readonly id: number;
    readonly name: string;
    readonly startDate: Date;
    readonly endDate: Date;
    readonly description: string;
    readonly image: string;
    readonly organizer: EventOrganizer;
    readonly price?: Price;
    readonly tags: string[];
    readonly location: Location;
    readonly url: string;
    readonly availableTickets: number;
}
export declare function cleanDescription(rawDescription: string, maxLength: number): string;
export declare class FeverEventModel extends EventModel {
    constructor(event: IFeverEventModel);
    static fromJson(json: any): Promise<FeverEventModel>;
}
