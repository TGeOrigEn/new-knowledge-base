interface Info {
    start_date: string;
    end_date: string;
    post: string;
    place: string;
}

export default class CareerFilter {
    public contained: Info;

    public equaled: Info;

    public constructor(contained: Info, equaled: Info, religion: string, origin: string) {
        this.contained = contained;
        this.equaled = equaled;
    }
}