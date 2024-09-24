export enum ScrapedSite {
    eventbrite = "eventbrite",
    fever = "fever",
}

export class ScrapedSiteUtils {

    static fromString(value: string): ScrapedSite | undefined {
        return Object
            .values(ScrapedSite)
            .find((site) => {
                site === value.toLocaleLowerCase();
            });
    }

}
