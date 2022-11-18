export default class Activity {

    public static EMPTY: Activity = new Activity({
        id: -1,
        person_id: 0,
        description: ""
    });

    public id: number;
    public person_id: number;
    public description: string;

    public constructor(source: any | Activity) {
        this.id = source.id;
        this.person_id = source.person_id;
        this.description = source.description;
    }
}