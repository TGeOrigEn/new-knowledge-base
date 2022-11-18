export default class Link {

    public static EMPTY: Link = new Link({
        id: -1,
        activity_id: -1,
        place_id: -1,
    });

    public id: number;
    public activity_id: number;
    public place_id: number;

    public constructor(source: any | Link) {
        this.id = source.id;
        this.place_id = source.place_id;
        this.activity_id = source.activity_id;
    }
}