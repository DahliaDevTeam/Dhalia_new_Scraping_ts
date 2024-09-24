import { ScrapedSite } from "../enums/scraped_sites_enum";
import { WebScraperInterface } from "./web_scraper_interface";

export class ScraperFactory {

    record: Record<ScrapedSite, WebScraperInterface> = <Record<ScrapedSite, WebScraperInterface>>{};

    register(scrapedSite: ScrapedSite, scraper: WebScraperInterface): void {
        this.record[scrapedSite] = scraper;
    }

    get(site: ScrapedSite): WebScraperInterface | undefined {
        return this.record[site];
    }

}