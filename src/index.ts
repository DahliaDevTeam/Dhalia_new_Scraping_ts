import { EventbriteWebScraper } from "./features/scraper/data/factory/eventbrite_web_scraper";
import { FeverWebScraper } from "./features/scraper/data/factory/fever_web_scraper";
import { EventEntity } from "./features/scraper/domain/entities/event_entity";
import { ScrapedSite } from "./features/scraper/domain/enums/scraped_sites_enum";
import { ScraperFactory } from "./features/scraper/domain/factory/scraper_factory";

export * from "./features/scraper/domain/entities/event_entity"

export const DahliaScraper = new ScraperFactory();

export const DahliaScraperEventBrite = new ScraperFactory();
export const DahliaScraperFever = new ScraperFactory();


DahliaScraper.register(ScrapedSite.eventbrite, new EventbriteWebScraper());
DahliaScraper.register(ScrapedSite.fever, new FeverWebScraper());

DahliaScraperEventBrite.register(ScrapedSite.eventbrite, new EventbriteWebScraper());
DahliaScraperFever.register(ScrapedSite.fever, new FeverWebScraper());



export async function scrapeAllSites(): Promise<EventEntity[]> {
    const res = await Promise.all(
        Object.values(ScrapedSite)
            .map((site) => {
                const scraper = DahliaScraper.get(site);
                if (scraper) {
                    return scraper.scrape();
                }
                return Promise.resolve([]); // Retourne une liste vide si le scraper n'est pas enregistré
            })
    );
    return res.flat();
}

export async function scrapeEventbrite(): Promise<EventEntity[]> {
    const res = await Promise.all(
        Object.values(ScrapedSite)
            .map((site) => {
                const scraper = DahliaScraperEventBrite.get(site);
                if (scraper) {
                    return scraper.scrape();
                }
                return Promise.resolve([]); // Retourne une liste vide si le scraper n'est pas enregistré
            })
    );
    return res.flat();
}

export async function scrapeFever(): Promise<EventEntity[]> {
    const res = await Promise.all(
        Object.values(ScrapedSite)
            .map((site) => {
                const scraper = DahliaScraperFever.get(site);
                if (scraper) {
                    return scraper.scrape();
                }
                return Promise.resolve([]); // Retourne une liste vide si le scraper n'est pas enregistré
            })
    );
    return res.flat();
}
