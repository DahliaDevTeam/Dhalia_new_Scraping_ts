import { ScrapedSite } from "../enums/scraped_sites_enum";
import { WebScraperInterface } from "./web_scraper_interface";
export declare class ScraperFactory {
    record: Record<ScrapedSite, WebScraperInterface>;
    register(scrapedSite: ScrapedSite, scraper: WebScraperInterface): void;
    get(site: ScrapedSite): WebScraperInterface | undefined;
}
