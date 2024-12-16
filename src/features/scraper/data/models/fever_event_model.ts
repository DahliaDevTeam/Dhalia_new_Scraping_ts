import { EventOrganizer } from "../../../../core/business_objects/event_organizer";
import { Location } from "../../../../core/business_objects/location";
import { Price } from "../../../../core/business_objects/price";
import { utf8Encode } from "../../../../core/utils/utf8_encode";
import { ScrapedSite } from "../../domain/enums/scraped_sites_enum";
import { EventModel } from "./event_model";
import * as he from 'he';

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
    readonly categories: string[];
    readonly location: Location;
    readonly url: string;
    readonly availableTickets: number;

}



export function cleanDescription(rawDescription: string, maxLength: number): string {
    // Suppression des balises HTML
    let cleanedText = rawDescription.replace(/<[^>]*>/g, '');

    // Suppression des emojis et symboles non désirés (mise à jour de l'expression pour capturer plus de symboles)
    cleanedText = cleanedText.replace(/[\p{Emoji_Presentation}\p{Emoji}\u200D\uFE0F\u{1F3FB}-\u{1F3FF}]/gu, '');

    // Remplacer les sauts de ligne et espaces multiples par un seul espace pour un paragraphe continu
    cleanedText = cleanedText.replace(/\s\s+/g, ' ').trim();

    // Tronquer à la longueur maximale spécifiée
    if (cleanedText.length > maxLength) {
        cleanedText = cleanedText.slice(0, maxLength) + '...';
    }

    return cleanedText;
}

export class FeverEventModel extends EventModel {

    constructor(event: IFeverEventModel) {
        super({
            ...event,
            source: ScrapedSite.fever,
            isFree: false,
            isOnline: false,
        });
    }

   

    static  async fromJson(json: any): Promise<FeverEventModel> {

        return new FeverEventModel({
            id: typeof json.id === 'string' ? parseInt(json.id) : json.id,
            name: json.name ? utf8Encode(json.name) : '',  // Vérifiez si json.name est défini
            startDate: json.default_session && json.default_session.starts_at_iso 
                ? new Date(Date.parse(json.default_session.starts_at_iso)) 
                : new Date(),
            endDate: json.default_session && json.default_session.ends_at_iso 
                ? new Date(Date.parse(json.default_session.ends_at_iso)) 
                : new Date(),
            description:  cleanDescription(json.description as string | undefined ?? '', 400),
            image: json.cover_image || '',
            organizer: {
                uid: json.partner && json.partner.id ? json.partner.id.toString() : '',
                name: json.partner && json.partner.name ? json.partner.name : '',
                followers: 0,
                events: 0
            },
            price: {
                value: json.price_info ? Math.round(parseFloat(json.price_info.amount)) : 0, // Vérifiez si price_info existe
                currency: json.price_info ? json.price_info.currency : 'EUR'
            },
            tags: [
                json.category || ''
            ],
            categories: [
                json.category || ''
            ],
            location: {
                name: json.place && json.place.name ? utf8Encode(json.place.name) : '',
                address: {
                    countryCode: json.place && json.place.city ? json.place.city.country : '',
                    city: json.place && json.place.city ? utf8Encode(json.place.city.name) : '',
                    region: '',
                    street: json.place && json.place.address 
                        ? utf8Encode((json.place.address as string).split(', ')[0]) 
                        : '',
                    postalCode: json.place && json.place.address 
                        ? utf8Encode((json.place.address as string).split(', ')[1]) 
                        : ''
                },
                geoPoint: {
                    lat: json.place ? json.place.latitude : 0,
                    lng: json.place ? json.place.longitude : 0
                }
            },
            url: json.default_session ? json.default_session.share_url : '',
            availableTickets: json.default_session ? json.default_session.available_tickets : 0
        });
    }
    
    
}