interface Info {
    name: string;
    surname: string;
    patronymic: string;
    date_birth: string;
}

export default class biographyFilter {
    public contained: Info;

    public equaled: Info;

    public religion: string;

    public origin: string;

    public constructor(contained: Info, equaled: Info, religion: string, origin: string) {
        this.contained = contained;
        this.equaled = equaled;
        this.religion = religion;
        this.origin = origin;
    }
}