import { EventOrganizer } from "../../../../core/business_objects/event_organizer";
import { Location } from "../../../../core/business_objects/location";
import { Price } from "../../../../core/business_objects/price";
import { ScrapedSite } from "../enums/scraped_sites_enum";
export interface IEventEntity {
    readonly id: number;
    readonly source: ScrapedSite;
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
export declare abstract class EventEntity implements IEventEntity {
    readonly id: number;
    readonly source: ScrapedSite;
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
    constructor(result: IEventEntity);
}
