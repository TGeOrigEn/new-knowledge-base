import axios from "axios";


class Command {

    private static readonly CONNECTION_STRING: string = "http://194.87.232.70:5050/api";

    public static async select<T>(table: string, condition?: any[]) {
        return condition == undefined
            ? await [(await axios.get<T>(`${Command.CONNECTION_STRING}/${table}/all`)).data]
            : await (await axios.get<T[]>(`${Command.CONNECTION_STRING}/${table}`, { params: { ...condition } })).data;
    }

    public static async delete<T>(table: string, id: number) {
        return await (await axios.delete<T[]>(`${Command.CONNECTION_STRING}/${table}/${id}`)).data;
    }

    public static async update<T>(table: string, id: number, source: T) {
        return await (await axios.put<T>(`${Command.CONNECTION_STRING}/${table}/${id}`, source)).data;
    }

    public static async insert<T>(table: string, person: T) {
        return await (await axios.post<T>(`${Command.CONNECTION_STRING}/${table}`, person)).data;
    }
}



class Activity {

    public static NAME: string = "activity";

    public id: number;
    public person_id: number;
    public description: string;

    public constructor(source: Activity) {
        this.id = source.id;
        this.person_id = source.person_id;
        this.description = source.description;
    }
}

class Career {

    public static NAME: string = "career";

    public id: number;
    public person_id: number;
    public start_date: string;
    public end_date: string;
    public post: string;
    public place: string;

    public constructor(source: Career) {
        this.id = source.id;
        this.person_id = source.person_id;
        this.start_date = source.start_date;
        this.end_date = source.end_date;
        this.post = source.post;
        this.place = source.place;
    }
}

class Person {

    public static NAME: string = "person";

    public id: number;
    public surname: string;
    public name: string;
    public patronymic: string;
    public date_birth: string;
    public religion: string;
    public origin: string;
    public level_education: string;
    public educational_institution: string;
    public location_educational_institution: string;
    public property: string;
    public awards: string;
    public salary: string;
    public marital_status: string;
    public other: string;

    public constructor(source: Person) {
        this.id = source.id;
        this.surname = source.surname;
        this.name = source.name;
        this.patronymic = source.patronymic;
        this.date_birth = source.date_birth;
        this.religion = source.religion;
        this.origin = source.origin;
        this.level_education = source.level_education;
        this.educational_institution = source.educational_institution;
        this.location_educational_institution = source.location_educational_institution;
        this.property = source.property;
        this.awards = source.awards;
        this.salary = source.salary;
        this.marital_status = source.marital_status;
        this.other = source.other;
    }
}

class Place {

    public static NAME: string = "place";

    public id: number;
    public name: string;
    public description: string;
    public longitude: number;
    public latitude: number;

    public constructor(source: Place) {
        this.id = source.id;
        this.longitude = source.longitude;
        this.name = source.name;
        this.description = source.description;
        this.latitude = source.latitude;
    }
}

class Link {

    public static NAME: string = "activity_place";

    public id: number;
    public activity_id: number;
    public place_id: number;

    public constructor(source: Link) {
        this.id = source.id;
        this.place_id = source.place_id;
        this.activity_id = source.activity_id;
    }
}

class Rank {

    public static NAME: string = "rank";

    public id: number;
    public person_id: number;
    public start_date: string;
    public end_date: string;
    public degree: string;
    public name: string;

    public constructor(source: any | Rank) {
        this.id = source.id;
        this.person_id = source.person_id;
        this.start_date = source.start_date;
        this.end_date = source.end_date;
        this.degree = source.degree;
        this.name = source.name;
    }
}

export { Command, Activity, Person, Career, Place, Link, Rank }