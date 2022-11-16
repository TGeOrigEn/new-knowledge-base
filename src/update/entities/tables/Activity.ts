export default class Activity {

    public static EMPTY: Activity = new Activity({
        id: 0,
        person_id: 0,
        name: "",
        description: "",
        place: ""
    });

    public id: number;
    public person_id: number;
    public name: string;
    public description: string;
    public place: string;

    public constructor(source: any | Activity) {
        this.id = source.id;
        this.person_id = source.person_id;
        this.name = source.name;
        this.description = source.description;
        this.place = source.place;
    }
}