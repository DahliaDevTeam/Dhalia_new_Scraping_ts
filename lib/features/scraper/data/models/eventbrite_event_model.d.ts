import { EventOrganizer } from "../../../../core/business_objects/event_organizer";
import { Location } from "../../../../core/business_objects/location";
import { Price } from "../../../../core/business_objects/price";
import { EventModel } from "./event_model";
export interface IEventbriteEventModel {
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
    readonly isFree: boolean;
    readonly url: string;
    readonly isOnline: boolean;
    readonly availableTickets: number;
}
export declare class EventbriteEventModel extends EventModel {
    constructor(event: IEventbriteEventModel);
    static fromJson(json: any): EventbriteEventModel;
}
