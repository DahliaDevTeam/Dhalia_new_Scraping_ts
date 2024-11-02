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
            source: ScrapedSite.eventbrite,
        });
    }

    static fromJson(json: any): EventbriteEventModel {
        const startDate = new Date(`${json.start_date} ${json.start_time}`);
        const endDate = new Date(`${json.end_date} ${json.end_time}`);

        const lat = parseFloat(json.primary_venue.address.latitude);
        const lng = parseFloat(json.primary_venue.address.longitude);

        return new EventbriteEventModel({
            id: Number(json.id),
            name: utf8Encode(json.name ?? ''),
            startDate,
            endDate,
            description: utf8Encode(json.summary ?? ''),
            image: json.image.url ?? '',
            organizer: {
                uid: json.primary_organizer.id,
                name: utf8Encode(json.primary_organizer.name ?? ''),
                followers: json.primary_organizer.num_followers || 0,
                events: 0,
            },
            price: {
                value: json.ticket_availability?.minimum_ticket_price?.value ?? 0,
                currency: json.ticket_availability?.minimum_ticket_price?.currency ?? '',
            },
            tags: (json.tags ?? []).map(tag => utf8Encode(tag.display_name ?? '')),
            location: {
                name: utf8Encode(json.primary_venue.name ?? ''),
                address: {
                    countryCode: json.primary_venue.address.country ?? '',
                    city: utf8Encode(json.primary_venue.address.city ?? ''),
                    region: utf8Encode(json.primary_venue.address.region ?? ''),
                    street: utf8Encode(json.primary_venue.address.localized_address_display ?? ''),
                    postalCode: utf8Encode(json.primary_venue.address.postal_code ?? ''),
                },
                geoPoint: { lat, lng },
            },
            url: json.url ?? '',
            isOnline: !!json.is_online_event,
            isFree: !!json.ticket_availability?.is_free,
            availableTickets: 0,
        });
    }
}
