export default class Career {

    public static EMPTY: Career = new Career({
        id: -1,
        person_id: -1,
        start_date: "",
        end_date: "",
        post: "",
        place: ""
    });

    public id: number;
    public person_id: number;
    public start_date: string;
    public end_date: string;
    public post: string;
    public place: string;

    public constructor(source: any | Career) {
        this.id = source.id;
        this.person_id = source.person_id;
        this.start_date = source.start_date;     
        this.end_date = source.end_date;
        this.post = source.post;
        this.place = source.place;
    }
}