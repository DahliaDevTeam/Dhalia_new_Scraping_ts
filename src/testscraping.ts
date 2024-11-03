import { scrapeAllSites, scrapeFever, scrapeEventbrite} from './index';

async function testScrapingFever() {
    try {
        const events = await scrapeFever();
        console.log('Scraped events Ferver :', events.length);
        console.log('last-event Ferver :', events[events.length-1]);
    } catch (error) {
        console.error('Error during scraping:', error);
    }
}


async function testScrapeEventbrite() {
    try {
        const events = await scrapeEventbrite();
        console.log('Scraped events Eventbrite :', events.length);
        console.log('last-event Eventbrite :', events[events.length-1]);
    } catch (error) {
        console.error('Error during scraping:', error);
    }
}

async function testAllScraping() {
    try {
        const events = await scrapeAllSites();
        console.log('Scraped events All:', events.length);
        console.log('last-event  :', events[events.length-1]);
    } catch (error) {
        console.error('Error during scraping:', error);
    }
}

// testScrapingFever();
testScrapeEventbrite();
// testAllScraping();