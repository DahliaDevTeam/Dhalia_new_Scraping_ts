import { EventOrganizer } from "../../../../core/business_objects/event_organizer";
import { Location } from "../../../../core/business_objects/location";
import { Price } from "../../../../core/business_objects/price";
import { utf8Encode } from "../../../../core/utils/utf8_encode";
import { ScrapedSite } from "../../domain/enums/scraped_sites_enum";
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

export class FeverEventModel extends EventModel {

    constructor(event: IFeverEventModel) {
        super({
            ...event,
            source: ScrapedSite.fever,
            isFree: false,
            isOnline: false,
        });
    }

    static fromJson(json: any): FeverEventModel {
        return new FeverEventModel({
            id: typeof json.id === 'string' ? parseInt(json.id) : json.id,
            name: json.name ? utf8Encode(json.name) : '',  // Vérifiez si json.name est défini
            startDate: json.default_session && json.default_session.starts_at_iso 
                ? new Date(Date.parse(json.default_session.starts_at_iso)) 
                : new Date(),
            endDate: json.default_session && json.default_session.ends_at_iso 
                ? new Date(Date.parse(json.default_session.ends_at_iso)) 
                : new Date(),
            description: json.description || '',  // Utilisez une valeur par défaut si la description est manquante
            image: json.cover_image || '',
            organizer: {
                uid: json.partner && json.partner.id ? json.partner.id.toString() : '',
                name: json.partner && json.partner.name ? json.partner.name : '',
                followers: 0,
                events: 0
            },
            price: {
                value: json.price_info ? json.price_info.amount : 0, // Vérifiez si price_info existe
                currency: json.price_info ? json.price_info.currency : 'EUR'
            },
            tags: [
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