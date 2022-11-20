class BiographyFilter {
    contains: {
        patronymic: string;
        surname: string;
        origin: string;
        name: string;
        date_birth: string;
    } = { patronymic: "", surname: "", origin: "", name: "", date_birth: "" }
    equals: {
        patronymic: string;
        religion: string;
        surname: string;
        origin: string;
        name: string;
        date_birth: string;
    } = { patronymic: "", surname: "", origin: "", name: "", religion: "", date_birth: "" }
}

class CareerFilter {
    equals: {
        start_date: string,
        end_date: string,
        place: string,
        post: string
    } = { start_date: "", end_date: "", place: "", post: "" }
    contains: {
        post: string
    } = { post: "" }
}

class EducationFilter {
    equals: {
        level_education: string,
        educational_institution: string,
        location_educational_institution: string,
    } = { level_education: "", educational_institution: "", location_educational_institution: "" }
    contains: {
        educational_institution: string,
    } = { educational_institution: "" }
}

class RankFilter {
    equals: {
        start_date: string,
        end_date: string,
        degree: string,
        name: string
    } = { start_date: "", end_date: "", degree: "", name: "" }
    contains: {
        name: string
    } = { name: "" }
}

class PlaceFilter {
    equals: {
        name: string,
        description: string
    } = { name: "", description: "" };
    contains: {
        name: string,
        description: string
    } = { name: "", description: "" };
}

class TextFilter {
    contains: string = "";
    equals: string = "";
    public constructor() {
        this.contains = "";
        this.equals = "";
    }
}

export { TextFilter, PlaceFilter, RankFilter, EducationFilter, CareerFilter, BiographyFilter }