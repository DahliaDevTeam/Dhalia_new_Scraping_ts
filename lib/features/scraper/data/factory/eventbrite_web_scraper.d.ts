import { WebScraperInterface } from '../../domain/factory/web_scraper_interface';
import { EventEntity } from '../../domain/entities/event_entity';
export declare class EventbriteWebScraper implements WebScraperInterface {
    getEvents(page: number): Promise<EventEntity[]>;
    scrape(): Promise<EventEntity[]>;
}
