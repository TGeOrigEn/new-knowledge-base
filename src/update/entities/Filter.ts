class BiographyFilter {
    contains: {
        patronymic: string;
        surname: string;
        origin: string;
        name: string;
        date_birth: string;
    }
    equals: {
        patronymic: string;
        religion: string;
        surname: string;
        origin: string;
        name: string;
        date_birth: string;
    }
    public constructor() {
        this.equals = { patronymic: "", surname: "", origin: "", name: "", religion: "", date_birth: "" };
        this.contains = { patronymic: "", surname: "", origin: "", name: "", date_birth: "" }
    }
}

class CareerFilter {
    equals: {
        start_date: string,
        end_date: string,
        place: string,
        post: string
    }
    contains: {
        post: string
    }
    public constructor() {
        this.equals = { start_date: "", end_date: "", place: "", post: "" };
        this.contains = { post: "" }
    }
}

class EducationFilter {
    equals: {
        level_education: string,
        educational_institution: string,
        location_educational_institution: string,
    }
    contains: {
        educational_institution: string,
    }
    public constructor() {
        this.contains = { educational_institution: "" }
        this.equals = { level_education: "", educational_institution: "", location_educational_institution: "" };
    }
}

class RankFilter {
    equals: {
        start_date: string,
        end_date: string,
        degree: string,
        name: string
    }
    contains: {
        name: string
    }
    public constructor() {
        this.equals = { start_date: "", end_date: "", degree: "", name: "" };
        this.contains = { name: "" }
    }
}

class PlaceFilter {
    equals: {
        name: string,
        description: string
    };
    contains: {
        name: string,
        description: string
    }
    public constructor() {
        this.contains = { name: "", description: "" };
        this.equals = { name: "", description: "" };
    }
}

class TextFilter {
    contains: string;
    equals: string;
    public constructor() {
        this.contains = "";
        this.equals = "";
    }
}

export { TextFilter, PlaceFilter, RankFilter, EducationFilter, CareerFilter, BiographyFilter }