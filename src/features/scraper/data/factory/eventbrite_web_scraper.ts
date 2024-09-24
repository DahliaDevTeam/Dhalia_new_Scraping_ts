import { WebScraperInterface } from '../../domain/factory/web_scraper_interface';
import { EventEntity } from '../../domain/entities/event_entity';
import { EventbriteEventModel } from '../models/eventbrite_event_model';

export class EventbriteWebScraper implements WebScraperInterface {

    async getEvents(page: number): Promise<EventEntity[]> {
        const endpoint = 'https://www.eventbrite.com/api/v3/destination/search/';
        const res = await fetch(
            endpoint,
            {
                method: 'POST',
                headers: {
                    "referer": "https://www.eventbrite.com/",
                    "origin": "https://www.eventbrite.com/",
                    "X-Csrftoken": "4a9bf714dd6811ee8e7f9f33375fb0b2",
                    "Cookie": "csrftoken=4a9bf714dd6811ee8e7f9f33375fb0b2",
                    "Content-Type": "application/json",
                    "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari",
                },
                body: JSON.stringify({
                    "event_search": {
                    "page": page,
                    "page_size": 60,
                    "image": true,
                    "places": ["85633147"],
                    "dates": ["current_future"],
                    "dedup": false
                    },
                    "expand.destination_event": [
                    "primary_venue",
                    "image",
                    "ticket_availability",
                    "saves",
                    "event_sales_status",
                    "primary_organizer",
                    "public_collections",
                    ],
                })
            }
        );

        const json: Record<string, any> = await res.json();
        const events = json['events']['results'] as any[];
        return events.map(
        (e) => EventbriteEventModel.fromJson(e)
        );
    }

  async scrape(): Promise<EventEntity[]> {
    let page = 1;
    let result: EventEntity[] = [];

    while (true) {
      const res = await this.getEvents(page);
      result = result.concat(res);
      if (res.length === 0) return result;
      res.length = 0;
      page++;
    }
  }

}
