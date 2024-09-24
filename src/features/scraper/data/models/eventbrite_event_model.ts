import { EventOrganizer } from "../../../../core/business_objects/event_organizer";
import { Location } from "../../../../core/business_objects/location";
import { Price } from "../../../../core/business_objects/price";
import { utf8Encode } from "../../../../core/utils/utf8_encode";
import { ScrapedSite } from "../../domain/enums/scraped_sites_enum";
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

export class EventbriteEventModel extends EventModel {

    constructor(event: IEventbriteEventModel) {
        super({
            ...event,
            source: ScrapedSite.eventbrite
        });
    }

    static fromJson(json: any): EventbriteEventModel {
        const startDate = `${json.start_date} ${json.start_time}`;
        const endDate = `${json.end_date} ${json.end_time}`;

        const lat = json['primary_venue']['address']['latitude'];
        const lng = json['primary_venue']['address']['longitude'];

        return new EventbriteEventModel({
            id: typeof json.id === 'string' ? parseInt(json.id) : json.id,
            name: utf8Encode(json.name),
            startDate: new Date(Date.parse(startDate)),
            endDate: new Date(Date.parse(endDate)),
            description: utf8Encode(json.summary as string|undefined ?? ''),
            image: json.image.url,
            organizer: {
                uid: json.primary_organizer.id,
                name: json.primary_organizer.name ?? '',
                followers: json.primary_organizer.num_followers ?? 0,
                events: 0
            },
            price: {
                value: json.ticket_availability?.minimum_ticket_price?.value ?? 0,
                currency: json.ticket_availability?.minimum_ticket_price?.currency ?? ''
            },
            tags: (json.tags as any[])
                .map<string>((e) => utf8Encode(e.display_name as string)),
            location: {
                name: utf8Encode(json.primary_venue.name as string),
                address: {
                    countryCode: json.primary_venue.address.country,
                    city: utf8Encode(json.primary_venue.address.city as string),
                    region: utf8Encode(json.primary_venue.address.region as string),
                    street: utf8Encode(json.primary_venue.address.localized_address_display as string),
                    postalCode: utf8Encode(json.primary_venue.address.postal_code ?? ''),
                },
                geoPoint: {
                    lat: typeof lat === 'string' ? Number(lat) : lat,
                    lng: typeof lng === 'string' ? Number(lng) : lng,
                }
            },
            url: json.url,
            isOnline: json.is_online_event,
            isFree: json.ticket_availability.is_free,
            availableTickets: 0
        });
    }
    
}