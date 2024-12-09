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

export function cleanDescription(rawDescription: string, maxLength: number): string {
    // Suppression des balises HTML
    let cleanedText = rawDescription.replace(/<[^>]*>/g, '');

    // Suppression des emojis et symboles non désirés
    cleanedText = cleanedText.replace(/[\u{1F600}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F900}-\u{1F9FF}]/gu, '');

    // Retirer les espaces inutiles et les caractères de nouvelle ligne
    cleanedText = cleanedText.replace(/\s\s+/g, ' ').trim();

    // Tronquer à la longueur maximale spécifiée
    if (cleanedText.length > maxLength) {
        cleanedText = cleanedText.slice(0, maxLength) + '...';
    }

    return cleanedText;
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
            description: cleanDescription(json.summary as string | undefined ?? '', 400),
            image: json.image.url ?? '',
            organizer: {
                uid: json.primary_organizer.id,
                name: utf8Encode(json.primary_organizer.name ?? ''),
                followers: json.primary_organizer.num_followers || 0,
                events: 0,
            },
            price: {
                value: json.ticket_availability?.minimum_ticket_price?.major_value ?? 0,
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
