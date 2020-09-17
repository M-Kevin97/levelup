import { ICourse, Course } from "../course/course";

export interface IInstructor {
    id:string;
    firstname:string;
    lastname:string;
    title:string;
    ppLink:string;
}

export class Instructor {
    public get webSiteLink(): string {
        return this._webSiteLink;
    }
    public set webSiteLink(value: string) {
        this._webSiteLink = value;
    }
    public get ppLink(): string {
        return this._ppLink;
    }
    public set ppLink(value: string) {
        this._ppLink = value;
    }
    
    public get courses(): ICourse[] {
        return this._courses;
    }
    public set courses(value: ICourse[]) {
        this._courses = value;
    }
    public get id(): string {
        return this._id;
    }
    public set id(value: string) {
        this._id = value;
    }
    public get bio(): string {
        return this._bio;
    }
    public set bio(value: string) {
        this._bio = value;
    }
    public get title(): string {
        return this._title;
    }
    public set title(value: string) {
        this._title = value;
    }
    public get lastname(): string {
        return this._lastname;
    }
    public set lastname(value: string) {
        this._lastname = value;
    }
    public get firstname(): string {
        return this._firstname;
    }
    public set firstname(value: string) {
        this._firstname = value;
    }

    constructor(private _id: string,
                private _firstname: string, 
                private _lastname: string, 
                private _title: string,
                private _bio: string,
                private _webSiteLink: string,
                private _courses?: ICourse[],
                private _ppLink?: string) {

    }

    getIUser(){
        const iInstructor:IInstructor = {
            id: this.id,
            firstname: this.firstname,
            lastname: this.lastname,
            title: this.title,
            ppLink: this.ppLink,
        }

        return iInstructor;
    }

    public static instructorFromJson(json: Object): Instructor {

        if(!json) return null;

        const jsonItems = json['items'];
        let crs = null;

        if(jsonItems)  {
            crs = Course.getICoursesFromJson(jsonItems);
        }     

        return new Instructor(null,
                        json['firstname'],
                        json['lastname'],
                        json['ppLink'],
                        json['title'],
                        json['bio'],
                        crs,
                        json['srcLink']);
    }
    

}