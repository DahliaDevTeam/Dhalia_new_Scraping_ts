import { WebScraperInterface } from '../../domain/factory/web_scraper_interface';
import { EventEntity } from '../../domain/entities/event_entity';
export declare class FeverWebScraper implements WebScraperInterface {
    private _eventsUrl;
    eventDetailsUrl(id: string): string;
    getEventsIds(page: number, cityCode: string): Promise<string[]>;
    getEvent(id: string): Promise<EventEntity | undefined>;
    getEvents(ids: string[]): Promise<EventEntity[]>;
    getCityEvents(cityCode: string): Promise<EventEntity[]>;
    scrape(): Promise<EventEntity[]>;
}
