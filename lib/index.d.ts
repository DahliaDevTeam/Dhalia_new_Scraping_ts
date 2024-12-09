import { EventEntity } from "./features/scraper/domain/entities/event_entity";
import { ScraperFactory } from "./features/scraper/domain/factory/scraper_factory";
export * from "./features/scraper/domain/entities/event_entity";
export declare const DahliaScraper: ScraperFactory;
export declare const DahliaScraperEventBrite: ScraperFactory;
export declare const DahliaScraperFever: ScraperFactory;
export declare function scrapeAllSites(): Promise<EventEntity[]>;
export declare function scrapeEventbrite(): Promise<EventEntity[]>;
export declare function scrapeFever(): Promise<EventEntity[]>;
