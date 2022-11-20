class BiographyFilter {
    contains: {
        patronymic: string;
        surname: string;
        origin: string;
        name: string;
    } = { patronymic: "", surname: "", origin: "", name: "" }
    equals: {
        patronymic: string;
        religion: string;
        surname: string;
        origin: string;
        name: string;
    } = { patronymic: "", surname: "", origin: "", name: "", religion: "" }
}

class CareerFilter {
    equals: {
        start_date: string,
        end_date: string,
        place: string,
        post: string
    } = { start_date: "", end_date: "", place: "", post: "" }
    contains: {
        start_date: string,
        end_date: string,
        post: string
    } = { start_date: "", end_date: "", post: "" }
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
        start_date: string,
        end_date: string,
        name: string
    } = { start_date: "", end_date: "", name: "" }
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
}

export { TextFilter, PlaceFilter, RankFilter, EducationFilter, CareerFilter, BiographyFilter }