interface Info {
    start_date: string;
    end_date: string;
    degree: string;
    name: string;
}

export default class RankFilter {
    public contained: Info;

    public equaled: Info;

    public constructor(contained: Info, equaled: Info, religion: string, origin: string) {
        this.contained = contained;
        this.equaled = equaled;
    }
}