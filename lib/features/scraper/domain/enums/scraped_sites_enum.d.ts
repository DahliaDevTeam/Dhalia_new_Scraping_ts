export declare enum ScrapedSite {
    eventbrite = "eventbrite",
    fever = "fever"
}
export declare class ScrapedSiteUtils {
    static fromString(value: string): ScrapedSite | undefined;
}
