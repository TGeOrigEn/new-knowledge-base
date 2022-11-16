export default class Rank {

    public static EMPTY: Rank = new Rank({
        id: 0,
        person_id: 0,
        start_date: "",
        end_date: "",
        degree: "",
        name: ""
    });

    public id: number;
    public person_id: number;
    public start_date: string;
    public end_date: string;
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