export default class Career {

    public id: number;
    public person_id: number;
    public start_date: Date;
    public end_date: Date;
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