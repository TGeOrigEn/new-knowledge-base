export default class Rank {

    public id: number;
    public person_id: number;
    public start_date: Date;
    public end_date: Date;
    public degree: string;
    public name: string;

    public constructor(source: any | Rank) {
        this.id = source.id;
        this.person_id = source.person_id;
        this.start_date = source.start_date;
        this.end_date = source.end_date;
        this.degree = source.degree;
        this.name = source.name;
    }
}