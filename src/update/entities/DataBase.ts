import axios from "axios";


// class FullPerson {
//     public person: Person = Person.instance();
//     public activity: Array<FullActivity> = [];
//     public career: Array<Career> = [];
//     public rank: Array<Rank> = [];

//     public static async get(id: number): Promise<FullPerson> {
//         const person = await Command.select<Person>(Person.NAME, localStorage.getItem('token')!, { id: id });
//         if (person == undefined)
//             return new FullPerson(Person.instance(), [], [], []);

//         var a = person[0];
//         var b: FullActivity[] = [];
//         var c: Career[] = [];
//         var d: Rank[] = [];

//         const career = await Command.select<Career>(Career.NAME, localStorage.getItem('token')!, { person_id: id });
//         if (career != undefined) {
//             c = career;
//         }


//         const rank = await Command.select<Rank>(Rank.NAME, localStorage.getItem('token')!, { person_id: id });
//         if (rank != undefined) {
//             d = rank;
//         }

//         const activity = await Command.select<Activity>(Activity.NAME, localStorage.getItem('token')!, { person_id: id });
//         if (activity != undefined) {
//             for (var i = 0; i < activity.length; i++)
//                 b.push(await FullActivity.get(activity[i].id));
//         }

//         return new FullPerson(a, b, c, d);
//     }

//     public constructor(person: Person, activity: FullActivity[], career: Career[], rank: Rank[]) {
//         this.person = person;
//         this.activity = activity;
//         this.career = career;
//         this.rank = rank;
//     }
// }

// class FullActivity {
//     public activity: Activity = Activity.instance();
//     public place: Array<Place> = [];

//     public static async get(id: number): Promise<FullActivity> {
//         var a = Activity.instance();
//         var b = new Array<Place>();

//         const activity = await Command.select<Activity>(Activity.NAME, localStorage.getItem('token')!, { id: id });

//         if (activity == undefined) {
//             a = Activity.instance();
//             b = [];
//             return new FullActivity(a, b);
//         }

//         const link = await Command.select<Link>(Link.NAME, localStorage.getItem('token')!, { activity_id: id });

//         if (link == undefined) {
//             b = [];
//             return new FullActivity(a, b);
//         }

//         for (var i = 0; i < link.length; i++) {
//             const place = await Command.select<Place>(Place.NAME, localStorage.getItem('token')!, { id: link[i].place_id });
//             if (place != undefined) b.push(place[0]);
//         }

//         return new FullActivity(a, b);
//     }

//     public constructor(activity: Activity, place: Place[]) {
//         this.activity = activity;
//         this.place = place;
//     }
// }


class Command {

    private static readonly CONNECTION_STRING: string = "http://194.87.232.70:5050/api";

    public static async select<T>(table: string, condition?: any): Promise<T[] | undefined> {
        return condition == undefined
            ? await (await axios.get<T[]>(`${Command.CONNECTION_STRING}/${table}/all`)).data
            : await (await axios.get<T[]>(`${Command.CONNECTION_STRING}/${table}`, { params: { ...condition } })).data;
    }

    public static async delete<T>(table: string, token: string, condition: number | any): Promise<T | undefined> {
        if (typeof condition === "number")
            return await (await axios.delete<T>(`${Command.CONNECTION_STRING}/${table}/${condition}`)).data;
        return await (await axios.delete<T>(`${Command.CONNECTION_STRING}/${table}`, { params: { ...condition } })).data;
    }

    public static async update<T>(table: string, token: string, id: number, source: T): Promise<T | undefined> {
        return await (await axios.put<T>(`${Command.CONNECTION_STRING}/${table}/${id}`, source)).data;
    }

    public static async insert<T>(table: string, token: string, person: T | any): Promise<T | undefined> {
        return await (await axios.post<T>(`${Command.CONNECTION_STRING}/${table}`, person)).data;
    }
}

class FullPerson {
    public person: Person = Person.instance();
    public activity: Array<FullActivity> = [];
    public career: Array<Career> = [];
    public rank: Array<Rank> = [];

    public constructor(person: Person, activity: FullActivity[], career: Career[], rank: Rank[]) {
        this.person = person;
        this.activity = activity;
        this.career = career;
        this.rank = rank;
    }

    // public constructor(id: number) {
    //     Command.select<Person>(Person.NAME, localStorage.getItem('token')!, { id: id }).then(response => {
    //         if (response == undefined) {
    //             this.person = Person.instance();
    //             this.activity = [];
    //             this.career = [];
    //             this.rank = [];
    //             return;
    //         }

    //         this.person = response[0];

    //         Command.select<Career>(Career.NAME, localStorage.getItem('token')!, { person_id: id }).then(response => this.career = response == undefined ? [] : response);
    //         Command.select<Rank>(Rank.NAME, localStorage.getItem('token')!, { person_id: id }).then(response => this.rank = response == undefined ? [] : response);

    //         Command.select<Activity>(Activity.NAME, localStorage.getItem('token')!, { person_id: id }).then(response => {
    //             if (response == undefined) {
    //                 this.activity = [];
    //                 return;
    //             }
    //             response.forEach(activity => this.activity.push(new FullActivity(activity.id)))
    //         });
    //     });
    // }
}

class FullActivity {
    public activity: Activity = Activity.instance();
    public place: Array<Place> = [];

    public constructor(activity: Activity, place: Place[]) {
        this.activity = activity;
        this.place = place;
    }

    // public constructor(id: number) {
    //     Command.select<Activity>(Activity.NAME, localStorage.getItem('token')!, { id: id }).then(response => {
    //         if (response == undefined) {
    //             this.activity = Activity.instance();
    //             this.place = [];
    //             return;
    //         }
    //         this.activity = response[0];

    //         Command.select<Link>(Link.NAME, localStorage.getItem('token')!, { activity_id: id }).then(response => {
    //             if (response == undefined) {
    //                 this.place = [];
    //                 return;
    //             }

    //             response.forEach(link => {
    //                 if (response == undefined) {
    //                     this.place = [];
    //                     return;
    //                 }
    //                 Command.select<Place>(Place.NAME, localStorage.getItem('token')!, { id: link.place_id }).then(response => {
    //                     if (response == undefined) return;
    //                     this.place.push(response![0]);
    //                 });
    //             });
    //         });
    //     });

    // }
}

class Activity {

    public static NAME: string = "activity";

    public static instance(): Activity {
        return new Activity({
            id: -1,
            person_id: -1,
            description: ""
        });
    }

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

    public static instance(): Career {
        return new Career({
            id: -1,
            person_id: -1,
            start_date: "",
            end_date: "",
            post: "",
            place: ""
        });
    }


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

    public static instance(): Person {
        return new Person({
            id: -1,
            surname: "",
            name: "",
            patronymic: "",
            date_birth: "",
            religion: "",
            origin: "",
            level_education: "",
            educational_institution: "",
            location_educational_institution: "",
            property: "",
            awards: "",
            salary: "",
            marital_status: "",
            other: "",
            source: ""
        });
    }

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
    public source: string;

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
        this.source = source.source;
    }
}

class Place {

    public static NAME: string = "place";

    public static instance(): Place {
        return new Place({
            id: -1,
            name: "",
            description: "",
            longitude: 0,
            latitude: 0
        });
    }

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

    public static instance(): Link {
        return new Link({
            id: -1,
            activity_id: -1,
            place_id: -1,
        });
    }

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

    public static instance(): Rank {
        return new Rank({
            id: -1,
            person_id: -1,
            start_date: "",
            end_date: "",
            degree: "",
            name: ""
        });
    }

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

export { Command, Activity, Person, Career, Place, Link, Rank, FullPerson, FullActivity }