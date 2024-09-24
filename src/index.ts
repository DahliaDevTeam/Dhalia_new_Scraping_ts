import { EventbriteWebScraper } from "./features/scraper/data/factory/eventbrite_web_scraper";
import { FeverWebScraper } from "./features/scraper/data/factory/fever_web_scraper";
import { EventEntity } from "./features/scraper/domain/entities/event_entity";
import { ScrapedSite } from "./features/scraper/domain/enums/scraped_sites_enum";
import { ScraperFactory } from "./features/scraper/domain/factory/scraper_factory";

export * from "./features/scraper/domain/entities/event_entity"

export const DahliaScraper = new ScraperFactory();

DahliaScraper.register(ScrapedSite.eventbrite, new EventbriteWebScraper());
DahliaScraper.register(ScrapedSite.fever, new FeverWebScraper());

export async function scrapeAllSites(): Promise<EventEntity[]> {

    const res = await Promise.all(
        Object.values(ScrapedSite)
            .map((site) => DahliaScraper.get(site).scrape())
    );
    return res.flat();

}
