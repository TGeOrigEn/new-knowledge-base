export default class Activity {

    public static EMPTY: Activity = new Activity({
        id: 0,
        person_id: 0,
        description: "",
        place: ""
    });

    public id: number;
    public person_id: number;
    public description: string;
    public place: string;

    public constructor(source: any | Activity) {
        this.id = source.id;
        this.person_id = source.person_id;
        this.description = source.description;
        this.place = source.place;
    }
}