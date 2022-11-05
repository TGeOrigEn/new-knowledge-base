interface Info {
    level_education: string;
    educational_institution: string;
    location_educational_institution: string;
}

export default class EducationFilter {
    public contained: Info;

    public equaled: Info;

    public constructor(contained: Info, equaled: Info, religion: string, origin: string) {
        this.contained = contained;
        this.equaled = equaled;
    }
}