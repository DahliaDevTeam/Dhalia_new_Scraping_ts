import { scrapeAllSites } from './index';

async function testScraping() {
    try {
        const events = await scrapeAllSites();
        console.log('Scraped events:', events);
    } catch (error) {
        console.error('Error during scraping:', error);
    }
}

testScraping();