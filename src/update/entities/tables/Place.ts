export default class Place {

    public static EMPTY: Place = new Place({
        id: -1,
        name: "",
        description: "",
        longitude: 0,
        latitude: 0
    });

    public id: number;
    public name: string;
    public description: string;
    public longitude: number;
    public latitude: number;

    public constructor(source: any | Place) {
        this.id = source.id;
        this.longitude = source.longitude;
        this.name = source.name;
        this.description = source.description;
        this.latitude = source.latitude;
    }
}