interface Info {
    name: string;
    place: string;
    description: string;
}

export default class ActivityFilter {
    public contained: Info;

    public equaled: Info;

    public constructor(contained: Info, equaled: Info, religion: string, origin: string) {
        this.contained = contained;
        this.equaled = equaled;
    }
}