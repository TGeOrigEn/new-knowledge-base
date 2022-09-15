import axios from 'axios';

export default class Person {

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

    public constructor(source: any | Person) {
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