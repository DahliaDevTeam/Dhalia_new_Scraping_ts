import { EventEntity } from "../entities/event_entity";

export interface WebScraperInterface {

    scrape(): Promise<EventEntity[]>;

}